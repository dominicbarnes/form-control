var assert = require("assert");
var domify = require("domify");
var element = require("form-element");
var value = require("value");
var form = domify(require("form-element/test/form.html"));

describe("element(form, name)", function () {
    it("should retrieve the username field", function () {
        var input = element(form, "username");

        assert.equal(input.name, "username");
        assert.equal(value(input), "dominicbarnes");
    });

    it("should retrieve the password field", function () {
        var input = element(form, "password");

        assert.equal(input.name, "password");
        assert.equal(value(input), "123456");
    });

    it("should retrieve an array for radio fields", function () {
        var inputs = element(form, "gender");
        assert.equal(inputs.length, 2);
    });

    it("should retrieve the age field", function () {
        var input = element(form, "age");

        assert.equal(input.name, "age");
        assert.equal(value(input), "76-100");
    });

    it("should retrieve an array for checkbox fields", function () {
        var inputs = element(form, "tags");
        assert.equal(inputs.length, 4);
    });

    it("should throw a TypeError when not given a form", function () {
        assert.throws(function () {
            element(null);
        }, TypeError);
    });

    it("should throw a RangeError when the requested input is not found", function () {
        assert.throws(function () {
            element(form, "does-not-exist");
        }, RangeError);
    });
});
