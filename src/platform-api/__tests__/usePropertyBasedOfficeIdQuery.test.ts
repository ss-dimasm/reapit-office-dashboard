import usePropertyBasedOfficeIdQuery from '../hooks/usePropertyBasedOfficeIdQuery'
import { mockBrowserSession } from '../__mocks__/session'
import { PROPERTIES_PAGED_EXAMPLE } from '../__mocks__/usePropertyBasedOfficeIdQuery.mock'

const mockedUsePropertyBasedOfficeIdQuery =
  usePropertyBasedOfficeIdQuery as jest.Mock<any>

jest.mock('../hooks/usePropertyBasedOfficeIdQuery')

describe('Response property based Office Id', () => {
  beforeEach(() => {
    mockedUsePropertyBasedOfficeIdQuery.mockImplementation(() => ({
      isLoading: true,
      data: PROPERTIES_PAGED_EXAMPLE,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return response of properties paged data', () => {
    mockedUsePropertyBasedOfficeIdQuery.mockImplementation(() => ({
      isLoading: false,
      data: PROPERTIES_PAGED_EXAMPLE,
    }))

    expect(mockedUsePropertyBasedOfficeIdQuery).toHaveBeenCalledTimes(0)
    expect(mockedUsePropertyBasedOfficeIdQuery(mockBrowserSession)).toEqual({
      isLoading: false,
      data: PROPERTIES_PAGED_EXAMPLE,
    })
    expect(mockedUsePropertyBasedOfficeIdQuery(mockBrowserSession)).not.toEqual(
      {
        isLoading: true,
        data: PROPERTIES_PAGED_EXAMPLE,
      }
    )
    expect(mockedUsePropertyBasedOfficeIdQuery).toHaveBeenCalledTimes(2)
  })
})
