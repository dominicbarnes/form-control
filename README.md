# form-element

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/form-element.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/form-element
[travis-image]: https://img.shields.io/travis/dominicbarnes/form-element.svg?style=flat-square
[travis-url]: https://travis-ci.org/dominicbarnes/form-element

A cross-browser helper function to retrieve a form control by name.

## Install

  `npm install form-element`

## Usage

```html
<form id="my-form">
    <fieldset name="user">
        <legend>User Information</legend>

        <input type="text" name="username">
        <input type="password" name="password">
    </fieldset>

    <input type="checkbox" name="accept">
</form>
```

```js
var element = require("form-element");
var form = document.querySelector("#my-form");

element(form, "username");
// => <input type="text" name="username">

element(form, "accept");
// => <input type="checkbox" name="accept">

element(form, "does-not-exist");
// => null ... this element does not exist at all


// restrict search to a specific fieldset

var fieldset = element(form, "user");

element(fieldset, "accept");
// => null ... this element is not part of the <fieldset>
```

## API

### element(root, name)

Use this API to find a form control via it's `name` in the given `root` element.

When searching a `<form>` or a `<fieldset>` as the `root`, this is a wrapper for
[`root.elements.namedItem()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection).

Otherwise, this will use `root.querySelectorAll()` to find elements with the corresponding `name`.
This method is primarilly intended as a fallback, you should strongly consider using a `<form>` or `<fieldset>`
as a first-resort.

If *no* element(s) are found with the given `name`, this function will return `null`.

**PROTIP:** just about any element with a `name` attribute can be found using this mechanism, so give
your `<fieldset>`s names, and then use the API to search just within that specific `<fieldset>`.
