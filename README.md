# kafka-message-automator

A service which allows you to send kafka messages to a topic

## Objectives

* Become more comfortable with building graphql-api applications
* Use as much code-generators / common tools as you can
* Speed up test and automation for kafka related services at Flipp
* Learn more about kafka myself

## TODO

* graphql server to interact with application
  * test getting topics from local confluent instance
* define schemas locally
  * use these for the graphql api layer for now
* hookup to local kafka server
  * be able to send messages to a topic
  * send fake data if you do not specify a certain field etc
* hookup to remote schema registry
  * build dynamic graphql schema based off the schema registry
* be able to send messages to remote kafka server

## Api spec

* list all topics
  * /topics
