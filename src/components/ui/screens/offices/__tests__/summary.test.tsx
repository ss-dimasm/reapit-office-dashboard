import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { mount } from 'enzyme'

import { useSummaryScreenQuery } from '../../../../../generated/graphql'
import Summary from '../summary'
import LoadingIndicator from '../../../loading'
import { SUMMARY_SCREEN_EXAMPLE } from '../__mocks__/summary.mock'

const mockedUseSummaryScreenQuery = useSummaryScreenQuery as jest.Mock<any>

jest.mock('../../../../../generated/graphql')

const queryClient = new QueryClient()

describe('<Summary/>', () => {
  beforeEach(() => {
    mockedUseSummaryScreenQuery.mockImplementation(() => ({
      isLoading: true,
      data: SUMMARY_SCREEN_EXAMPLE,
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render summary component', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Summary OfficeData={jest.fn()} />
      </QueryClientProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should show loading indicator while rendering summary', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Summary OfficeData={jest.fn()} />
      </QueryClientProvider>
    )
    const loading = wrapper.find(LoadingIndicator)
    expect(loading).toHaveLength(1)
    expect(loading.text()).toContain('Please wait...')
  })
  it('should render summary screen ', () => {
    mockedUseSummaryScreenQuery.mockImplementation(() => ({
      isLoading: false,
      data: SUMMARY_SCREEN_EXAMPLE,
    }))
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Summary OfficeData={jest.fn()} />
      </QueryClientProvider>
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('should show total agent indicator ', () => {
    mockedUseSummaryScreenQuery.mockImplementation(() => ({
      isLoading: false,
      data: SUMMARY_SCREEN_EXAMPLE,
    }))
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Summary OfficeData={jest.fn()} />
      </QueryClientProvider>
    )
    expect(
      wrapper.find({ 'datatest-id': 'negotiatorCount' }).get(0).props
    ).toEqual({
      'datatest-id': 'negotiatorCount',
      hasCenteredText: true,
      children: 5,
    })
  })
})
