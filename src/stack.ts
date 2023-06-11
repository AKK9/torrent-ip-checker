import path from 'path'

import * as apigw from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'

import type { Construct } from 'constructs'

export class TorrentIpCheckerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const trackerFunction = new lambda.NodejsFunction(this, 'TrackerFunction', {
      handler: 'trackerHandler',
      entry: path.join(__dirname, './index.ts'),
      timeout: cdk.Duration.seconds(10),
    })

    const torrentFunction = new lambda.NodejsFunction(this, 'TorrentFunction', {
      handler: 'torrentHandler',
      entry: path.join(__dirname, './index.ts'),
      timeout: cdk.Duration.seconds(10),
    })

    const httpApi = new apigw.HttpApi(this, 'HttpApi')

    httpApi.addRoutes({
      path: '/tracker',
      methods: [apigw.HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        `TrackerFunctionHttpIntegration`,
        trackerFunction
      ),
    })

    httpApi.addRoutes({
      path: '/torrent',
      methods: [apigw.HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        `TrackerFunctionHttpIntegration`,
        torrentFunction
      ),
    })
  }
}
