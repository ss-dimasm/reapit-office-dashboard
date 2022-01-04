import React, { FC, ReactElement, useEffect } from 'react'

import { useReapitConnect } from '@reapit/connect-session'
import { Card, FlexContainer, Subtitle } from '@reapit/elements'
import { Link } from 'react-router-dom'

import { BASE_HEADERS } from '../../../../constants/api'
import Routes from '../../../../constants/routes'

import { reapitConnectBrowserSession } from '../../../../core/connect-session'

import {
  NegotiatorScreenQuery,
  OfficeModel,
  useNegotiatorScreenQuery,
} from '../../../../generated/graphql'

import graphQLRequestClient from '../../../../platform-api/graphQLClient'
import LoadingIndicator from '../../loading'

interface NegotiatorProps {
  OfficeData: OfficeModel
}

const Negotiator: FC<NegotiatorProps> = (props): ReactElement => {
  const { OfficeData } = props
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  useEffect(() => {
    if (!connectSession) return

    graphQLRequestClient.setHeaders({
      ...BASE_HEADERS,
      authorization: connectSession.idToken,
      'reapit-connect-token': connectSession.accessToken,
    })
  }, [connectSession])

  const { isLoading, data } = useNegotiatorScreenQuery<NegotiatorScreenQuery>(
    graphQLRequestClient,
    {
      OfficeId: OfficeData.id,
    }
  )

  if (isLoading) return <LoadingIndicator isFullScreen label="Please wait..." />

  if (data?.GetNegotiators.totalCount === 0)
    return (
      <Subtitle hasCenteredText className="el-mt10">
        No Employee Registered
      </Subtitle>
    )

  return (
    <FlexContainer isFlexRow isFlexWrap>
      {data?.GetNegotiators._embedded?.map((negotiator) => {
        return (
          <React.Fragment key={negotiator.id}>
            <Link
              target="_blank"
              to={`${Routes.OFFICE}/${OfficeData.id}${Routes.NEGOTIATOR}/${negotiator.id}`}
              style={{ width: '100%', display: 'inline-block' }}
            >
              <Card
                hasListCard
                listCardHeading={negotiator.name ?? '-'}
                listCardSubHeading={negotiator.jobTitle ?? 'Unknown Job Title'}
                listCardItems={[
                  {
                    listCardItemHeading: 'Email',
                    listCardItemSubHeading: negotiator?.email ?? '-',
                    listCardItemIcon: 'applicantInfographic',
                    onClick: () => console.log('Clicking'),
                  },
                  {
                    listCardItemHeading: 'Phone',
                    listCardItemSubHeading: negotiator?.workPhone ?? '-',
                    listCardItemIcon: 'houseInfographic',
                    onClick: () => console.log('Clicking'),
                  },
                ]}
                onClick={() => console.log(negotiator?.id ?? '-')}
                onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.currentTarget.classList.add('el-card-focussed')
                }
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.currentTarget.classList.remove('el-card-focussed')
                }
                style={{ width: '30%', margin: '0.5rem' }}
              />
            </Link>
          </React.Fragment>
        )
      })}
    </FlexContainer>
  )
}

export default Negotiator
