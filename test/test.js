var thinkgear = require('../lib');
var assert = require("assert");

describe('thinkgear', function() {
  describe('#createClient()', function() {
    it('should create a ThinkGearClient instance', function() {
      assert.equal(thinkgear.createClient().constructor, thinkgear.ThinkGearClient)
    });
  })
})



