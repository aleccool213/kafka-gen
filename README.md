# kafka-gen

A service which allows you to send kafka messages to a topic through a GraphQL api. This is done through first generating a GraphQL schema file based on your existing Kafka schema files.

This was an experiment for a hackathon to learn some new tech. Please do not use this :)


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

![Imgur](https://i.imgur.com/ofhPUxS.gif)

<to be filled>
 
## Installation

1. (to be deprecated) Setup access to `npm i` from our private [registry](https://confluence.wishabi.com/pages/viewpage.action?pageId=25738928#FlippLibraries(NodeModuleandRubyGems)-SetupArtifactoryforNPM)
1. Make sure your confluent instance is running (schema registry, etc)
1. npm install
1. get rid of namespace from your kafka schema file
1. add a kafka schema (json file format pls) to ./src/kafka/schemas (support for multiple coming soon)
1. run `ts-node bin/generateGraphql.ts ./src/kafka/schemas/<your file name>.json`
1. change config/app.json contents to the topic you want to produce to, same name as your schema file
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
