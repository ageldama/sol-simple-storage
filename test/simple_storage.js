const SimpleStorage = artifacts.require('SimpleStorage')

contract('SimpleStorage', accounts => {
  let simpleStorage

  before(async () => {
    simpleStorage = await SimpleStorage.deployed()
  })

  it('should set=123 and get it back', async () => {
    let acct1 = accounts[0]
    await simpleStorage.set(123)
    assert.equal((await simpleStorage.get()).toNumber(), 123)
  })
})

