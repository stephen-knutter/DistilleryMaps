describe("Distillerymaps home test", function() {
  describe("with Nightwatch", function() {
    before(function(client, done) {
      done();
    });

    after(function(client, done) {
      client.end(function() {
        done();
      });
    });

    afterEach(function(client, done) {
      done();
    });

    beforeEach(function(client, done) {
      done();
    });

    it('uses BDD to test home page', function(client) {
      client
        .url('https://distillerymaps.com')
        .expect.element("body").to.be.present.before(1000);

      client
        .expect.element("li.map-link").to.be.present;

    });

  });
});
