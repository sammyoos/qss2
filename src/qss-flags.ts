namespace qss {

  export class FlagSet {
    readonly MAX_FLAGS: number = 16;
    readonly FLAGS: number[] = [];
    protected _flag : number = 0;

    constructor () {
      // precreate all the unit flags
      let f:number = 0;
      let slider:number = 1;

      while( f < this.MAX_FLAGS ) {
        this.FLAGS[ f++ ] = slider;
        slider <<= 1;
      }
    }

    flag ( pos: number ) : number {
      this._flag |= this.FLAGS[ pos ];
      return this._flag;
    }

    unflag ( pos: number ) : number {
      this._flag &= ~this.FLAGS[ pos ];
      return this._flag;
    }

    check ( pos: number ) : boolean {
      return( ( this._flag & this.FLAGS[ pos ] ) != 0 );
    }

    only ( pos: number ) : boolean {
      return( this._flag == this.FLAGS[ pos ] );
    }

    clear () : number {
      this._flag = 0;
      return this._flag;
    }

    count () : number {
      let num = 0;
      let flg = this._flag;

      while( flg !== 0 ) {
        if( flg & 1 ) ++num;
        flg >>= 1;
      }

      return( num );
    }

    setAll ( num: number ) : number {
      this._flag = 0;

      while( num-- > 0 ) {
        this._flag <<= 1;
        this._flag |= 1;
      }

      return this._flag;
    }

    toValue () : number {
      return this._flag;
    }
  }

}

// vim: set autoindent expandtab tabstop=2 shiftwidth=2 :
