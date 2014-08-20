# Angular-Webdis

Angular-Webdis is an angular provider that allows you to subscribe to [Redis](http://redis.io/) [PubSub](http://redis.io/topics/pubsub) channels through [Webdis](http://webd.is/).

## Installation

Angular-Webdis can be installed by either downloading `angular-webdis.min.js` from the `dist` directory in this repository, or with `grunt install angular-webdis`.

## Installing Webdis (Laravel Forge Users)

Laravel Forge users can use the Laravel Forge Recipe at [ForgeRecipes.com](http://forgerecipes.com/recipes/22).

## Configuration

You can configure the provider like so:

    myApp = angular.module('my-app', ['adamgoose-webdis']);

    myApp.configure(['WebdisProvider', function(WebdisProvider)
      {
        WebdisProvider.setHost('example.com'); // Your Webdis Host
        WebdisProvider.setPort(7379);          // Your Webdis Port (7379 by default)
      }]);

## Usage

To subscribe to a channel, inject `Webdis` to your controllers, and use the provided methods (see below) to subscribe to channels.

    app.controller('DemoCtl', ['$scope', 'Webdis', function($scope, Webdis)
    {

      Webdis.subscribe('my-channel', $scope)
        // Optional Subscribe Callback Method
        .onSubscribe(function(data, channel)
        {
          console.log('Subscribed to channel '+channel);
        })
        // Required Message Callback Method
        // This method actually triggers the subscription XHR Request
        .onMessage(function(data, channel)
        {
          console.log('Message received on channel '+channel+': '+data);
        });

    }]);

## API

### .subscribe(channel, scope)

Subscribe to a channel.

- **channel**: Channel to subscribe to.
- **scope**: Pass in your scope, and we'll run `$scope.$apply()` after your callbacks for you.

### .onSubscribe(data, channel)

Register a callback for subscription success.

- **data**: returns 1 when subscription is a success.
- **channel**: Channel subscribed to.

### .onMessage(data, channel)

Register a callback for subscription messages. This method actually triggers the subscription XHR Request.

- **data**: Message data.
- **channel**: Channel subscribed to.

## Contributing

Do it nicely, please. :)

Before you commit, please run the following commands to build out the `dist` files.

    npm install
    gulp