import { ReapitConnectSession } from '@reapit/connect-session'
import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
import axios from 'axios'
import { useQuery } from 'react-query'

import { BASE_HEADERS, URLS } from '../../constants/api'

const getPropertiesByOfficeId = async (
  session: ReapitConnectSession,
  officeId: string
): Promise<PropertyModelPagedResult | undefined> => {
  if (!session) return

  const { data } = await axios.get(
    `${window.reapit.config.platformApiUrl}${URLS.PROPERTIES_PAGED}?officeId=${officeId}&pageSize=100`,
    {
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
  return data
}

const usePropertyBasedOfficeIdQuery = (
  session: ReapitConnectSession,
  officeId: string
) => {
  return useQuery(
    ['properties', officeId],
    () => getPropertiesByOfficeId(session, officeId),
    {
      enabled: !!session,
    }
  )
}

export default usePropertyBasedOfficeIdQuery
