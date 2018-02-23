# kafka-message-automator

A service which allows you to send kafka messages to a topic


## ATTN:

* Outside parties cannot run this service as it currently heavily leans on
the @flipp/node-kafka npm package. It will soon become open-source.

## Objectives

* Become more comfortable with building graphql-api applications
* Use as much code-generators / common tools as you can
* Speed up test and automation for kafka related services at Flipp
* Learn more about kafka myself
* Learn more about graphql and using it in node

## Usage

1. Make sure your confluent instance is running (schema registry, etc)
1. npm install
1. add a kafka schema (json file format pls) to ./src/kafka/schemas
1. run `ts-node bin/generateGraphql.ts ./src/kafka/schemas/<your file name>.json`
1. `npm run dev:start`

## TODO

* ~~graphql server to interact with application~~
  * ~~test getting topics from local confluent instance~~
* ~~define schemas locally~~
  * ~~generate a custom graphql schema based on a kafka schema~~
  * generate custom graphql schemas based on multiple kafka schemas 
  * ~~support having multiple kafka schemas~~
* setup.ts would write over topic array from schema registry to src/config/app.json
* hookup to local kafka server
  * ~~be able to send messages to a topic~~
  * send a message to a specific topic registered with the app
  * ~~support required fields and default fields~~
* super simple ui
  * basically just to control graphql api for people who dont want to use that

* hookup to remote schema registry
  * build dynamic graphql schema based off the schema registry
* be able to send messages to remote kafka server


### Thanks go to [Flipp](https://corp.flipp.com/) for giving me company time to work on this