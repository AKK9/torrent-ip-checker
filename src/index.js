import 'regenerator-runtime/runtime'
import { encode as bencode } from 'bencode'

const handler = async f => {
  try {
    return await f()
  } catch (e) {
    console.error(e)

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/html',
      },
      body: e.message,
    }
  }
}

export const trackerHandler = async event => {
  console.log('trackerHandler invoked with event', event)

  return handler(() => {
    const {
      requestContext: {
        identity: { sourceIp },
      },
    } = event

    const responseBuffer = bencode({
      'failure reason': `Your IP address is ${sourceIp}`,
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: responseBuffer.toString(),
    }
  })
}

export const torrentHandler = async event => {
  console.log('torrentHandler invoked with event', event)

  return handler(() => {
    const {
      headers: { Host: host },
    } = event

    const torrentBuffer = bencode({
      announce: `https://${host}/Prod/tracker`,
      info: {
        name: 'IP Checker',
        length: 16000,
        'piece length': 16000,
        pieces: new Uint8Array(20).buffer,
      },
    })

    return {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        'Content-Type': 'application/x-bittorrent',
        'Content-Disposition': 'attachment; filename=IP Checker.torrent',
      },
      body: torrentBuffer.toString('base64'),
    }
  })
}
