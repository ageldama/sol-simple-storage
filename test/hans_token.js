const HansToken = artifacts.require('HansToken')

contract('HansToken', accounts => {
  let hansToken

  before(async () => {
    hansToken = await HansToken.deployed()
  })

  it('initial balanceOf(accounts[0])', async () => {
    let acct1 = accounts[0]
		let acct2 = accounts[1]
    assert.equal(await hansToken.totalSupply(), 1000)
    assert.equal(await hansToken.balanceOf(acct1), 1000)
    assert.equal(await hansToken.balanceOf(acct2), 0)

		// transfer
		const transferResult = await hansToken.transfer(acct2, 1)
		const transferLog = transferResult.logs[0]
		assert.equal(transferLog.event, 'Transfer')
		assert.equal(transferLog.args.from, acct1)
		assert.equal(transferLog.args.to, acct2)
		assert.equal(transferLog.args.value.toNumber(), 1)
    assert.equal(await hansToken.balanceOf(acct1), 999)
    assert.equal(await hansToken.balanceOf(acct2), 1)
  })
})

