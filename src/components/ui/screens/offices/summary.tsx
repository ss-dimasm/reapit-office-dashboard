import React, { FC, useEffect, useState } from 'react'

import { useReapitConnect } from '@reapit/connect-session'

import { BASE_HEADERS } from '../../../../constants/api'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import graphQLRequestClient from '../../../../platform-api/graphQLClient'
import {
  OfficeModel,
  useSummaryScreenQuery,
} from '../../../../generated/graphql'
import {
  BodyText,
  FlexContainer,
  Subtitle,
  Table,
  Title,
} from '@reapit/elements'
import LoadingIndicator from '../../loading'

interface SummaryProps {
  OfficeData: OfficeModel
}
const Summary: FC<SummaryProps> = (props) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(0)

  useEffect(() => {
    if (!connectSession) return
    graphQLRequestClient.setHeaders({
      ...BASE_HEADERS,
      authorization: connectSession.idToken,
      'reapit-connect-token': connectSession.accessToken,
    })
  }, [connectSession])

  const { isLoading, data } = useSummaryScreenQuery(graphQLRequestClient, {
    OfficeId: props.OfficeData.id,
  })

  if (isLoading) return <LoadingIndicator label="Please wait..." isFullScreen />

  return (
    <FlexContainer isFlexJustifyBetween>
      <div style={{ width: '80%' }}>
        <Subtitle>Task list</Subtitle>
        <Table
          numberColumns={3}
          indexExpandedRow={indexExpandedRow}
          setIndexExpandedRow={setIndexExpandedRow}
          rows={[
            {
              cells: [
                {
                  label: 'Description',
                  value: 'Mt Ash Jacket, Brassey Road',
                  className: 'el-span2',
                  icon: 'homeSystem',
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
              expandableContent: {
                content: (
                  <p>I am the content that is only visible when expanded</p>
                ),
              },
            },
            {
              cells: [
                {
                  label: 'Description',
                  value: 'Mt Ash Jacket, Brassey Road',
                  className: 'el-span2',
                  icon: 'homeSystem',
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
              expandableContent: {
                content: (
                  <p>I am the content that is only visible when expanded</p>
                ),
              },
            },
          ]}
        />
      </div>
      <div style={{ width: '19%' }} className="el-box-shadow el-p6">
        <BodyText>Total Agent</BodyText>
        <Title hasCenteredText>{data?.GetNegotiators.totalCount}</Title>
      </div>
    </FlexContainer>
  )
}

export default Summary
