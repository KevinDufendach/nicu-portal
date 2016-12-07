/**
 * Created by Kevin on 12/5/2016.
 */

(function() {
  'use strict';

  angular.module('app.layout')
    .controller('MenuCtrl', MenuCtrl);

  function MenuCtrl() {
    var vm = this;
    var originatorEv;

    vm.openMenu = openMenu;

    function openMenu($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    }


  }

})();