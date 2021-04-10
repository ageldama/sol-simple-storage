const SimpleStorage = artifacts.require('SimpleStorage')

contract('SimpleStorage', accounts => {
  let simpleStorage

  before(async () => {
    simpleStorage = await SimpleStorage.deployed()
  })

  it('should set=123 and get it back', async () => {
    let acct1 = accounts[0]
    let acct2 = accounts[1]
    await simpleStorage.set(123, {from: acct1})
    assert.equal(await simpleStorage.get().toNumber(), 123)
  })
})

