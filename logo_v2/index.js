const sharp = require("sharp");

sharp("progressbar-logo-text.svg")
  .resize(200, 200)
  .withMetadata()
  .toFile("build/test.png")
  .then(info => {
    console.log(info);
  })
  .catch(err => {
    console.error(err);
  });
