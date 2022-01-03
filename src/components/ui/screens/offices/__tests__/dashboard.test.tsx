import React from 'react'
import { shallow } from 'enzyme'
import DashboardOffice from '../dashboard'

import { DASHBOARD_MOCK_DATA } from '../__mocks__/dashboard.mock'

describe('Dashboard Office', () => {
  it('It should render Dashboard Office Component', () => {
    const wrapper = shallow(
      <DashboardOffice
        OfficeData={DASHBOARD_MOCK_DATA}
        backToOfficeList={jest.fn()}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
