import React, { FC, ReactElement, useEffect, useState } from 'react'

import { useReapitConnect } from '@reapit/connect-session'
import {
  Icon,
  Modal,
  PageContainer,
  RowProps,
  Subtitle,
  Table,
} from '@reapit/elements'

import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { OfficeModel, PropertyModel } from '../../../../generated/graphql'
import usePropertyBasedOfficeIdQuery from '../../../../platform-api/hooks/usePropertyBasedOfficeIdQuery'
import LoadingIndicator from '../../loading'
import ModalProperties from './modalProperties'

interface PropertiesProps {
  officeData: OfficeModel
}
const Properties: FC<PropertiesProps> = (props): ReactElement => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { officeData } = props

  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(0)
  const [tableContent, setTableContent] = useState<RowProps[] | undefined>(
    undefined
  )
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [selectedPropertyData, setSelectedPropertyDetail] = useState<
    PropertyModel | undefined
  >(undefined)

  const { isLoading, data } = usePropertyBasedOfficeIdQuery(
    connectSession!,
    officeData.id!
  )

  // open property specific modal
  const openModalProperty = (property: PropertyModel): void => {
    setSelectedPropertyDetail(property)
    setModalIsOpen(true)
  }
  // set data
  useEffect(() => {
    if (!data) return

    const emptyContent: RowProps[] = []
    data?._embedded?.forEach((property) => {
      emptyContent.push({
        cells: [
          {
            label: 'Address',
            value: property.address?.buildingName ?? '-',
            className: 'elSpan2',
            icon: 'geoLocationSolidSystem',
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Registered Date',
            value: property.created ?? '-',
            icon: 'calendarSystem',
            narrowTable: {
              showLabel: true,
            },
          },
        ],
        expandableContent: {
          onClick: () => openModalProperty(property ?? '-'),
          cellContent: (
            <Icon
              icon="viewSolidSystem"
              testdata-id="test-icon-modal"
              intent="primary"
            />
          ),
        },
      })
    })

    setTableContent(emptyContent)
  }, [isLoading])

  // wait' for isloading var until complete or table content is ready
  if (isLoading || !tableContent)
    return <LoadingIndicator label="Please wait..." isFullScreen />

  // while data is empty, then return this
  if (data?.totalCount === 0)
    return (
      <Subtitle className="el-mt8" hasCenteredText>
        No properties handled
      </Subtitle>
    )

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onModalClose={() => setModalIsOpen(false)}
        title={`${selectedPropertyData?.address?.buildingName}`}
      >
        <ModalProperties propertyData={selectedPropertyData} />
      </Modal>
      <PageContainer style={{ maxHeight: '80%' }}>
        <Table
          numberColumns={3}
          indexExpandedRow={indexExpandedRow}
          setIndexExpandedRow={setIndexExpandedRow}
          rows={tableContent}
        />
      </PageContainer>
    </>
  )
}

export default Properties
