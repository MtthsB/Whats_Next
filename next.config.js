const withSass = require('@zeit/next-sass') // eslint-disable-line
const withImages = require('next-images')  // eslint-disable-line
module.exports = withSass(withImages())
