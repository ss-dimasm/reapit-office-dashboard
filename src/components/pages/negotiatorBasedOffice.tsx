import React, { FC, ReactElement, useEffect, useState } from 'react'

import { useReapitConnect } from '@reapit/connect-session'
import { useParams } from 'react-router-dom'

import { BASE_HEADERS } from '../../constants/api'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import graphQLRequestClient from '../../platform-api/graphQLClient'
import {
  NegotiatorBasedOfficeScreenQuery,
  useNegotiatorBasedOfficeScreenQuery,
} from '../../generated/graphql'
import { Button, Card, FlexContainer } from '@reapit/elements'
import { negotiatorProfile } from './__styles__/styles'
import LoadingIndicator from '../ui/loading'

interface ParamsType {
  officeId: string
  negotiatorId: string
}

type ActiveMenuType = 'handledProperty' | 'appointmentSchedule'

const NegotiatorBasedOffice: FC<{}> = (): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { negotiatorId, officeId } = useParams<ParamsType>()

  const [activeMenu, setActiveMenu] =
    useState<ActiveMenuType>('handledProperty')

  useEffect(() => {
    if (!connectSession) return

    graphQLRequestClient.setHeaders({
      ...BASE_HEADERS,
      authorization: connectSession.idToken,
      'reapit-connect-token': connectSession.accessToken,
    })
  }, [connectSession])

  const { isLoading, data } =
    useNegotiatorBasedOfficeScreenQuery<NegotiatorBasedOfficeScreenQuery>(
      graphQLRequestClient,
      {
        NegotiatorID: negotiatorId,
        OfficeId: officeId,
      }
    )

  if (isLoading) return <LoadingIndicator label="Please Wait" isFullScreen />

  const hoverLeaveEffect: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ): void => {
    e.currentTarget.classList.add('el-intent-primary')
    e.currentTarget.classList.remove('el-intent-secondary')
  }

  const hoverInEffect: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ): void => {
    e.currentTarget.classList.add('el-intent-secondary')
    e.currentTarget.classList.remove('el-intent-primary')
  }

  const changeSubPage = (page: ActiveMenuType): void => setActiveMenu(page)

  const SubPage = activeMenu === 'handledProperty' ? 'Test' : 'Yoo'

  return (
    <FlexContainer isFlexJustifyBetween>
      <div className={negotiatorProfile}>
        <Card
          hasListCard
          listCardHeading={data?.GetNegotiatorById.name ?? '-'}
          listCardSubHeading={data?.GetNegotiatorById.jobTitle ?? '-'}
          listCardItems={[
            {
              listCardItemHeading: 'Personal Email',
              listCardItemSubHeading: data?.GetNegotiatorById.email ?? '-',
              listCardItemIcon: 'emailSystem',
            },
            {
              listCardItemHeading: 'Personal Phone Number',
              listCardItemSubHeading:
                data?.GetNegotiatorById.mobilePhone ?? '-',
              listCardItemIcon: 'phoneSystem',
            },
            {
              listCardItemHeading: 'Office Name',
              listCardItemSubHeading: data?.GetOfficeById?.name ?? '-',
              listCardItemIcon: 'homeSystem',
            },
            {
              listCardItemHeading: 'Office Email',
              listCardItemSubHeading: data?.GetOfficeById?.email ?? '-',
              listCardItemIcon: 'emailSystem',
            },
          ]}
        />
      </div>
      <div style={{ width: '78%' }}>
        <FlexContainer className="el-card-wrap">
          <div className="el-p3">
            <Button
              intent={`${
                activeMenu === 'handledProperty' ? 'critical' : 'primary'
              }`}
              className="el-mr2"
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>): void =>
                hoverLeaveEffect(e)
              }
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>): void =>
                hoverInEffect(e)
              }
              onClick={() => changeSubPage('handledProperty')}
            >
              Handled Property
            </Button>
            <Button
              intent={`${
                activeMenu === 'appointmentSchedule' ? 'critical' : 'primary'
              }`}
              className="el-mx2"
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>): void =>
                hoverLeaveEffect(e)
              }
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>): void =>
                hoverInEffect(e)
              }
              onClick={() => changeSubPage('appointmentSchedule')}
            >
              Appointment Schedule
            </Button>
          </div>
        </FlexContainer>
        <div className="el-card-wrap el-mt6">{SubPage}</div>
      </div>
    </FlexContainer>
  )
}

export default NegotiatorBasedOffice
