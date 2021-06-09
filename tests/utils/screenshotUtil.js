const images = require("join-images");
const rimraf = require("rimraf");
const fs = require("fs");
const Jimp = require("jimp");

exports.saveScreenshot = async (browser, ssname) => {
  await browser.execute(`window.scrollTo(0, 0);`);
  let height = await browser.execute(
    `return window.innerHeight;`,
    [],
    (result) => {
      return Promise.resolve(result.value);
    }
  );
  let width = await browser.execute(
    `return window.innerWidth;`,
    [],
    (result) => {
      return Promise.resolve(result.value);
    }
  );
  let scroll = height;
  let k = 0;
  let scrollHeight = await browser.execute(
    `return document.body.scrollHeight;`,
    [],
    function (result) {
      return Promise.resolve(result.value);
    }
  );
  do {
    let uri = `temp/${ssname}/${ssname}${k}.png`;
    await browser.saveScreenshot(uri);
    await browser.execute(`window.scrollTo(0, "${height}");`);
    await cropImage(uri, width, 0, scroll);
    height = height + scroll;
    if (k >= 9) break;
    k++;
  } while (scrollHeight + scroll >= height);
  if (k > 1) {
    await sleep(2000);
    await processFinalScreenshot(ssname, width, scroll, scrollHeight, k);
  }
  await sleep(2000);
  await stitchScreenshots(
    `temp/${ssname}`,
    `${ssname}`,
    browser.options.desiredCapabilities.device
  );
};

async function processFinalScreenshot(ssname, width, scroll, scrollHeight, k) {
  if (scroll * k > scrollHeight) {
    let finalSize = scrollHeight - scroll * (k - 1);
    let uri = `temp/${ssname}/${ssname}${k - 1}.png`;
    await cropImage(uri, width, scroll - finalSize, finalSize);
  }
}

async function cropImage(uri, width, y, height) {
  await Jimp.read(uri).then((image) => {
    let scalingFactor = image.bitmap.width / width;
    return Promise.resolve(
      image
        .crop(0, y * scalingFactor, image.bitmap.width, height * scalingFactor)
        .write(uri)
    );
  });
}

async function stitchScreenshots(location, ssname, deviceName) {
  let files = fs.readdirSync(location);
  files = files.map((e) => location + "/" + e);
  if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
  }
  await images.joinImages([...files]).then((img) => {
    return Promise.resolve(img.toFile(`images/${ssname} - ${deviceName}.png`));
  });
  rimraf.sync(location);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
