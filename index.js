
/**
 * Retrieves an element (or elements) from the given `form` by `name`
 *
 * @see HTMLFormElement.elements.namedItem
 *
 * @param {HTMLFormElement} form
 * @param {String} name
 * @returns {HTMLElement}
 */

module.exports = function (form, name) {
    if (!(form instanceof HTMLFormElement)) {
        throw new TypeError("An HTML form element is required");
    }

    var input = form.elements.namedItem(name);

    if (!input) {
        throw new RangeError("Form does not contain element with name: " + name);
    }

    // HACK: IE9 only retrieves a single element when using namedItem (even if it's
    // a checkbox/radio button which may have multiple elements with the same name)
    if (input.type === "checkbox" || input.type === "radio") {
        var retry = form.elements.item(name);
        if (retry) return retry;
    } else {
        return input;
    }
};
