const commonHooks = require("../utils/hooks");
const { saveScreenshot } = require("../utils/screenshotUtil");

describe("Website Tests", () => {
  this.tags = ["product"];

  beforeEach(commonHooks.beforeEach);
  afterEach(commonHooks.afterEach);

  it("screenshots", async (browser) => {
    await browser.waitForElementVisible(".wrapper");
    await browser.pause(5000);
    await saveScreenshot(browser, "HomePage");
    // browser.saveScreenshot('images/index.png');

    await browser.url(`${browser.launchUrl}/login.html`);
    await browser.pause(2000);
    await saveScreenshot(browser, "Login");
    // browser.saveScreenshot('images/login.png');

    await browser.url(`${browser.launchUrl}/signup.html`);
    await browser.pause(2000);
    await saveScreenshot(browser, "Signup");
    // browser.saveScreenshot('images/signup.png');

    await browser.url(`${browser.launchUrl}/404_error.html`);
    await browser.pause(2000);
    await saveScreenshot(browser, "404_error");
    // browser.saveScreenshot('images/404_error.png');

    await browser.url(`${browser.launchUrl}/500_error.html`);
    await browser.pause(2000);
    await saveScreenshot(browser, "500_error");
    // browser.saveScreenshot('images/500_error.png');
  });

  after(commonHooks.after);
});
