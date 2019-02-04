type numberCallback = (n: number) => any;
type voidCallback = ( ) => any;

namespace qss {
  console.log( 'where does this get hit????' );

  export class Cell {
    public readonly row: number;
    public readonly col: number;
    public readonly nam: string;

    private val: number = 0;
    private valueChangeListener: numberCallback[] = [];
    
    constructor ( name: string, r: number, c: number ) {
      this.nam = name;
      this.row = r;
      this.col = c;
    }

    public addValueChangeListener( func: numberCallback ) {
      this.valueChangeListener.push( func );
    }

    public change( newValue: number ) {
      this.val = newValue;
      for( let i=0; i<this.valueChangeListener.length; i++ ) {
        this.valueChangeListener[i]( newValue );
      }
    }

    public reduceFactors() {
      if( this.val > 0 ) {
        console.log( 'yahoo' );
      }
    }

  }

  export class Board {
    public readonly loc: Cell[][] = [ Array( 9 ), Array( 9 ), Array( 9 ), Array( 9 ), Array( 9 ), Array( 9 ), Array( 9 ), Array( 9 ), Array( 9 ) ];
    public readonly map: { [ key: string ]: Cell; } = {};

    constructor () {
      console.log( 'building array...' );
      for( let r=0; r<9; r++ ){
        for( let c=0; c<9; c++ ){
          let name: string = 'cell-' + r + ':' + c;
          let cell = new Cell(  name, r, c );

          this.loc[r][c] = cell;
          this.map[ name ] = cell;
        }
      }
    }
  }


  export let loadPuzzle = function( idx: number, board: Board ) {
    let puz = qss.puzzles[ idx ];
    for( let r=0; r<9; r++ ){
      for( let c=0; c<9; c++ ){
        if( puz[r][c] > 0 ) {
          board.loc[r][c].change( puz[r][c] );
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

    cell.addValueChangeListener( function( newValue: number ) {
      choice.text( newValue );
      cQ.push( function() { factors.hide(); });
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
