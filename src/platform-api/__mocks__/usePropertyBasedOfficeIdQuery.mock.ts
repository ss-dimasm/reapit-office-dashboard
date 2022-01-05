export const PROPERTIES_PAGED_EXAMPLE = {
  _embedded: [
    {
      id: 'OXF200008',
      created: '2018-12-12T12:30:23.0000000Z',
      modified: '2019-01-08T12:30:34.0000000Z',
      marketingMode: 'sellingAndLetting',
      currency: 'GBP',
      alternateId: '10001',
      address: {
        buildingName: null,
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB',
        geolocation: {
          latitude: 52.4158586,
          longitude: 1.7773383,
        },
      },
      areaId: 'BRM',
      strapline: null,
      description:
        'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
      longDescription:
        'The ground floor accommodation comprises of a spacious reception hall with a wet bar, a grand drawing room, master bedroom suite and a further bedroom suite. The lower floor comprises of an eat in kitchen leading to converted vaults which could be used as staff accommodation or a study. There is also separate dining room and a further bedroom suite.',
      summary: null,
      departmentId: 'G',
      negotiatorId: 'JAS',
      bedrooms: 4,
      receptions: 1,
      bathrooms: 2,
      councilTax: 'A',
      internetAdvertising: true,
      isExternal: false,
      viewingArrangements: 'Accompanied viewings after 3PM only',
      videoUrl: 'https://www.example.com/property/123/videoTour',
      videoCaption: 'Virtual property tour',
      video2Url: 'https://www.example.com/property/123/3dVideoTour',
      video2Caption: '3d virtual property tour',
      notes:
        'Property was on the market previously with another agent but struggled to get much interest',
      boardStatus: 'FS',
      boardNotes: "Include 'sold in a week' slip",
      boardUpdated: '2021-07-02',
      archivedOn: null,
      fromArchive: false,
      externalArea: {
        type: 'acres',
        min: 1,
        max: 2,
      },
      internalArea: {
        type: 'squareFeet',
        min: 1500,
        max: 2000,
      },
      epc: {
        exempt: false,
        eer: 45,
        eerPotential: 71,
        eir: 53,
        eirPotential: 81,
      },
      selling: {
        instructed: '2018-11-18',
        price: 250000,
        qualifier: 'askingPrice',
        status: 'underOffer',
        disposal: 'privateTreaty',
        completed: '2019-08-27',
        exchanged: '2019-08-15',
        accountPaid: '2019-08-29',
        tenure: {
          type: 'leasehold',
          expiry: '2019-05-01',
        },
        vendorId: 'OXF123001',
        agency: 'ownToSell',
        agencyId: null,
        fee: {
          type: 'fixed',
          amount: 2000,
        },
        exchangedCompanyFee: 2000,
        recommendedPrice: 550000,
        brochureId: 'DOC21000002',
        exchangedPrice: null,
        exchangedOfficeId: null,
        decoration: null,
      },
      letting: {
        instructed: '2018-11-18',
        availableFrom: '2018-12-26',
        availableTo: '2019-03-23',
        rent: 750,
        rentFrequency: 'monthly',
        furnishing: ['furnished', 'partFurnished'],
        term: 'long',
        status: 'toLet',
        agentRole: 'managed',
        landlordId: 'OXF123001',
        brochureId: 'DOC21000001',
        managementFee: {
          type: 'percentage',
          amount: 7.5,
        },
        lettingFee: {
          type: 'fixed',
          amount: 155,
        },
        qualifier: 'askingRent',
        utilities: {
          gasCompanyId: 'OXF21000001',
          gasMeterPoint: '123',
          electricityCompanyId: 'OXF21000003',
          electricityMeterPoint: '789',
          waterCompanyId: 'OXF21000002',
          waterMeterPoint: '456',
          telephoneCompanyId: 'OXF21000006',
          internetCompanyId: 'OXF21000004',
          cableTvCompanyId: 'OXF21000005',
        },
      },
      type: ['house'],
      style: ['detached'],
      situation: ['garden', 'land', 'patio'],
      parking: ['secure', 'doubleGarage'],
      age: ['period'],
      locality: ['rural', 'village'],
      specialFeatures: null,
      rooms: [
        {
          name: 'Kitchen',
          dimensions: '4.5m x 5.2m',
          description:
            'The breakfast kitchen, with utility, comprises a matching range of wall and base units with ceramic hob and eye level double oven. A side door leads to the front courtyard area.',
        },
        {
          name: 'Lounge',
          dimensions: '6.5m x 7.8m',
          description:
            'The lounge, with a brick feature fireplace housing a Clearview stove, provides an ideal space to relax and unwind, whilst enjoying views over the Golf Course.',
        },
        {
          name: 'Dining Room',
          dimensions: '5.1m x 6.2m',
          description:
            'The formal dining room is the perfect space to entertain and provides access to the useful study.',
        },
      ],
      officeIds: ['OXF', 'SOL'],
      lostInstructionDate: '2021-02-23',
      lostInstructionNote: 'Other agent charged £300 less',
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
      extrasField: null,
      _eTag: null,
      _links: {
        self: {
          href: '/properties/OXF200008',
        },
        images: {
          href: '/propertyImages/?propertyId=OXF200008',
        },
        documents: {
          href: '/documents/?associatedType=property&associatedId=OXF200008',
        },
        offers: {
          href: '/offers/?propertyId=OXF200008',
        },
        appointments: {
          href: '/appointments/?propertyId=OXF200008',
        },
        negotiator: {
          href: '/negotiators/JAS',
        },
        offices: {
          href: '/offices/?id=OXF&id=SOL',
        },
        department: {
          href: '/departments/G',
        },
        vendor: {
          href: '/vendors/OXF123001',
        },
        landlord: {
          href: '/landlords/OXF123001',
        },
        area: {
          href: '/areas/BRM',
        },
        sellingBrochure: {
          href: '/documents/DOC21000002',
        },
        lettingBrochure: {
          href: '/documents/DOC21000001',
        },
        boardStatus: {
          href: '/configuration/boardStatuses/FS',
        },
        gasCompany: {
          href: '/companies/OXF21000001',
        },
        electricityCompany: {
          href: '/companies/OXF21000003',
        },
        waterCompany: {
          href: '/companies/OXF21000002',
        },
        internetCompany: {
          href: '/companies/OXF21000004',
        },
        telephoneCompany: {
          href: '/companies/OXF21000006',
        },
        cableTvCompany: {
          href: '/companies/OXF21000005',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 25,
  _links: {
    self: {
      href: '/properties/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/properties/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/properties/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/properties/?PageNumber=25&PageSize=1',
    },
  },
}
