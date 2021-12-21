const commonHooks = require("../utils/hooks");
const { saveScreenshot } = require("../utils/screenshotUtil");

describe("Website Tests", () => {
  this.tags = ["product"];

  beforeEach(commonHooks.beforeEach);
  afterEach(commonHooks.afterEach);

  it("screenshots", async (browser) => {
    await browser.waitForElementVisible(".wrapper");
    await saveScreenshot(browser, "HomePage");

    await browser.url(`${browser.launchUrl}/login.html`);
    await saveScreenshot(browser, "Login");

    await browser.url(`${browser.launchUrl}/signup.html`);
    await saveScreenshot(browser, "Signup");

    await browser.url(`${browser.launchUrl}/404_error.html`);
    await saveScreenshot(browser, "404_error");

    await browser.url(`${browser.launchUrl}/500_error.html`);
    await saveScreenshot(browser, "500_error");
  });

  after(commonHooks.after);
});
