import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { NavResponsive } from '@reapit/elements'
import { useHistory } from 'react-router'

export const Nav: React.FC = () => {
  const { connectLogoutRedirect } = useReapitConnect(
    reapitConnectBrowserSession
  )

  const history = useHistory()

  return (
    <NavResponsive
      options={[
        {
          itemIndex: 0,
        },
        {
          itemIndex: 1,
          href: window.reapit.config.marketplaceUrl,
          iconId: 'appsMenu',
          text: 'Apps',
          callback: () => history.push('/'),
        },
        {
          itemIndex: 2,
          href: '/office',
          iconId: 'officesMenu',
          text: 'My Office',
          callback: () => history.push('/office'),
        },
        {
          itemIndex: 3,
          callback: connectLogoutRedirect,
          isSecondary: true,
          iconId: 'logoutMenu',
          text: 'Logout',
        },
      ]}
    />
  )
}

export default Nav
