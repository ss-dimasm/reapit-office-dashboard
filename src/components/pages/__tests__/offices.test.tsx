import React from 'react'
import { mount } from 'enzyme'
import Offices from '../offices'

import { QueryClient, QueryClientProvider } from 'react-query'
import LoadingIndicator from '../../ui/loading'
import { useGetOfficesQuery } from '../../../generated/graphql'
import { OFFICE_PAGED_EXAMPLE } from '../__mocks__/office.mock'
import { Card } from '@reapit/elements'

const mockedUseGetOfficeQuery = useGetOfficesQuery as jest.Mock<any>

jest.mock('../../../generated/graphql')

const queryClient = new QueryClient()

describe('Office Page', () => {
  beforeEach(() => {
    mockedUseGetOfficeQuery.mockImplementation(() => ({
      isLoading: true,
      data: OFFICE_PAGED_EXAMPLE,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render Office component', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Offices />
      </QueryClientProvider>
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('should render loading indicator first', () => {
    mockedUseGetOfficeQuery.mockImplementation(() => ({
      isLoading: true,
      data: {
        OfficeData: OFFICE_PAGED_EXAMPLE,
      },
    }))

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Offices />
      </QueryClientProvider>
    )

    expect(wrapper.find(LoadingIndicator)).toHaveLength(1)
    expect(wrapper.find(LoadingIndicator).text()).not.toBeNull()
    expect(wrapper.find(LoadingIndicator).debug()).toMatchSnapshot()
  })

  it('should render office data', () => {
    mockedUseGetOfficeQuery.mockImplementation(() => ({
      isLoading: false,
      data: {
        OfficeData: OFFICE_PAGED_EXAMPLE,
      },
    }))

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Offices />
      </QueryClientProvider>
    )

    const card = wrapper.find(Card)
    expect(card).toHaveLength(1)
    expect(card.text().includes('Reapit')).toBeTruthy()
    expect(card.debug()).toMatchSnapshot()
  })
})
