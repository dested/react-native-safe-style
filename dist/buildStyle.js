"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUseBespokeStyle = exports.extractSafeStyleProps = exports.makeViewProps = exports.makeTextPropsPrefix = exports.makeViewPropsPrefix = exports.makeTextProps = exports.SafeStyleProvider = exports.useSafeStyle = exports.startTheme = void 0;
var react_1 = require("react");
var styleProps_1 = require("./styleProps");
var utils_1 = require("./utils");
function startTheme(theme) {
    return {
        addBaseClasses: function (baseClasses) {
            return {
                addDefaultClasses: function (defaultClasses) {
                    return {
                        addClasses: function (views, texts) {
                            var baseKeys = new Set(Object.keys(baseClasses));
                            var viewKeys = new Set(Object.keys(views));
                            var textKeys = new Set(Object.keys(texts));
                            return {
                                borderRadii: theme.borderRadii,
                                colors: theme.colors,
                                spacing: theme.spacing,
                                defaultClasses: defaultClasses,
                                baseClasses: baseClasses,
                                views: views,
                                texts: texts,
                                baseKeys: baseKeys,
                                viewKeys: viewKeys,
                                textKeys: textKeys,
                                allKeys: new Set(__spreadArray(__spreadArray(__spreadArray([], Array.from(baseKeys)), Array.from(textKeys)), Array.from(viewKeys))),
                                clearCache: clearCache,
                            };
                        },
                    };
                },
            };
        },
    };
}
exports.startTheme = startTheme;
var vStyleCache = new Map();
var tStyleCache = new Map();
var vClassCache = undefined;
var tClassCache = undefined;
var baseClassCache = undefined;
function clearCache() {
    vStyleCache = new Map();
    tStyleCache = new Map();
    vClassCache = undefined;
}
function buildClassCache(theme) {
    try {
        vClassCache = new Map();
        tClassCache = new Map();
        baseClassCache = new Map();
        for (var baseClassKey in theme.baseClasses) {
            baseClassCache.set(baseClassKey, new Map());
            var baseClass = theme.baseClasses[baseClassKey];
            for (var cssProperty in baseClass) {
                if (styleProps_1.transformKeys.has(cssProperty)) {
                    var cssKey = styleProps_1.transformPropertyKey[cssProperty] || cssProperty;
                    baseClassCache
                        .get(baseClassKey)
                        .set(cssKey, styleProps_1.transformProperty[cssProperty](theme, baseClass[cssProperty]));
                }
                else {
                    baseClassCache.get(baseClassKey).set(cssProperty, baseClass[cssProperty]);
                }
            }
        }
        for (var viewKey in theme.views) {
            vClassCache.set(viewKey, parseStyleStructure(theme, theme.views[viewKey]));
        }
        for (var textKey in theme.texts) {
            tClassCache.set(textKey, parseStyleStructure(theme, theme.texts[textKey]));
        }
    }
    catch (ex) {
        console.error(ex);
    }
}
function parseStyleStructure(theme, styleStructure) {
    var classCache = new Map();
    var pieces = Array.isArray(styleStructure) ? styleStructure : [styleStructure];
    for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
        var piece = pieces_1[_i];
        if (typeof piece === 'string') {
            baseClassCache.get(piece).forEach(function (value, key) {
                classCache.set(key, value);
            });
        }
        else {
            for (var cssProperty in piece) {
                if (styleProps_1.transformKeys.has(cssProperty)) {
                    var cssKey = styleProps_1.transformPropertyKey[cssProperty] || cssProperty;
                    classCache.set(cssKey, styleProps_1.transformProperty[cssProperty](theme, piece[cssProperty]));
                }
                else {
                    classCache.set(cssProperty, piece[cssProperty]);
                }
            }
        }
    }
    return classCache;
}
function processStyle(theme, classes, classCache, styleCache, debugStyle) {
    var key = classes.map(function (e) { return (typeof e === 'string' ? e : e.key); }).join(',');
    if (!styleCache.has(key)) {
        var style_1 = new Map();
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var c = classes_1[_i];
            if (typeof c === 'string') {
                if (baseClassCache.has(c)) {
                    baseClassCache.get(c).forEach(function (value, key) {
                        style_1.set(key, value);
                    });
                }
                else if (classCache.has(c)) {
                    classCache.get(c).forEach(function (value, key) {
                        style_1.set(key, value);
                    });
                }
                else {
                    console.warn('class not found', c);
                }
            }
            else {
                var bespoke = c;
                if (styleProps_1.transformKeys.has(bespoke.property)) {
                    var cssKey = styleProps_1.transformPropertyKey[bespoke.property] || bespoke.property;
                    style_1.set(cssKey, styleProps_1.transformProperty[bespoke.property](theme, bespoke.value));
                }
                else {
                    style_1.set(bespoke.property, bespoke.value);
                }
            }
        }
        styleCache.set(key, mapToObj(style_1));
    }
    return styleCache.get(key);
}
function mapToObj(map) {
    return utils_1.fromEntries(map.entries());
}
var functionCache;
function useSafeStyle(theme) {
    if (!vClassCache) {
        buildClassCache(theme);
    }
    return (functionCache !== null && functionCache !== void 0 ? functionCache : (functionCache = {
        view: function (classes, debugStyle) {
            return processStyle(theme, classes, vClassCache, vStyleCache, !!debugStyle);
        },
        text: function (classes, debugStyle) {
            return processStyle(theme, theme.defaultClasses.text ? __spreadArray(__spreadArray([], theme.defaultClasses.text), classes) : classes, tClassCache, tStyleCache, !!debugStyle);
        },
        color: function (color) {
            return theme.colors[color];
        },
        spacing: function (spacing) {
            return theme.spacing[spacing];
        },
    }));
}
exports.useSafeStyle = useSafeStyle;
function SafeStyleProvider(_a) {
    var children = _a.children, theme = _a.theme;
    react_1.useEffect(function () {
        theme.clearCache();
    }, [theme]);
    return children;
}
exports.SafeStyleProvider = SafeStyleProvider;
function assertType(assertion) { }
function makeTextProps(safeStyle) {
    return undefined;
}
exports.makeTextProps = makeTextProps;
function makeViewPropsPrefix(safeStyle, prefix) {
    return undefined;
}
exports.makeViewPropsPrefix = makeViewPropsPrefix;
function makeTextPropsPrefix(safeStyle, prefix) {
    return undefined;
}
exports.makeTextPropsPrefix = makeTextPropsPrefix;
function makeViewProps(safeStyle) {
    return undefined;
}
exports.makeViewProps = makeViewProps;
function extractSafeStyleProps(safeStyle, props, type, prefix) {
    var newProps = __assign({}, props);
    var keys = [];
    var classKeys = [];
    var allKeys = safeStyle.allKeys;
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        if (prefix && key.indexOf(prefix) !== 0)
            continue;
        var testKey = prefix ? key.slice(prefix.length) : key;
        if (allKeys.has(testKey)) {
            delete newProps[key];
            if (props[key] === true) {
                keys.push(testKey);
            }
        }
        if (styleProps_1.allProperties.has(testKey)) {
            delete newProps[key];
            classKeys.push({ property: testKey, value: props[key], key: key + "=" + props[key] });
        }
    }
    return { newProps: newProps, keys: classKeys.length > 0 ? __spreadArray(__spreadArray([], keys), classKeys) : keys };
}
exports.extractSafeStyleProps = extractSafeStyleProps;
function makeUseBespokeStyle(theme) {
    return function (classes) {
        return utils_1.safeEntries(classes).reduce(function (accumulator, currentValue) {
            var classes = Array.isArray(currentValue[1]) ? currentValue[1] : [currentValue[1]];
            var classMap = mergeArrayObjects(classes.map(function (e) {
                var _a;
                return (typeof e === 'string' ? (_a = {}, _a[e] = true, _a) : e);
            }));
            accumulator[currentValue[0]] = classMap;
            return accumulator;
        }, {});
    };
}
exports.makeUseBespokeStyle = makeUseBespokeStyle;
function flatMap(items) {
    var result = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (Array.isArray(item))
            result.push.apply(result, item);
        else {
            result.push(item);
        }
    }
    return result;
}
function mergeArrayObjects(items) {
    var result = {};
    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
        var item = items_2[_i];
        for (var itemKey in item) {
            result[itemKey] = item[itemKey];
        }
    }
    return result;
}
