/**
 * Adam Engebretson
 *
 * Adam Engebretson <http://github.com/adamgoose>
 * Created and maintained by Adam Engebretson
 *
 * Copyright (c) 2014 Adam Engebretson.
 * Licensed under the MIT License (MIT).
 */

'use strict';

angular.module('adamgoose.webdis', [])

  .service('WebdisSocket', ['$timeout', function ($timeout) {
    this.callbacks = {};
    this.scopes = {};
    this.init = function (host, port) {
      this.socket = new WebSocket('ws://' + host + ':' + port + '/');
      var me = this;

      me.socket.onopen = function () {
        angular.forEach(me.callbacks, function (callback, channel) {
          $timeout(function () {
            me.socket.send(angular.toJson(["SUBSCRIBE", channel]));
          }, 5);
        });
      };

      me.socket.onmessage = function (e) {
        var data = angular.fromJson(e.data)["SUBSCRIBE"];
        var event = data[0],
          channel = data[1],
          message = data[2];

        if (event == 'message') {
          me.dispatchEvents(channel, message);
        }

      };
      return this;
    };
    this.dispatchEvents = function (channel, message) {
      var json;
      try {
        json = angular.fromJson(message);
      }
      catch (ex) {
        json = message;
      }

      this.callbacks[channel](json, channel);

      if (!angular.isUndefined(this.scopes[channel]))
        this.scopes[channel].$apply();
    };
    this.subscribe = function (channel, callback, scope) {
      this.callbacks[channel] = callback;
      this.scopes[channel] = scope;
    }
  }])

  .provider('Webdis', function () {
    this.host = null;
    this.port = '7379';

    this.setHost = function (host) {
      this.host = host;
    };

    this.setPort = function (port) {
      this.port = port;
    };

    this.$get = ['WebdisSocket', function (WebdisSocket) {
      var host = this.host,
        port = this.port;

      return WebdisSocket.init(host, port);
    }];

  })
;