# Torrent IP Checker

A mock torrent tracker, in the form of a Lambda, which always replies a failure response but provides your IP address as the failure message.

[Download the torrent here](https://www.google.com)

## Overview

### How does it work?

Add this torrent to your BitTorrent client then view the list of trackers. The error message for this tracker will tell you which IP address hit the tracker.

### Why?

This provides a way for you to validate that your VPN or proxy is masking your real IP address.

## Local development

### Dependencies

- Yarn - https://yarnpkg.com/en/docs/install

### Invoking Lambda locally

First run `yarn`. This will fetch all of the necessary dependencies.

`yarn test` will run the unit tests.

`yarn dev` will execute the Lambda locally using mock data from `local/data.json`. This uses Serverless to execute the Lambda locally using an approximated AWS environment, the result is printed in the console.

### Deploying

This project uses the [Serverless Framework](https://serverless.com/) to define serverless resources and deploy the Lambda function.

It's defined as a project dependency and will be installed via `yarn`. However, installing it globally will make it easier to invoke `serverless` from the command line. Run `yarn global add serverless` to install globally.

First, ensure you have an AWS Account with sufficient privileges for Serverless. Use this [Serverless Framework Credentials Guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/) to help you set this up.

Then run `yarn deploy` to build and deploy the Lambda to your AWS account.
