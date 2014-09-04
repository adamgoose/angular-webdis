# Angular-Webdis

Angular-Webdis is an angular provider that allows you to subscribe to [Redis](http://redis.io/) [PubSub](http://redis.io/topics/pubsub) channels via [Webdis](http://webd.is/) using WebSockets.

## Installation

Angular-Webdis can be installed by either downloading `angular-webdis.min.js` from the `dist` directory in this repository, or with `bower install angular-webdis`.

## Installing Webdis (Laravel Forge Users)

Laravel Forge users can use the Laravel Forge Recipe at [ForgeRecipes.com](http://forgerecipes.com/recipes/22).

## Configuration

You can configure the provider like so:

```js
myApp = angular.module('my-app', ['adamgoose-webdis']);

myApp.config(['WebdisProvider', function(WebdisProvider)
  {
    // Your Webdis Host
    WebdisProvider.setHost('example.com');

    // Your Webdis Port (7379 by default)
    WebdisProvider.setPort(7379);
  }]);
```

### WebdisProvider.setHost(host)

Sets the host for the Webdis Requests

- **host**: Your Webdis Host

### WebdisProvider.setPort(port)

Sets the port for the Webdis Requests

- **port**: Your Webdis Post (default 7379)

## Usage

To subscribe to a channel, inject `Webdis` to your controllers, and use the provided methods (see below) to subscribe to channels.

```js
app.controller('DemoCtl', ['$scope', 'Webdis', function($scope, Webdis)
{

  Webdis.subscribe('my-channel', function(data, channel)
    {
      console.log('Message received on channel '+channel+': '+data);
    }, $scope);

}]);
```

## API

### Webdis.subscribe(channel, callback, scope)

Subscribe to a channel.

- **channel**: Channel to subscribe to.
- **callback**: Function to handle the callback. See below for more documentation.
- **scope**: Pass in your scope, and we'll run `$scope.$apply()` after your callbacks for you.

#### callback(message, channel)

The callback that handles messages sent to a particular subscribed channel.

- **message**: JSON Object or String message data
- **channel**: Channel on which the message was sent

> **Note**: If you do not pass your scope to the `.subscribe()` method, you will need to run `$scope.$apply()` in your callbacks if you make changes to your scope within the callback.

## Contributing

Do it nicely, please. :)

Before you commit, please run the following commands to build out the `dist` files.

    npm install
    gulp
