namespace qss {

  export class FlagSet {
    static readonly MAX_FLAGS: number = 16;
    public static readonly FLAGS: number[] = [];
    protected _flag : number = 0;

    static initialize() {
      // precreate all the unit flags
      let slider:number = 1;
      for( let f=0; f < FlagSet.MAX_FLAGS; f++ ) {
        FlagSet.FLAGS[ f ] = slider;
        slider <<= 1;
      }
    }

    constructor ( numFlags = 0 ) {
      if( numFlags > 0 ) {
        this.setAll( numFlags );
      }
    }

    flag ( pos: number ) : FlagSet {
      this._flag |= FlagSet.FLAGS[ pos ];
      return this;
    }

    unflag ( pos: number ) : FlagSet {
      this._flag &= ~FlagSet.FLAGS[ pos ];
      return this;
    }

    check ( pos: number ) : boolean {
      return( ( this._flag & FlagSet.FLAGS[ pos ] ) != 0 );
    }

    only ( pos: number ) : boolean {
      return( this._flag == FlagSet.FLAGS[ pos ] );
    }

    clear () : FlagSet {
      this._flag = 0;
      return this;
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

    setAll ( num: number ) : FlagSet {
      this._flag = 0;

      while( num-- > 0 ) {
        this._flag <<= 1;
        this._flag |= 1;
      }

      return this;
    }

    toValue () : number {
      return this._flag;
    }
  }

  FlagSet.initialize();
}

// vim: set autoindent expandtab tabstop=2 shiftwidth=2 :
