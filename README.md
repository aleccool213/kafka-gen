# kafka-message-automator

A service which allows you to send kafka messages to a topic

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
  * support having multiple kafka schemas
* setup.ts would write over topic array to development.json
* hookup to local kafka server
  * ~~be able to send messages to a topic~~
  * ~~support required fields and default fields~~
* super simple ui
  * basically just to control graphql api for people who dont want to use that

* hookup to remote schema registry
  * build dynamic graphql schema based off the schema registry
* be able to send messages to remote kafka server


## Api spec

* list all topics
  * /topics
