# Torrent IP Checker

A mock torrent tracker, in the form of a Lambda, which always replies a failure response but provides your IP address as the failure message.

[Download the torrent here](https://www.google.com)

## Overview

### How does it work?

Add this torrent to your BitTorrent client then view the list of trackers. The error message for this tracker will tell you which IP address hit the tracker.

### Why?

This provides a way for you to validate that your VPN or proxy is masking your real IP address without having to rely on untrusted websites.

### Why should I trust your torrent?

You don't need to. This lambda can be built and deployed to your own AWS account. More info below.

## Running locally

### Dependencies

- Yarn - https://yarnpkg.com/en/docs/install

### Running locally

First run `yarn`. This will fetch all of the necessary dependencies.

`yarn test` will run the unit tests

`yarn dev` Will execute the Lambda locally using mock data from `local/data.json`

## Deploying

This project uses the Serverless Framework to deploy the lambda to AWS.

First, ensure you have an AWS Account with sufficient privileges for Serverless. Use this [Serverless Framework Credentials Guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/) to help you set this up.

Then run `yarn deploy` to build and deploy to your AWS account.
