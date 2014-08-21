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

  .provider('Webdis', function () {
    this.host = null;
    this.port = '7379';
    this.auth = false;

    this.setHost = function (host) {
      this.host = host;
    };

    this.setPort = function (port) {
      this.port = port;
    };

    this.setAuth = function (user, pass) {
      this.auth = {
        user: user,
        pass: pass
      };
    };

    this.$get = function () {
      var host = this.host,
        port = this.port,
        auth = this.auth;

      return {
        xhr: new XMLHttpRequest(),
        received: 0,
        scope: null,
        messageCallback: function (data, channel) {
        },
        subscribeCallback: function (data, channel) {
        },
        subscribe: function (channel, $scope) {
          this.xhr.open('GET', this.create_subscribe_url(channel), true);
          this.xhr.onreadystatechange = this.receive;
          this.xhr.parent = this;

          if (auth) {
            var header = "Basic " + btoa(auth.user + ':' + auth.pass);
            this.xhr.setRequestHeader("Authorization", header);
          }

          this.scope = $scope;

          return this;
        },
        create_subscribe_url: function (channel) {
          return 'http://' + host + ':' + port + '/SUBSCRIBE/' + channel;
        },
        receive: function () {
          if (this.readyState == 3) {
            var response = this.responseText,
              chunk = response.slice(this.parent.received);
            this.parent.received = response.length;
            chunk = angular.fromJson(chunk)['SUBSCRIBE'];

            this.parent.dispatchCallbacks(chunk);
          }
        },
        dispatchCallbacks: function (chunk) {
          var event = chunk[0],
            channel = chunk[1],
            data = chunk[2];

          switch (event) {
            case 'subscribe':
              this.subscribeCallback(data, channel);
              break;
            case 'message':
              this.messageCallback(data, channel);
              break;
          }

          if (this.scope != null)
            this.scope.$apply();
        },
        onSubscribe: function (callback) {
          this.subscribeCallback = callback;

          return this;
        },
        onMessage: function (callback) {
          this.messageCallback = callback;
          this.xhr.send(null);
        }
      }
    }

  });