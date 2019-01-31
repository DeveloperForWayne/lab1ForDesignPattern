const Token = artifacts.require("Token");
const { expectEvent, shouldFail } = require('openzeppelin-test-helpers');

const mode = process.env.MODE;

let tokenInstance;


contract("Token", accounts => {
  
  before(async function() {
    tokenInstance = await Token.deployed();
  });  

  after("write coverage/profiler output", async () => {
    if (mode === "profile") {
      await global.profilerSubprovider.writeProfilerOutputAsync();
    } else if (mode === "coverage") {
      await global.coverageSubprovider.writeCoverageAsync();
    }
  });

  it("Should allow owner to deposit", async () => {
    const owner = accounts[0];
    
    await tokenInstance.deposit(1000, { from: owner });

    assert.equal(
      (await tokenInstance.balanceOf(owner)),
      1000,
      "fail to deposit"
    );
  });

  it("Should allow owner to get total supply", async function(){

    assert.equal(
      (await tokenInstance.totalSupply()),
      0,
      "owner balance is wrong."
    );
  });
  
  it("Should allow owner to transfer", async function() {
    const owner = accounts[0];
    const to = accounts[1];

    await tokenInstance.transfer(to, 500, { from: owner });

    assert.equal(
      (await tokenInstance.balanceOf(to)),
      500,
      "tranfer failed"
    );

  });
});
