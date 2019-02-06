"use strict";
var qss;
(function (qss) {
    var FlagSet = /** @class */ (function () {
        function FlagSet() {
            this._flag = 0;
            if (FlagSet.FLAGS[1] != undefined)
                return;
            var slider = 1;
            // precreate all the unit flags
            for (var f = 0; f < FlagSet.MAX_FLAGS; f++) {
                FlagSet.FLAGS[f] = slider;
                slider <<= 1;
            }
        }
        FlagSet.prototype.flag = function (pos) {
            this._flag |= FlagSet.FLAGS[pos];
            return this;
        };
        FlagSet.prototype.unflag = function (pos) {
            this._flag &= ~FlagSet.FLAGS[pos];
            return this;
        };
        FlagSet.prototype.check = function (pos) {
            return ((this._flag & FlagSet.FLAGS[pos]) != 0);
        };
        FlagSet.prototype.only = function (pos) {
            return (this._flag == FlagSet.FLAGS[pos]);
        };
        FlagSet.prototype.clear = function () {
            this._flag = 0;
            return this;
        };
        FlagSet.prototype.count = function () {
            var num = 0;
            var flg = this._flag;
            while (flg !== 0) {
                if (flg & 1)
                    ++num;
                flg >>= 1;
            }
            return (num);
        };
        FlagSet.prototype.setAll = function (num) {
            this._flag = 0;
            while (num-- > 0) {
                this._flag <<= 1;
                this._flag |= 1;
            }
            return this;
        };
        FlagSet.prototype.toValue = function () {
            return this._flag;
        };
        FlagSet.MAX_FLAGS = 16;
        FlagSet.FLAGS = [];
        return FlagSet;
    }());
    qss.FlagSet = FlagSet;
})(qss || (qss = {}));
// vim: set autoindent expandtab tabstop=2 shiftwidth=2 :
