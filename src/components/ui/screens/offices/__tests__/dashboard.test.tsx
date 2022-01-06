import React from 'react'
import { shallow } from 'enzyme'
import DashboardOffice from '../dashboard'

import { DASHBOARD_MOCK_DATA } from '../__mocks__/dashboard.mock'
import { Button, SecondaryNav } from '@reapit/elements'
import toJson from 'enzyme-to-json'

describe('Dashboard Office', () => {
  it('It should render Dashboard Office Component', () => {
    const wrapper = shallow(
      <DashboardOffice
        OfficeData={DASHBOARD_MOCK_DATA}
        backToOfficeList={jest.fn()}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should have back button', () => {
    const wrapper = shallow(
      <DashboardOffice
        OfficeData={DASHBOARD_MOCK_DATA}
        backToOfficeList={jest.fn()}
      />
    )

    const button = wrapper.find(Button)
    expect(button).toHaveLength(1)
    expect(button.text()).not.toBeNull()
  })

  it('onClick handler in Back Button', () => {
    const mockOnClick = jest.fn()

    const wrapper = shallow(
      <DashboardOffice
        OfficeData={DASHBOARD_MOCK_DATA}
        backToOfficeList={mockOnClick}
      />
    )

    const button = wrapper.find(Button)

    button.simulate('click')
    expect(mockOnClick).toHaveBeenCalled()
    button.simulate('click')
    button.simulate('click')
    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })

  it('should have navigation bar', () => {
    const wrapper = shallow(
      <DashboardOffice
        OfficeData={DASHBOARD_MOCK_DATA}
        backToOfficeList={jest.fn()}
      />
    )
    const navbar = wrapper.find(SecondaryNav)
    expect(navbar).toMatchSnapshot()
  })
})
