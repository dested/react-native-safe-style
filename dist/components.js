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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeText = exports.makeView = void 0;
var react_1 = require("react");
var react_2 = __importStar(require("react"));
var index_1 = require("./index");
function makeView(theme, Comp) {
    var _a;
    var forwardRefExoticComponent = react_1.memo(react_2.forwardRef(function (_a, ref) {
        var children = _a.children, rest = __rest(_a, ["children"]);
        var view = index_1.useSafeStyle(theme).view;
        var _b = index_1.extractSafeStyleProps(theme, rest, 'view'), newProps = _b.newProps, keys = _b.keys;
        var viewStyle = view(keys, rest.debugStyle);
        if (rest.debugStyle) {
            // console.log(keys, newProps, viewStyle);
            console.log('TRIGGER');
        }
        var FinalComp = Comp; // todo i cannot fix this
        return (react_2.default.createElement(FinalComp, __assign({ ref: ref }, newProps, { style: 'style' in newProps ? [newProps['style'], viewStyle] : viewStyle }), children));
    }));
    forwardRefExoticComponent.displayName = "SafeStyle." + ((_a = Comp === null || Comp === void 0 ? void 0 : Comp.displayName) !== null && _a !== void 0 ? _a : 'NoNameComponent');
    return forwardRefExoticComponent;
}
exports.makeView = makeView;
function makeText(theme, Comp) {
    var _a;
    var forwardRefExoticComponent = react_2.forwardRef(function (_a, ref) {
        var children = _a.children, rest = __rest(_a, ["children"]);
        var text = index_1.useSafeStyle(theme).text;
        var _b = index_1.extractSafeStyleProps(theme, rest, 'text'), newProps = _b.newProps, keys = _b.keys;
        var textStyle = text(keys, rest.debugStyle);
        if (rest.debugStyle) {
            console.log(keys, newProps, textStyle);
        }
        var FinalComp = Comp; // todo i cannot fix this
        return (react_2.default.createElement(FinalComp, __assign({ ref: ref }, newProps, { style: 'style' in newProps ? [newProps['style'], textStyle] : textStyle }), children));
    });
    forwardRefExoticComponent.displayName = "SafeStyle." + ((_a = Comp === null || Comp === void 0 ? void 0 : Comp.displayName) !== null && _a !== void 0 ? _a : 'NoNameComponent');
    return forwardRefExoticComponent;
}
exports.makeText = makeText;
