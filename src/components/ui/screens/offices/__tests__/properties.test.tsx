import React from 'react'

import { Subtitle, Table } from '@reapit/elements'
import { mount } from 'enzyme'
import { QueryClient, QueryClientProvider } from 'react-query'

import usePropertyBasedOfficeIdQuery from '../../../../../platform-api/hooks/usePropertyBasedOfficeIdQuery'
import LoadingIndicator from '../../../loading'
import Properties from '../properties'
import {
  PROPERTIES_SCREEN_EXAMPLE_1,
  PROPERTIES_SCREEN_EXAMPLE_2,
} from '../__mocks__/properties.mock'

const mockUserPropertyBasedOfficeIdQuery =
  usePropertyBasedOfficeIdQuery as jest.Mock<any>
jest.mock('../../../../../platform-api/hooks/usePropertyBasedOfficeIdQuery')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
describe('<Properties/>', () => {
  beforeEach(() => {
    mockUserPropertyBasedOfficeIdQuery.mockImplementation(() => ({
      isLoading: true,
      data: PROPERTIES_SCREEN_EXAMPLE_1,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render <Properties/>', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Properties officeData={jest.fn()} />
      </QueryClientProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should show loading indicator', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Properties officeData={jest.fn()} />
      </QueryClientProvider>
    )
    expect(wrapper.find(LoadingIndicator).text()).toEqual('Please wait...')
  })

  it('should show notification while data is 0', () => {
    mockUserPropertyBasedOfficeIdQuery.mockImplementation(() => ({
      isLoading: false,
      data: PROPERTIES_SCREEN_EXAMPLE_2,
    }))
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Properties officeData={jest.fn()} />
      </QueryClientProvider>
    )
    const notification = wrapper.find(Subtitle)
    expect(notification.text()).toEqual('No properties handled')
    expect(notification).toHaveLength(1)
  })

  it('should render table of properties', () => {
    mockUserPropertyBasedOfficeIdQuery.mockImplementation(() => ({
      isLoading: false,
      data: PROPERTIES_SCREEN_EXAMPLE_1,
    }))
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Properties officeData={jest.fn()} />
      </QueryClientProvider>
    )

    const tableProperties = wrapper.find(Table)
    expect(tableProperties.text()).toContain('Test Building Name')
    expect(tableProperties).toHaveLength(1)
  })
})
