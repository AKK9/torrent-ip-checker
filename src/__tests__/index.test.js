import { handler } from '../index'

describe('handler', () => {
  it('should return the source ip address bencoded', async () => {
    const event = {
      requestContext: {
        identity: {
          sourceIp: '12.34.567.890',
        },
      },
    }

    const response = await handler(event)

    expect(response).toEqual({
      isBase64Encoded: false,
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf8',
      },
      body: 'd14:failure reason32:Your IP address is 12.34.567.890e',
    })
  })

  it('should return 500 response if bad event is provided', async () => {
    const response = await handler({})

    expect(response.statusCode).toBe(500)
  })
})
