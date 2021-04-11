// READ: https://eips.ethereum.org/EIPS/eip-20

const chai = require("chai");
const assert = require("chai").assert;

const HansToken = artifacts.require("HansToken");

contract("HansToken", (accounts) => {
  let hansToken;

  before(async () => {
    hansToken = await HansToken.deployed();
  });

  it("initial balanceOf(accounts[0]) and basic `transfer`", async () => {
    let acct1 = accounts[0];
    let acct2 = accounts[1];
    assert.equal(await hansToken.totalSupply(), 1000);
    assert.equal(await hansToken.balanceOf(acct1), 1000);
    assert.equal(await hansToken.balanceOf(acct2), 0);

    // transfer
    const transferResult = await hansToken.transfer(acct2, 1);
    const transferLog = transferResult.logs[0];
    assert.equal(transferLog.event, "Transfer");
    assert.equal(transferLog.args.from, acct1);
    assert.equal(transferLog.args.to, acct2);
    assert.equal(transferLog.args.value.toNumber(), 1);
    assert.equal(await hansToken.balanceOf(acct1), 999);
    assert.equal(await hansToken.balanceOf(acct2), 1);
  });

  it("allowance, approve and transferFrom", async () => {
    let acct1 = accounts[0];
    let acct3 = accounts[2];
    let acct4 = accounts[3];

    let balance1 = (await hansToken.balanceOf(acct1)).toNumber();
    assert.isAtLeast(balance1, 10);
    assert.equal((await hansToken.allowance(acct1, acct3)).toNumber(), 0);

    try {
      await hansToken.transferFrom(acct3, acct4, 1);
      assert.equal(0, 1);
    } catch {}

    assert.isOk(await hansToken.approve(acct3, 3));
    assert.equal((await hansToken.allowance(acct1, acct3)).toNumber(), 3);

    assert.isOk(await hansToken.transferFrom(acct1, acct4, 2, { from: acct3 }));
    assert.equal((await hansToken.allowance(acct1, acct3)).toNumber(), 1);
    assert.equal((await hansToken.allowance(acct1, acct4)).toNumber(), 0);
    assert.equal((await hansToken.allowance(acct3, acct4)).toNumber(), 0);
    assert.equal((await hansToken.balanceOf(acct1)).toNumber(), balance1 - 2);
    assert.equal((await hansToken.balanceOf(acct3)).toNumber(), 0);
    assert.equal((await hansToken.balanceOf(acct4)).toNumber(), 2);
  });
});
