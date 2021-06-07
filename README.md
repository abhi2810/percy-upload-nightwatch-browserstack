# Percy Upload with Screenshots from Nightwatch and Browserstack

- Initialize environment variables `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY` and `PERCY_TOKEN`.
- Usage:
  - For baseline: `./run-test.sh -b master`
  - For changes: `./run-test.sh -b changed`

Note: Viewport Screenshot is a limitation of Appium. To get full page screenshots on real mobile devices multiple screenshots and image processing to stitch images will be required.
