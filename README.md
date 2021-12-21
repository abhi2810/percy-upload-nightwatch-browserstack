# Percy Upload with Screenshots from Nightwatch and Browserstack

Demo repository to showcase workaround of using screenshots captured on real devices for Visual Testing using [Percy Upload](https://docs.percy.io/docs/cli-upload).

- Initialize environment variables `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY` and `PERCY_TOKEN`.
- Usage:
  - For baseline: `./run-test.sh -b master`
  - For changes: `./run-test.sh -b changed`

Note: Viewport Screenshot is a limitation of Appium. To get full page screenshots on real mobile devices; multiple screenshots and image processing to stitch images will be required. Please refer to the file [ScreenshotUtils.js](/tests/utils/screenshotUtil.js) for basic implementation. 
