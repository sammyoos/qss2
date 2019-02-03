"use strict";
var qss;
(function (qss) {
    var FlagSet = /** @class */ (function () {
        function FlagSet() {
            this.MAX_FLAGS = 16;
            this.FLAGS = [];
            this._flag = 0;
            // precreate all the unit flags
            var f = 0;
            var slider = 1;
            while (f < this.MAX_FLAGS) {
                this.FLAGS[f++] = slider;
                slider <<= 1;
            }
        }
        FlagSet.prototype.flag = function (pos) {
            this._flag |= this.FLAGS[pos];
            return this;
        };
        FlagSet.prototype.unflag = function (pos) {
            this._flag &= ~this.FLAGS[pos];
            return this;
        };
        FlagSet.prototype.check = function (pos) {
            return ((this._flag & this.FLAGS[pos]) != 0);
        };
        FlagSet.prototype.only = function (pos) {
            return (this._flag == this.FLAGS[pos]);
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
        return FlagSet;
    }());
    qss.FlagSet = FlagSet;
})(qss || (qss = {}));
// vim: set autoindent expandtab tabstop=2 shiftwidth=2 :
