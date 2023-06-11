#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'

import { TorrentIpCheckerStack } from './stack'

const app = new cdk.App()

new TorrentIpCheckerStack(app, 'TorrentIpChecker', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
