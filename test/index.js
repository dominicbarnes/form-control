var assert = require("assert");
var domify = require("domify");
var element = require("../index.js");
var value = require("value");
var form = domify(require("./form.html"));

describe("element(root, name)", function () {
    it("should retrieve the username field", function () {
        var input = element(form, "user[name]");

        assert.equal(input.name, "user[name]");
        assert.equal(value(input), "dominicbarnes");
    });

    it("should retrieve the password field", function () {
        var input = element(form, "user[password]");

        assert.equal(input.name, "user[password]");
        assert.equal(value(input), "123456");
    });

    it("should retrieve a nodelist for radio fields", function () {
        var inputs = element(form, "gender");
        assert.equal(inputs.length, 2);
    });

    it("should retrieve the age field", function () {
        var input = element(form, "age");

        assert.equal(input.name, "age");
        assert.equal(value(input), "76-100");
    });

    it("should retrieve a nodelist for checkbox fields", function () {
        var inputs = element(form, "tags");
        assert.equal(inputs.length, 4);
    });

    it("should throw a TypeError when not given an element", function () {
        assert.throws(function () {
            element(null);
        }, TypeError);
    });

    it("should return a fieldset if it has a name", function () {
        var fieldset = element(form, "user");

        assert(fieldset.getAttribute("name") === "user");
        assert(fieldset instanceof HTMLFieldSetElement);
    });

    describe("when used with a fieldset", function () {
        var fieldset = element(form, "user");

        it("should return an element nested in the fieldset", function () {
            var input = element(fieldset, "user[name]");
            assert(input.name === "user[name]");
        });

        it("should not find an element outside it's hierarchy", function () {
            var input = element(fieldset, "age");
            assert(!input);
        });
    });

    describe("when used with arbitrary elements", function () {
        var root = form.querySelector("#test");

        it("should return an element nested in the fieldset", function () {
            var input = element(root, "age");
            assert(input.name === "age");
        });

        it("should not find an element outside it's hierarchy", function () {
            var input = element(root, "gender");
            assert(!input);
        });
    });
});
