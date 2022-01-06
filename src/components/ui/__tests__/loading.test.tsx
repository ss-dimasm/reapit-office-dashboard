import { shallow } from 'enzyme'
import React from 'react'
import LoadingIndicator from '../loading'

const mockLoading = LoadingIndicator as jest.Mock<any>

jest.mock('../loading')

describe('<Loading/>', () => {
  beforeEach(() => {
    mockLoading.mockImplementation(() => ({
      label: 'Loading',
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render Loading Indicator Component', () => {
    const wrapper = shallow(<LoadingIndicator label={'Loading'} />)

    expect(wrapper).toMatchSnapshot()
  })
})
