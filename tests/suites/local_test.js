const commonHooks = require("../hooks");

describe("Website Tests", () => {
	this.tags = ["product"];

	beforeEach(commonHooks.beforeEach);
	afterEach(commonHooks.afterEach);

	it("HomePage", (browser) => {
		browser.waitForElementVisible('.wrapper');
		browser.pause(5000);
		browser.saveScreenshot('images/index.png');
		browser.url(`${browser.launchUrl}/login.html`);
		browser.pause(3000);
		browser.saveScreenshot('images/login.png');
	});

	after(commonHooks.after);
});