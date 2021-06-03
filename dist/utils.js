"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeEntries = exports.safeKeys = exports.fromEntries = void 0;
exports.fromEntries = Object.fromEntries ||
    function fromEntries(iterable) {
        var entries = Array.isArray(iterable)
            ? createEntries(iterable)
            : 'entries' in iterable
                ? iterable.entries()
                : iterable;
        var object = {};
        var entry;
        while ((entry = entries.next()) && !entry.done) {
            var pair = entry.value;
            Object.defineProperty(object, pair[0], {
                configurable: true,
                enumerable: true,
                writable: true,
                value: pair[1],
            });
        }
        return object;
    };
function createEntries(array) {
    var i = -1;
    return {
        next: function () {
            var done = array.length <= ++i;
            return {
                done: done,
                value: done ? void 0 : array[i],
            };
        },
    };
}
function safeKeys(obj) {
    return Object.keys(obj);
}
exports.safeKeys = safeKeys;
function safeEntries(obj) {
    return Object.entries(obj);
}
exports.safeEntries = safeEntries;
