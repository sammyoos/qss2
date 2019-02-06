
QUnit.test( 'basic FlagSet', function( assert ) {

	// console.log( qss );
	assert.ok( qss, 'name space loaded' );

	let flags = new qss.FlagSet();
	// console.log( flags );
	assert.ok( flags, 'flags created......' );
	assert.equal( flags.toValue(), 0, 'initial value 0......' );
	// assert.equal( qss.FLAGS[0], 1, 'check flag 0......' );
	// assert.equal( qss.FLAGS[2], 4, 'check flag 2......' );
	assert.equal( qss.FlagSet.FLAGS[0], 1, 'check the base flags......' );
	assert.equal( qss.FlagSet.FLAGS[1], 2, 'check the base flags......' );
});

QUnit.test( 'FlagSet functions', function( assert ) {
	let flags = new qss.FlagSet();
	assert.equal( qss.FlagSet.FLAGS[0], 1, 'check the base flags......' );
	assert.equal( qss.FlagSet.FLAGS[1], 2, 'check the base flags......' );

	assert.equal( flags.setAll( 8 ).toValue(), 255, 'set the first eight bits......' );
	assert.equal( flags.count(), 8, 'should be eight bits set......' );
	assert.ok( flags.check( 3 ), 'check position 3......' );
	assert.ok( ! flags.only( 3 ), 'not only position 3......' );
	assert.equal( flags.unflag( 0 ).toValue(), 254, 'unset bit 0......' );
	assert.equal( flags.count(), 7, 'should be seven bits set......' );
	assert.equal( flags.unflag( 2 ).toValue(), 250, 'unset bit 2......' );
	assert.equal( flags.count(), 6, 'should be six bits set......' );
	assert.equal( flags.clear().toValue(), 0, 'unset all bits......' );
	assert.equal( flags.count(), 0, 'should be zero bits set......' );
	assert.equal( flags.flag( 2 ).toValue(), 4, 'set bit 2......' );
	assert.equal( flags.count(), 1, 'should be one bit set......' );
	assert.ok( flags.check( 2 ), 'check position 2......' );
	assert.ok( flags.only( 2 ), 'only position 2......' );
	assert.ok( ! flags.check( 3 ), 'not check position 3......' );
	assert.ok( ! flags.only( 3 ), 'not only position 3......' );
});

