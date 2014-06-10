# form-element

A cross-browser helper function to retrieve a form element/input by name.

## Usage

```html
<form id="my-form">
    <input type="text" name="username">
</form>
```

```js
var element = require("form-element");
var form = document.querySelector("#my-form");

element(form, "username");
// => <input type="text" name="username">
```

## API

### element(form, name)

This is a wrapper for
[`form.elements.namedItem()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection).
Thus, it can return either a single node or a list of nodes that match the input `name`.

If *no* element(s) are found with the given `name`, this function will **throw** a `RangeError`.
