
type changeCallback = (n: number, c: boolean ) => any;
type numberCallback = (n: number) => any;
type voidCallback = ( ) => any;

namespace qss {
  type groupType = Cell[];
  console.log( 'where does this get hit????' );

  export class Cell {
    public readonly row: number;
    public readonly col: number;
    public readonly nam: string;
    public readonly factors = new FlagSet( 9  );

    private val: number = 0;
    private valueChangeListener: changeCallback[] = [];
    
    constructor ( name: string, r: number, c: number ) {
      this.nam = name;
      this.row = r;
      this.col = c;
    }

    public addValueChangeListener( func: changeCallback ) {
      this.valueChangeListener.push( func );
    }

    public change( newValue: number, initalValues: boolean ) {
      this.val = newValue;
      for( let i=0; i<this.valueChangeListener.length; i++ ) {
        this.valueChangeListener[i]( newValue, initalValues );
      }
    }

    public getValue() :number {
      return this.val;
    }
  }

  export class Grouping {
    public readonly row: groupType;
    public readonly factorComplete = new FlagSet( 9 );

    constructor ( g: groupType ) {
      this.row = g;
    }

    public reduceFactor( fac: number ) {
      if( this.factorComplete.toValue() == 0 ) return -1;
      // for( let i
      console.log( fac );

      return 0;
    }

    public initalReduceFactors() : number {
      for( let i=0; i<9; i++ ) {
        let cell = this.row[i];
        let value = cell.getValue();

        if( value == 0 ) continue;




        }

        // check each factor
        for( let f=0; f<9; f++ ) {
          if( this.factorComplete.check(f) ) continue;
        }

        if( row[ i ] != null ) continue;
      }

      console.log( this.group );
      return -1;
    }

  }


  export class Board {
    public readonly map: { [ key: string ]: Cell; } = {};

    public readonly row: Grouping[] = [];
    public readonly col: Grouping[] = [];
    public readonly blk: Grouping[] = [];

    private static outerBlockLookup = [ [ 8, 8, 8, 7, 7, 7, 6, 6, 6 ], [ 8, 8, 8, 7, 7, 7, 6, 6, 6 ], [ 8, 8, 8, 7, 7, 7, 6, 6, 6 ], [ 5, 5, 5, 4, 4, 4, 3, 3, 3 ], [ 5, 5, 5, 4, 4, 4, 3, 3, 3 ], [ 5, 5, 5, 4, 4, 4, 3, 3, 3 ], [ 2, 2, 2, 1, 1, 1, 0, 0, 0 ], [ 2, 2, 2, 1, 1, 1, 0, 0, 0 ], [ 2, 2, 2, 1, 1, 1, 0, 0, 0 ], ];
    private static innerBlockLookup = [ [ 8, 7, 6, 8, 7, 6, 8, 7, 6 ], [ 5, 4, 3, 5, 4, 3, 5, 4, 3 ], [ 2, 1, 0, 2, 1, 0, 2, 1, 0 ], [ 8, 7, 6, 8, 7, 6, 8, 7, 6 ], [ 5, 4, 3, 5, 4, 3, 5, 4, 3 ], [ 2, 1, 0, 2, 1, 0, 2, 1, 0 ], [ 8, 7, 6, 8, 7, 6, 8, 7, 6 ], [ 5, 4, 3, 5, 4, 3, 5, 4, 3 ], [ 2, 1, 0, 2, 1, 0, 2, 1, 0 ], ];

    constructor () {
      let rows: Cell[][] = [ new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ) ];
      let cols: Cell[][] = [ new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ) ];
      let blks: Cell[][] = [ new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ), new Array( 9 ) ];

      console.log( 'building array...' );
      for( let r=0; r<9; r++ ){
        this.row.push( new Grouping( rows[r] ));
        this.col.push( new Grouping( cols[r] ));
        this.blk.push( new Grouping( blks[r] ));

        for( let c=0; c<9; c++ ){
          let name: string = 'cell-' + r + ':' + c;
          let cell = new Cell(  name, r, c );
          this.map[ name ] = cell;

          rows[r][c] = cell;
          cols[c][r] = cell;
          blks[ 8-Board.outerBlockLookup[r][c] ][ 8-Board.innerBlockLookup[r][c] ] = cell;
        }
      }

    }
  }


  export let loadPuzzle = function( idx: number, board: Board ) {
    let puz = qss.puzzles[ idx ];
    for( let r=0; r<9; r++ ){
      for( let c=0; c<9; c++ ){
        if( puz[r][c] > 0 ) {
          board.row[r].group[c].change( puz[r][c], true );
        }
      }
    }
  }

} //- end of namespace: qss


function initUI_cells( brd: qss.Board, cQ: voidCallback[] ) {
  $( "td.cell" ).each( function(){
    let me = $(this);
    let tID = me.attr( 'id' );

    if( typeof tID == 'undefined' || !tID ) return;
    let cell = brd.map[ tID ];

    let factors = me.find( "table" );
    let choice  = me.find( "div" );

    cell.addValueChangeListener( function( newValue: number, initialValues: boolean ) {
      factors.hide();
      choice.text( newValue ).addClass( initialValues ? 'initialColor' : 'choiceColor' );
      cQ.push( function() { choice.show(); });
    });
  });
}

function dequeueAllEvents( cQ: voidCallback[] ) {
  let blanks = 0;
  let pid = setInterval( function() {
    if( cQ.length == 0 ) {
      if( ++blanks > 5 ) {
        clearInterval( pid );
        console.info( "...and we are done..." );
      }
			return;
		}

    let change = cQ.shift();
    if( typeof change == 'undefined' || !change ) return;
    change();
	}, 50 );
}


$( document ).ready( function(){
  console.log( 'Starting to quirk' );

  let changeQueue: voidCallback[] = [];
  let board = new qss.Board();

  initUI_cells( board, changeQueue );
  qss.loadPuzzle( 0, board );
  dequeueAllEvents( changeQueue );
});


// vim: set autoindent expandtab tabstop=2 shiftwidth=2 :
