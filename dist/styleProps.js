"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProperties = exports.transformKeys = exports.transformPropertyKey = exports.transformProperty = void 0;
var utils_1 = require("./utils");
var spacingProperties = {
    margin: true,
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,
    marginHorizontal: true,
    marginVertical: true,
    padding: true,
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
    paddingHorizontal: true,
    paddingVertical: true,
};
var spacingPropertiesShorthand = {
    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mh: 'marginHorizontal',
    mv: 'marginVertical',
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    ph: 'paddingHorizontal',
    pv: 'paddingVertical',
};
var typographyProperties = {
    fontFamily: true,
    fontSize: true,
    fontStyle: true,
    fontWeight: true,
    letterSpacing: true,
    lineHeight: true,
    textAlign: true,
    textDecorationLine: true,
    textDecorationStyle: true,
    textTransform: true,
};
var layoutProperties = {
    width: true,
    height: true,
    minWidth: true,
    maxWidth: true,
    minHeight: true,
    maxHeight: true,
    overflow: true,
    aspectRatio: true,
    alignContent: true,
    alignItems: true,
    alignSelf: true,
    justifyContent: true,
    flex: true,
    flexBasis: true,
    flexDirection: true,
    flexGrow: true,
    flexShrink: true,
    flexWrap: true,
};
var positionProperties = {
    position: true,
    top: true,
    right: true,
    bottom: true,
    left: true,
    zIndex: true,
};
var borderProperties = {
    borderBottomWidth: true,
    borderLeftWidth: true,
    borderRightWidth: true,
    borderStyle: true,
    borderTopWidth: true,
    borderWidth: true,
};
var borderRadiusProperties = {
    borderRadius: true,
    borderBottomLeftRadius: true,
    borderBottomRightRadius: true,
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
};
var borderColorProperties = {
    borderColor: true,
    borderTopColor: true,
    borderRightColor: true,
    borderLeftColor: true,
    borderBottomColor: true,
};
var shadowProperties = {
    shadowOpacity: true,
    shadowOffset: true,
    shadowRadius: true,
    elevation: true,
};
var textShadowProperties = {
    textShadowOffset: true,
    textShadowRadius: true,
};
var tintColorProperties = {
    tintColor: true,
};
exports.transformProperty = {};
exports.transformPropertyKey = {};
exports.transformProperty['textShadowColor'] = function (theme, value) { var _a; return (_a = theme.colors[value]) !== null && _a !== void 0 ? _a : value; };
exports.transformProperty['shadowColor'] = function (theme, value) { var _a; return (_a = theme.colors[value]) !== null && _a !== void 0 ? _a : value; };
exports.transformProperty['backgroundColor'] = function (theme, value) { var _a; return (_a = theme.colors[value]) !== null && _a !== void 0 ? _a : value; };
exports.transformProperty['color'] = function (theme, value) { var _a; return (_a = theme.colors[value]) !== null && _a !== void 0 ? _a : value; };
for (var _i = 0, _a = utils_1.safeKeys(borderRadiusProperties); _i < _a.length; _i++) {
    var key = _a[_i];
    exports.transformProperty[key] = function (theme, value) { var _a; return (_a = theme.borderRadii[value]) !== null && _a !== void 0 ? _a : value; };
}
for (var _b = 0, _c = utils_1.safeKeys(spacingProperties); _b < _c.length; _b++) {
    var key = _c[_b];
    exports.transformProperty[key] = function (theme, value) { var _a; return (_a = theme.spacing[value]) !== null && _a !== void 0 ? _a : value; };
}
for (var _d = 0, _e = utils_1.safeKeys(spacingPropertiesShorthand); _d < _e.length; _d++) {
    var key = _e[_d];
    exports.transformProperty[key] = function (theme, value) { var _a; return (_a = theme.spacing[value]) !== null && _a !== void 0 ? _a : value; };
    exports.transformPropertyKey[key] = spacingPropertiesShorthand[key];
}
for (var _f = 0, _g = utils_1.safeKeys(borderColorProperties); _f < _g.length; _f++) {
    var key = _g[_f];
    exports.transformProperty[key] = function (theme, value) { var _a; return (_a = theme.colors[value]) !== null && _a !== void 0 ? _a : value; };
}
for (var _h = 0, _j = utils_1.safeKeys(tintColorProperties); _h < _j.length; _h++) {
    var key = _j[_h];
    exports.transformProperty[key] = function (theme, value) { var _a; return (_a = theme.colors[value]) !== null && _a !== void 0 ? _a : value; };
}
exports.transformKeys = new Set(utils_1.safeKeys(exports.transformProperty));
exports.allProperties = new Set(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], utils_1.safeKeys(spacingProperties)), utils_1.safeKeys(typographyProperties)), utils_1.safeKeys(layoutProperties)), utils_1.safeKeys(positionProperties)), utils_1.safeKeys(borderProperties)), utils_1.safeKeys(borderRadiusProperties)), utils_1.safeKeys(borderColorProperties)), utils_1.safeKeys(shadowProperties)), utils_1.safeKeys(textShadowProperties)), utils_1.safeKeys(tintColorProperties)), Array.from(exports.transformKeys)));
