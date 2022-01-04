import { useReapitConnect } from '@reapit/connect-session'
import { Button, FlexContainer, SmallText } from '@reapit/elements'
import React, { FC, ReactElement, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { PropertyModel } from '../../../../generated/graphql'
import usePropertyImagesBasedPropertyIdQuery from '../../../../platform-api/hooks/usePropertyImagesBasedPropertyIdQuery'
import LoadingIndicator from '../../loading'

interface ModalPropertiesType {
  propertyData?: PropertyModel
}
const ModalProperties: FC<ModalPropertiesType> = (props): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  useEffect(() => {
    if (!connectSession) return
  }, [connectSession])
  const { propertyData } = props

  const { isLoading } = usePropertyImagesBasedPropertyIdQuery(
    connectSession!,
    propertyData?.id ?? ''
  )

  if (isLoading)
    return <LoadingIndicator label="Getting Property Data..." isFullScreen />

  return (
    <>
      <div>
        <img
          width={'100%'}
          height={'400px'}
          src="https://via.placeholder.com/300/09f/fff.png"
          alt="later"
          className="el-mb6"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <SmallText>
        Panel Information (Details, Negotiator, Landlord, Task) exec soon
      </SmallText>
      <FlexContainer>
        <div>
          <Button intent="critical" chevronRight>
            More Information (open new tab)
          </Button>
        </div>
      </FlexContainer>
    </>
  )
}

export default ModalProperties
