import React, { FC, useEffect, useState } from 'react'

import { Card, FlexContainer, Title } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'

import {
  GetOfficesQuery,
  OfficeModel,
  useGetOfficesQuery,
} from '../../generated/graphql'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { BASE_HEADERS } from '../../constants/api'
import graphQLRequestClient from '../../platform-api/graphQLClient'
import LoadingIndicator from '../ui/loading'
import DashboardOffice from '../ui/screens/offices/dashboard'

const Offices: FC<{}> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [selectedOfficeData, setSelectedOfficeData] = useState<
    OfficeModel | undefined
  >(undefined)
  const [pageLocation, setPageLocation] = useState<
    'select-office' | 'dashboard'
  >('select-office')

  useEffect(() => {
    if (!connectSession) return

    graphQLRequestClient.setHeaders({
      ...BASE_HEADERS,
      authorization: connectSession.idToken,
      'reapit-connect-token': connectSession.accessToken,
    })
  }, [connectSession, pageLocation])

  const { isLoading, data } =
    useGetOfficesQuery<GetOfficesQuery>(graphQLRequestClient)

  const setToDashboard = (office: OfficeModel): void => {
    setSelectedOfficeData(office)
    setPageLocation('dashboard')
  }

  const backToOfficeList = (): void => {
    setSelectedOfficeData(undefined)
    setPageLocation('select-office')
  }
  if (isLoading) return <LoadingIndicator label="Please wait..." isFullScreen />

  if (pageLocation === 'dashboard')
    return (
      <DashboardOffice
        OfficeData={selectedOfficeData!}
        backToOfficeList={backToOfficeList}
      />
    )

  return (
    <>
      <Title hasBoldText={false}>Please select one Office to manage</Title>
      <FlexContainer isFlexWrap isFlexRow isFlexJustifyBetween>
        {data?.OfficeData._embedded?.map((office, index) => {
          return (
            <React.Fragment key={office.id ?? index}>
              <Card
                hasListCard
                listCardHeading={office.name ?? '-'}
                listCardSubHeading={`Join since ${office.created ?? ''}`}
                listCardItems={[
                  {
                    listCardItemHeading: 'Manager',
                    listCardItemSubHeading: office.manager ?? '-',
                    listCardItemIcon: 'applicantInfographic',
                  },
                  {
                    listCardItemHeading: 'Email',
                    listCardItemSubHeading: office.email ?? '-',
                    listCardItemIcon: 'emailSystem',
                  },
                ]}
                style={{ width: '32%', margin: '0.5rem' }}
                onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.currentTarget.classList.add('el-card-focussed')
                }
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.currentTarget.classList.remove('el-card-focussed')
                }
                onClick={() => setToDashboard(office)}
              />
            </React.Fragment>
          )
        })}
      </FlexContainer>
    </>
  )
}

export default Offices
