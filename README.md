# Torrent IP Checker

A fake Torrent which allows you to see your IP address.

[Download the Torrent here](https://vvdapo30eb.execute-api.eu-west-2.amazonaws.com/torrent)

## Overview

### Why?

This allows you validate your VPN or proxy is functioning as expected and masking your real IP address.

### How does it work?

This Torrent contains a single HTTP tracker. The tracker returns a failure response to any request but includes your IP address as part of the failure reason.

To update the IP address you just have to reannounce to the tracker. Your BitTorrent client should allow you to do this. For example, in qBittorrent you just right click the torrent and select `Force reannounce`.

**Here's a screenshot from qBittorrent:**
![alt text](images/screenshot.png)

---

## Local development

### Dependencies

- Yarn - https://yarnpkg.com/en/docs/install
- AWS Account bootstrapped with CDK

### Invoking Lambda locally

First run `yarn`. This will fetch all of the necessary dependencies.

`yarn test` will run the unit tests.

### Deploying

This project uses the [AWS CDK](https://aws.amazon.com/cdk/) to define a stack and deploy it to AWS.

Use this [Getting Started Guide](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) to help you set up CDK. Once you have credentials and your AWS account is bootstrapped, deploying your own stack is as simple as running `yarn deploy`.
