describe('Chameleon', function () {

  beforeEach(angular.mock.module('widgetgecko.services'));

  it('should contain a Chameleon service', inject(function(Chameleon) {
    expect(Chameleon).not.to.equal(null);
  }));

  it('should broadcast a create event when widget is created', inject(function (Chameleon, $rootScope) {
  }));

})