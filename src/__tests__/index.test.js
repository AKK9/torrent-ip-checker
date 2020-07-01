import { trackerHandler, torrentHandler } from '../index'

describe('trackerHandler', () => {
  it('should return the source ip address bencoded', async () => {
    const event = {
      requestContext: {
        identity: {
          sourceIp: '12.34.567.890',
        },
      },
    }

    const response = await trackerHandler(event)

    expect(response).toEqual({
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'd14:failure reason32:Your IP address is 12.34.567.890e',
    })
  })

  it('should return 500 response if bad event is provided', async () => {
    const response = await trackerHandler({})
    expect(response.statusCode).toBe(500)
  })
})

describe('torrentHandler', () => {
  it('should return a torrent file', async () => {
    const event = {
      headers: {
        Host: '123.abc.com',
      },
    }

    const response = await torrentHandler(event)

    // Validate response without body
    expect(response).toMatchObject({
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        'Content-Type': 'application/x-bittorrent',
        'Content-Disposition': 'attachment; filename=IP Checker.torrent',
      },
    })

    // Decode body and validate
    const buffer = Buffer.from(response.body, 'base64')
    const value = buffer.toString('ascii')
    expect(value).toEqual(
      expect.stringContaining(
        'd8:announce32:https://123.abc.com/prod/tracker4:infod6:lengthi16384e4:name10:IP Checker12:piece lengthi16384e6:pieces20:'
      )
    )
  })

  it('should return 500 response if bad event is provided', async () => {
    const response = await trackerHandler({})
    expect(response.statusCode).toBe(500)
  })
})
