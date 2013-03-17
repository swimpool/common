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

angular.module('widgetgecko.services', [])

  .factory('Chameleon', function ($rootScope) {

    chameleon.widget({

      onLoad: function () {
        $rootScope.$broadcast('chameleon.load');
      },

      onCreate: function () {
        $rootScope.$broadcast('chameleon.create');
      },

      onResume: function () {
        $rootScope.$broadcast('chameleon.resume');
      },

      onPause: function () {
        $rootScope.$broadcast('chameleon.pause');
      },

      onLanguageChanged: function () {
        $rootScope.$broadcast('chameleon.languageChange');
      },

      onScrollTop: function () {
        $rootScope.$broadcast('chameleon.scrollTop');
      },

      onScrollElsewhere: function () {
        $rootScope.$broadcast('chameleon.scrollElsewhere');
      },

      onLayoutModeStart: function () {
        $rootScope.$broadcast('chameleon.layoutStart');
      },

      onLayoutModeComplete:function () {
        $rootScope.$broadcast('chameleon.layoutComplete');
      },

      onConnectionAvailableChanged: function (available) {
        if (available) {
          $rootScope.$broadcast('chameleon.connect');
        }
        else {
          $rootScope.$broadcast('chameleon.disconnect');
        }
      },

      onConfigure: function () {
        $rootScope.$broadcast('chameleon.configure');
      },

      onTitleBar: function () {
        $rootScope.$broadcast('chameleon.titlebar');
      },

      onRefresh: function () {
        $rootScope.$broadcast('chameleon.refresh');
      },

      onAction: function () {
        $rootScope.$broadcast('chameleon.action');
      },

      notChameleon: function () {
        $rootScope.$broadcast('chameleon.notchameleon');
      }

    });

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

    $rootScope.$on('chameleon.openLink', function (url) {
      if (chameleon.connected()) {
        chameleon.intent({
          action: 'android.intent.action.VIEW',
          data: url
        });
      }
    });

  });