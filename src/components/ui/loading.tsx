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
      data-testid="loadingIndicator"
      className={`el-flex ${
        props.isFullScreen && 'el-flex-justify-center'
      } elH-full el-flex-align-center`}
      style={style}
    >
      <Loader label={props.label} />
    </div>
  )
}

export default LoadingIndicator
