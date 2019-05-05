rm -r ./distribution
# entrypoint
mkdir -p ./distribution/entrypoint/programmaticAPI/
echo "module.exports = require('../../source/script.js')" >> ./distribution/entrypoint/programmaticAPI/index.js
# source
babel --out-dir ./distribution/source "./source/*" --config-file "./configuration/babel.config.js"
# package.json
babel --out-dir ./distribution/ "./package.json" --config-file "./configuration/babel.config.js" --copy-files
