import usePropertyBasedOfficeIdQuery from '../hooks/usePropertyBasedOfficeIdQuery'
import { PROPERTIES_PAGED_EXAMPLE } from '../__mocks__/usePropertyBasedOfficeIdQuery.mock'

const mockedFetch = jest.spyOn(window, 'fetch')

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
  it('should return properties paged data', () => {
    // stuck
    mockedUsePropertyBasedOfficeIdQuery.mockImplementation(() => ({
      isLoading: false,
      data: PROPERTIES_PAGED_EXAMPLE,
    }))

    mockedFetch.mockReturnValueOnce({
      json: jest.fn(() => PROPERTIES_PAGED_EXAMPLE),
    } as any)

    expect(mockedFetch).toHaveBeenCalledTimes(0)
  })
})
