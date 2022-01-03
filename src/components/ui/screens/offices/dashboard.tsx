import React, { FC, ReactElement, useState } from 'react'

import {
  Button,
  FlexContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'

import { OfficeModel } from '../../../../generated/graphql'
import Summary from './summary'
import Negotiator from './negotiator'

interface DashboardOfficeProps {
  OfficeData: OfficeModel
  backToOfficeList: () => void
}
const DashboardOffice: FC<DashboardOfficeProps> = (props): ReactElement => {
  const { backToOfficeList } = props

  const [selectedItem, setSelectedItem] = useState<number>(1)

  const backToPreviousPage = () => backToOfficeList()
  return (
    <>
      <FlexContainer>
        <div className="el-mr6">
          <Button chevronLeft intent="critical" onClick={backToPreviousPage}>
            Back
          </Button>
        </div>
        <div>
          <Title hasBoldText hasNoMargin>
            Hello, Admin {props.OfficeData.name}!
          </Title>
        </div>
      </FlexContainer>
      <FlexContainer className="el-mt6">
        <div
          style={{ width: '14rem', height: '100vh', backgroundColor: 'red' }}
        >
          <SecondaryNavContainer style={{ height: '100%' }}>
            <SecondaryNav>
              <SecondaryNavItem
                active={selectedItem === 1}
                onClick={() => setSelectedItem(1)}
              >
                Summary
              </SecondaryNavItem>
              <SecondaryNavItem
                active={selectedItem === 2}
                onClick={() => setSelectedItem(2)}
              >
                Negotiators
              </SecondaryNavItem>
            </SecondaryNav>
          </SecondaryNavContainer>
        </div>
        <div
          className="el-pl5"
          style={{
            width: '-webkit-fill-available',
            height: '100vh',
          }}
        >
          {selectedItem === 1 ? (
            <Summary OfficeData={props.OfficeData} />
          ) : (
            <Negotiator OfficeData={props.OfficeData} />
          )}
        </div>
      </FlexContainer>
    </>
  )
}

export default DashboardOffice
