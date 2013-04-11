/*

Copyright (c) 2013 Matthew Tole <info@matthewtole.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// Current Version: 0.0.6

angular.module('widgetgecko.services', [])

  .factory('Chameleon', function ($rootScope) {

    var ChameleonService = { };
    ChameleonService.isChameleon = true;
    ChameleonService.version = '0.0.6';

    ChameleonService.init = function (options) {
      var cs = this;

      initEventListeners();

      chameleon.widget({

        onLoad: function () {
          cs.broadcastEvent('chameleon.load');
        },

        onCreate: function () {
          cs.broadcastEvent('chameleon.create');
        },

        onResume: function () {
          cs.broadcastEvent('chameleon.resume');
        },

        onPause: function () {
          cs.broadcastEvent('chameleon.pause');
        },

        onLanguageChanged: function () {
          cs.broadcastEvent('chameleon.languageChange');
        },

        onScrollTop: function () {
          cs.broadcastEvent('chameleon.scrollTop');
        },

        onScrollElsewhere: function () {
          cs.broadcastEvent('chameleon.scrollElsewhere');
        },

        onLayoutModeStart: function () {
          cs.broadcastEvent('chameleon.layoutStart');
        },

        onLayoutModeComplete:function () {
          cs.broadcastEvent('chameleon.layoutComplete');
        },

        onConnectionAvailableChanged: function (available) {
          if (available) {
            cs.broadcastEvent('chameleon.connect');
          }
          else {
            cs.broadcastEvent('chameleon.disconnect');
          }
        },

        onConfigure: function () {
          cs.broadcastEvent('chameleon.configure');
        },

        onTitleBar: function () {
          cs.broadcastEvent('chameleon.titlebar');
        },

        onRefresh: function () {
          cs.broadcastEvent('chameleon.refresh');
        },

        onAction: function () {
          cs.broadcastEvent('chameleon.action');
        },

        notChameleon: function () {
          cs.isChameleon = false;
          cs.broadcastEvent('chameleon.notchameleon');
        }

      });

    };

    ChameleonService.broadcastEvent = function (event) {
      $rootScope.$broadcast(event);
    };

    ChameleonService.isConnected = function () {
      return chameleon.connected();
    };

    function initEventListeners() {

      $rootScope.$on('chameleon.polling.start', function (event, data) {
        chameleon.poll({
          id: data.id,
          action: 'start',
          interval: data.interval * 1000,
          callback: data.callback
        });
      });

      $rootScope.$on('chameleon.polling.stop', function (event, data) {
        chameleon.poll({
          id: data.id,
          action: 'stop'
        });
      });

      $rootScope.$on('chameleon.setTitle', function (event, title) {
        chameleon.setTitle({ text: title });
      });

      $rootScope.$on('chameleon.openLink', function (event, url) {
        if (! chameleon.connected()) {
          return;
        }
        if (ChameleonService.isChameleon) {
          chameleon.intent({
            action: 'android.intent.action.VIEW',
            data: url
          });
        }
        else {
          window.open(url);
        }
      });

      $rootScope.$on('chameleon.componentExists', function (event, opts) {
        console.log(opts.component);
        opts.callback(chameleon.componentExists(opts.component));
      });

      $rootScope.$on('chameleon.intent', function (event, intent) {
        chameleon.intent(intent);
      });

      $rootScope.$on('chameleon.invalidate', function (event) {
        chameleon.invalidate();
      });

    }

    return ChameleonService;

  });