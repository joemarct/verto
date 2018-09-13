/*eslint-env mocha */

const Application = require("spectron").Application;
const expect = require("chai").expect;

describe("Application launch", function() {
  this.timeout(10000);

  beforeEach(function() {
    this.app = new Application({
      // This is the application built with `npm build`
      path: "dist/mac/verto.app/Contents/MacOS/verto"
    });
    return this.app.start();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("shows an initial window", function() {
    return this.app.client.getWindowCount().then(count => {
      expect(count).to.equal(1);
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    });
  });

  it("copies the wallet address", async function() {
    await this.app.client.click("#button-copy-wallet-address");

    const clipboard = await this.app.electron.clipboard.readText();
    const address = await this.app.client.getText("#wallet-address");

    expect(clipboard).to.equal(address);
  });
});
