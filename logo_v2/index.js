const sharp = require("sharp");
const del = require("del");

const BUILD_PATH = "./build";

const resize = ({ file, postfix, size, colorspace }) => {
  const [width, height] = size;

  return sharp(`${file}.svg`)
    .resize(width, height)
    .withMetadata()
    // .toColorspace(colorspace)
    .toFile(`${BUILD_PATH}/${file}-w${width}px-h${height}px_${postfix}.png`);
};

const resizeLogo = image => {
  const { sizes, ...newImage } = image;

  return Promise.all(sizes.map(size => resize({ ...newImage, size })));
};

/**
 * @todo DPI https://github.com/lovell/sharp/blob/db4df6f0b2f5e900d1ff06c36b50b726641178d1/test/unit/io.js#L908
 */
const logos = [
  {
    file: "progressbar-logo-text",
    postfix: "whitebg",
    sizes: [[300, 200, 1200]],
    // colorspace: 'b-w',
  },
  {
    file: "progressbar-logo-text",
    postfix: "blackbg",
    sizes: [[300, 200]],
    // colorspace: 'w-b',
  }
];

async function main() {
  await del([`${BUILD_PATH}/**/*.png`]);

  Promise.all(logos.map(resizeLogo))
    .then(info => {
      console.log(info);
      console.log("Complete");
    })
    .catch(err => {
      console.error(err);
    });
}

main();
