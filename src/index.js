import 'regenerator-runtime/runtime'
import bencodeMap from './utils/bencodeMap'

export const handler = async event => {
  try {
    const {
      requestContext: {
        identity: { sourceIp },
      },
    } = event

    const body = bencodeMap(
      new Map([['failure reason', `Your IP address is ${sourceIp}`]])
    )

    return {
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'text/html; charset=utf8',
      },
      statusCode: 200,
      body,
    }
  } catch (e) {
    console.error(e)

    return {
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'text/html; charset=utf8',
      },
      statusCode: 500,
      body: e.message,
    }
  }
}
