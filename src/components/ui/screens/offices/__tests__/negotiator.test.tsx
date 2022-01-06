import React from 'react'

import { mount } from 'enzyme'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useNegotiatorScreenQuery } from '../../../../../generated/graphql'
import Negotiator from '../negotiator'
import {
  NEGOTIATOR_SCREEN_EXAMPLE,
  NEGOTIATOR_SCREEN_EXAMPLE_2,
} from '../__mocks__/negotiator.mock'
import LoadingIndicator from '../../../loading'
import { Subtitle } from '@reapit/elements'

const mockUseNegotiatorScreenQuery = useNegotiatorScreenQuery as jest.Mock<any>

jest.mock('../../../../../generated/graphql')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('<Negotiator/>', () => {
  beforeEach(() => {
    mockUseNegotiatorScreenQuery.mockImplementation(() => ({
      isLoading: true,
      data: NEGOTIATOR_SCREEN_EXAMPLE,
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the negotiator component', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Negotiator OfficeData={jest.fn()} />
      </QueryClientProvider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should loading component', () => {
    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Negotiator OfficeData={jest.fn()} />
      </QueryClientProvider>
    )

    const loading = wrapper.find(LoadingIndicator)
    expect(loading).toHaveLength(1)
    expect(loading.text()).toEqual('Please wait...')
  })

  it('should render negotiator data', () => {
    mockUseNegotiatorScreenQuery.mockImplementation(() => ({
      isLoading: false,
      data: NEGOTIATOR_SCREEN_EXAMPLE,
    }))

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Negotiator OfficeData={jest.fn()} />
      </QueryClientProvider>
    )

    expect(
      wrapper.find({ 'data-testid': 'test-negotiator-card' })
    ).toHaveLength(8)
  })
  it('should return notification when negotiators count is 0', () => {
    mockUseNegotiatorScreenQuery.mockImplementation(() => ({
      isLoading: false,
      data: NEGOTIATOR_SCREEN_EXAMPLE_2,
    }))

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Negotiator OfficeData={jest.fn()} />
      </QueryClientProvider>
    )

    expect(wrapper.find(Subtitle).text()).toEqual('No Employee Registered')
  })
})
