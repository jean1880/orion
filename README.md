# Orion
Georgian College Systems Project
----

The project will consist of three components, one is a informative page, with blog functionality, to bring the company into the digital frontier, another will be a CMS and accounting program that will be run from a computer, as well as the RESTful database server, which will serve data to both the website and application

## Documentation Standards

For documentation in the project we will be following yuidoc standards, which can be found on the official [YUIdoc page] (http://yui.github.io/yuidoc/)

## Requirements and Setup

This application requires Sails, Bower, Grunt, and Grunt-cli

`npm install -g grunt grunt-cli bower sails`

The application also requires a working installation of Mongodb see 
[The mongo install manual for instructions](http://docs.mongodb.org/manual/installation/)

### Setup for ~/App

Install npm dependencies

`npm install`

Install Bower dependencies

`bower install`

### Setup for ~/Server

Install npm dependencies

`npm install`

## Testing
Two terminal windows are nessesary. One for App, another for Server

### Start App

Run Grunt

`grunt serve`

### Start Server

Run Sails

`sails lift`

test
