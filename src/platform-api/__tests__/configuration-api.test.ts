import { configurationAppointmentsApiService } from '../configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'

const mockedFetch = jest.spyOn(window, 'fetch')
const mockConfigurationAppointments = [
  {
    id: 'some_id',
    value: 'some_value',
  },
] as ListItemModel[]

describe('configurationAppointmentsApiService', () => {
  it('should return a response from the config service', async () => {
    mockedFetch.mockReturnValueOnce({
      json: jest.fn(() => mockConfigurationAppointments),
    } as any)
    expect(
      await configurationAppointmentsApiService(mockBrowserSession)
    ).toEqual(mockConfigurationAppointments)
    expect(mockedFetch).toHaveBeenCalledTimes(1)
  })
})
