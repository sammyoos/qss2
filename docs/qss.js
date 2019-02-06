"use strict";
var qss;
(function (qss) {
    console.log('where does this get hit????');
    var Cell = /** @class */ (function () {
        function Cell(name, r, c) {
            this.nonFactors = new qss.FlagSet();
            this.val = 0;
            this.valueChangeListener = [];
            this.nam = name;
            this.row = r;
            this.col = c;
        }
        Cell.prototype.addValueChangeListener = function (func) {
            this.valueChangeListener.push(func);
        };
        Cell.prototype.change = function (newValue, initalValues) {
            this.val = newValue;
            for (var i = 0; i < this.valueChangeListener.length; i++) {
                this.valueChangeListener[i](newValue, initalValues);
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
    var Grouping = /** @class */ (function () {
        function Grouping(g) {
            this.factorComplete = new qss.FlagSet();
            this.groupComplete = false;
            this.group = g;
        }
        Grouping.prototype.reduceFactors = function () {
            if (this.groupComplete)
                return -1;
            // find next set value
            for (var i = 0; i < 9; i++) {
                var row = this.group[i];
                // check each factor
                for (var f = 0; f < 9; f++) {
                    if (this.factorComplete.check(f))
                        continue;
                }
                if (row[i] != null)
                    continue;
            }
            console.log(this.group);
            return -1;
        };
        return Grouping;
    }());
    qss.Grouping = Grouping;
    var Board = /** @class */ (function () {
        function Board() {
            this.map = {};
            var rows = [new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9)];
            var cols = [new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9)];
            var blks = [new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9)];
            console.log('building array...');
            for (var r = 0; r < 9; r++) {
                for (var c = 0; c < 9; c++) {
                    var name_1 = 'cell-' + r + ':' + c;
                    var cell = new Cell(name_1, r, c);
                    this.map[name_1] = cell;
                    rows[r][c] = cell;
                    cols[c][r] = cell;
                    blks[8 - Board.outerBlockLookup[r][c]][8 - Board.innerBlockLookup[r][c]] = cell;
                }
            }
            this.row = new Grouping(rows);
            this.col = new Grouping(cols);
            this.blk = new Grouping(blks);
        }
        Board.outerBlockLookup = [[8, 8, 8, 7, 7, 7, 6, 6, 6], [8, 8, 8, 7, 7, 7, 6, 6, 6], [8, 8, 8, 7, 7, 7, 6, 6, 6], [5, 5, 5, 4, 4, 4, 3, 3, 3], [5, 5, 5, 4, 4, 4, 3, 3, 3], [5, 5, 5, 4, 4, 4, 3, 3, 3], [2, 2, 2, 1, 1, 1, 0, 0, 0], [2, 2, 2, 1, 1, 1, 0, 0, 0], [2, 2, 2, 1, 1, 1, 0, 0, 0],];
        Board.innerBlockLookup = [[8, 7, 6, 8, 7, 6, 8, 7, 6], [5, 4, 3, 5, 4, 3, 5, 4, 3], [2, 1, 0, 2, 1, 0, 2, 1, 0], [8, 7, 6, 8, 7, 6, 8, 7, 6], [5, 4, 3, 5, 4, 3, 5, 4, 3], [2, 1, 0, 2, 1, 0, 2, 1, 0], [8, 7, 6, 8, 7, 6, 8, 7, 6], [5, 4, 3, 5, 4, 3, 5, 4, 3], [2, 1, 0, 2, 1, 0, 2, 1, 0],];
        return Board;
    }());
    qss.Board = Board;
    qss.loadPuzzle = function (idx, board) {
        var puz = qss.puzzles[idx];
        for (var r = 0; r < 9; r++) {
            for (var c = 0; c < 9; c++) {
                if (puz[r][c] > 0) {
                    board.row.group[r][c].change(puz[r][c], true);
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
        cell.addValueChangeListener(function (newValue, initialValues) {
            factors.hide();
            choice.text(newValue).addClass(initialValues ? 'initialColor' : 'choiceColor');
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
