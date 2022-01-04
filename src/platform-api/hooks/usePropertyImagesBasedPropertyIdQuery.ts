import { useQuery } from 'react-query'
import axios from 'axios'

import { ReapitConnectSession } from '@reapit/connect-session'
import { PropertyImageModelPagedResult } from '@reapit/foundations-ts-definitions'

import { BASE_HEADERS, URLS } from '../../constants/api'

const getPropertyImagesBasedPropertyId = async (
  session: ReapitConnectSession,
  propertyId: string
): Promise<PropertyImageModelPagedResult | undefined> => {
  if (!session) return

  const { data } = await axios.get(
    `${window.reapit.config.platformApiUrl}${URLS.PROPERTY_IMAGES_PAGED}?propertyId=${propertyId}`,
    {
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  )
  return data
}

const usePropertyImagesBasedPropertyIdQuery = (
  session: ReapitConnectSession,
  propertyId: string
) => {
  return useQuery(
    ['propertyImages', propertyId],
    () => getPropertyImagesBasedPropertyId(session, propertyId),
    {
      enabled: !!session,
    }
  )
}

export default usePropertyImagesBasedPropertyIdQuery
