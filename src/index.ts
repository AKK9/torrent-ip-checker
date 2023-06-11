import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { encode } from 'bencode'

import type { APIGatewayProxyHandlerV2, Handler } from 'aws-lambda'

export const lambdaWrapper = (handler: APIGatewayProxyHandlerV2): Handler =>
  middy(handler)
    .use(jsonBodyParser())
    .use({
      onError: (request) => {
        request.response = {
          ...request.response,
          isBase64Encoded: false,
          statusCode: 500,
          headers: {
            ...request.response?.headers,
            'content-type': 'text/html',
          },
          body: 'Request failed',
        }
      },
    })

export const trackerHandler = lambdaWrapper(async (event) => {
  console.log('trackerHandler invoked with event', event)

  const {
    requestContext: {
      http: { sourceIp },
    },
  } = event

  const responseBuffer = encode({
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

export const torrentHandler = lambdaWrapper(async (event) => {
  console.log('torrentHandler invoked with event', event)

  const {
    requestContext: { domainName },
  } = event

  const torrentBuffer = encode({
    announce: `https://${domainName}/tracker`,
    info: {
      name: 'IP Checker',
      length: 16384,
      'piece length': 16384,
      pieces: new Uint8Array(20),
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
