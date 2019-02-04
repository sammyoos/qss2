"use strict";
var qss;
(function (qss) {
    console.log('where does this get hit????');
    var Cell = /** @class */ (function () {
        function Cell(name, r, c) {
            this.val = 0;
            this.valueChangeListener = [];
            this.nam = name;
            this.row = r;
            this.col = c;
        }
        Cell.prototype.addValueChangeListener = function (func) {
            this.valueChangeListener.push(func);
        };
        Cell.prototype.change = function (newValue) {
            this.val = newValue;
            for (var i = 0; i < this.valueChangeListener.length; i++) {
                this.valueChangeListener[i](newValue);
            }
        };
        Cell.prototype.reduceFactors = function () {
            if (this.val > 0) {
                console.log('yahoo');
            }
        };
        return Cell;
    }());
    qss.Cell = Cell;
    var Board = /** @class */ (function () {
        function Board() {
            this.loc = [Array(9), Array(9), Array(9), Array(9), Array(9), Array(9), Array(9), Array(9), Array(9)];
            this.map = {};
            console.log('building array...');
            for (var r = 0; r < 9; r++) {
                for (var c = 0; c < 9; c++) {
                    var name_1 = 'cell-' + r + ':' + c;
                    var cell = new Cell(name_1, r, c);
                    this.loc[r][c] = cell;
                    this.map[name_1] = cell;
                }
            }
        }
        return Board;
    }());
    qss.Board = Board;
    qss.loadPuzzle = function (idx, board) {
        var puz = qss.puzzles[idx];
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if (puz[r][c] > 0) {
                    board.loc[r][c].change(puz[r][c]);
                }
            }
        }
    };
})(qss || (qss = {})); //- end of namespace: qss
function initUI_cells(brd, cQ) {
    $("td.cell").each(function () {
        var me = $(this);
        var tID = me.attr('id');
        if (typeof tID == 'undefined' || !tID)
            return;
        var cell = brd.map[tID];
        var factors = me.find("table");
        var choice = me.find("div");
        cell.addValueChangeListener(function (newValue) {
            choice.text(newValue);
            cQ.push(function () { factors.hide(); });
            cQ.push(function () { choice.show(); });
        });
    });
}
function dequeueAllEvents(cQ) {
    var blanks = 0;
    var pid = setInterval(function () {
        if (cQ.length == 0) {
            if (++blanks > 5) {
                clearInterval(pid);
                console.info("...and we are done...");
            }
            return;
        }
        var change = cQ.shift();
        if (typeof change == 'undefined' || !change)
            return;
        change();
    }, 50);
}
$(document).ready(function () {
    console.log('Starting to quirk');
    var changeQueue = [];
    var board = new qss.Board();
    initUI_cells(board, changeQueue);
    qss.loadPuzzle(0, board);
    dequeueAllEvents(changeQueue);
});
// vim: set autoindent expandtab tabstop=2 shiftwidth=2 :
