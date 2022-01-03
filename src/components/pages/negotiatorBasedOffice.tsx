import React, { FC, ReactElement } from 'react'
import { useParams } from 'react-router-dom'

interface ParamsType {
  officeId: string
  negotiatorId: string
}

/**
 * @todo continue develop dashboard feature based negotiator id and office id
 */
const NegotiatorBasedOffice: FC<{}> = (): ReactElement => {
  const { negotiatorId, officeId } = useParams<ParamsType>()

  return (
    <p>
      Displaying Negotiators with ID {negotiatorId} from Office {officeId}
    </p>
  )
}

export default NegotiatorBasedOffice
