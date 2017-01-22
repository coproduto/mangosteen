var Mangler = require("./mangler").default;
var UniqueGen = require("./unique").default;

var mangosteen = {
  Mangler: Mangler,
  UniqueGen: UniqueGen
};

module.exports = mangosteen;
module.exports.default = mangosteen;
