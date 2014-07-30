
/**
 * Retrieves a form control from the given root element. The ideal use-case is for
 * a `<form>` or `<fieldset>`, (via their `elements` API) but arbitrary DOM elements
 * work as well. (via `querySelectorAll`)
 *
 * @param {HTMLElement} root
 * @param {String} name
 *
 * @returns {Mixed}
 */

module.exports = function (root, name) {
    if (!(root instanceof HTMLElement)) {
        throw new TypeError("a root element is required");
    }

    if ("namedItem" in root) {
        return normalize(root.namedItem(name));
    } else if (root.elements) {
        return normalize(root.elements.namedItem(name));
    } else {
        return normalize(bruteForce(root, name));
    }
};


/**
 * When searching an arbitrary element (or for browsers that don't support
 * the elements list properly)
 *
 * @param {HTMLElement} root
 * @param {String} name
 *
 * @return {NodeList}
 */
function bruteForce(root, name) {
    return root.querySelectorAll("[name='" + name + "']");
}

/**
 * Normalizes the value returned by the API:
 *  - when empty, return `null`
 *  - when only a single node, return that node directly
 *  - when a `NodeList`, return an `Array` instead
 *
 * @param {Mixed} ret
 *
 * @return {Mixed}
 */
function normalize(ret) {
    if (!ret) {
        return null;
    } else if (ret instanceof HTMLElement) {
        return ret;
    } else if (ret.length === 0) {
        return null;
    } else if (ret.length === 1) {
        return ret[0];
    } else {
        return [].slice.call(ret);
    }
}
