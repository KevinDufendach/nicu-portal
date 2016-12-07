/**
 * Created by Kevin on 11/7/2016.
 */

(function () {

  angular.module('app')
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.definePalette('cchmcteal', {
        '50': '#d2f8ff',
        '100': '#86edff',
        '200': '#4ee4ff',
        '300': '#06daff',
        '400': '#00c4e7',
        '500': '#00aac8',
        '600': '#0090a9',
        '700': '#00768b',
        '800': '#005c6c',
        '900': '#00424e',
        'A100': '#d2f8ff',
        'A200': '#86edff',
        'A400': '#00c4e7',
        'A700': '#00768b',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
      });

      $mdThemingProvider.definePalette('cchmcgreen', {
        '50': '#ffffff',
        '100': '#daebcf',
        '200': '#bbdba8',
        '300': '#94c675',
        '400': '#84bd5f',
        '500': '#73b44a',
        '600': '#659e41',
        '700': '#578938',
        '800': '#49732f',
        '900': '#3c5d26',
        'A100': '#ffffff',
        'A200': '#daebcf',
        'A400': '#84bd5f',
        'A700': '#578938',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
      });

      $mdThemingProvider.definePalette('ccpink', {
        '50': '#f9ecf3',
        '100': '#f7e6f0',
        '200': '#eabbd6',
        '300': '#d985b5',
        '400': '#d16da7',
        '500': '#ca5699',
        '600': '#c33f8b',
        '700': '#ad367b',
        '800': '#952f6a',
        '900': '#7e285a',
        'A100': '#e37db7',
        'A200': '#d22d8b',
        'A400': '#b30068',
        'A700': '#8a0f57',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': '50 100 200 300 400 500 A100'
      });

      $mdThemingProvider.definePalette('cchmcgray', {
        '50': '#dcdedf',
        '100': '#b5b8ba',
        '200': '#989c9f',
        '300': '#74797c',
        '400': '#65696c',
        '500': '#565a5c',
        '600': '#474b4c',
        '700': '#383b3c',
        '800': '#2a2c2d',
        '900': '#1b1c1d',
        'A100': '#dcdedf',
        'A200': '#b5b8ba',
        'A400': '#65696c',
        'A700': '#383b3c',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': '50 100 200 A100 A200'
      });

      $mdThemingProvider.theme('default')
        .primaryPalette('cchmcteal')
        .accentPalette('ccpink')
        .warnPalette('orange')
      ;

    });


})();