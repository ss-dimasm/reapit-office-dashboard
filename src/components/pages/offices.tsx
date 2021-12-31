import React, { FC, useEffect } from 'react'

import { Title } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'

import { useGetOfficesQuery } from '../../generated/graphql'
import graphQLRequestClient from '../../platform-api/graphQLClient'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { BASE_HEADERS } from '../../constants/api'

const Offices: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  useEffect(() => {
    if (!connectSession) return
    graphQLRequestClient.setHeaders({
      ...BASE_HEADERS,
      authorization: connectSession.idToken,
      'reapit-connect-token': connectSession.accessToken,
    })
  }, [connectSession])

  const { data } = useGetOfficesQuery(graphQLRequestClient)

  console.log(data)
  return <Title>Hellsso</Title>
}

export default Offices
