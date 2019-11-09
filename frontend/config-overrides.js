const {
    override,
    addDecoratorsLegacy,
    disableEsLint
  } = require("customize-cra");
module.exports = {
    webpack: override(disableEsLint(),  addDecoratorsLegacy()),
    

}