import { Loader } from '@reapit/elements'
import React, { FC, ReactElement } from 'react'

interface LoadingIndicatorProps {
  label: string
  isFullScreen?: boolean
}
const LoadingIndicator: FC<LoadingIndicatorProps> = (props): ReactElement => {
  const style: React.CSSProperties = {
    height: '70%',
  }
  return (
    <div
      className={`el-flex ${
        props.isFullScreen && 'el-flex-justify-center'
      } elH-full el-flex-align-center`}
      style={style}
    >
      <Loader data-testid="loadingIndicator" label={props.label} />
    </div>
  )
}

export default LoadingIndicator
