const path = require('path')
const resolvedModule = {
  get deploymentScript() {
    try {
    return path.dirname(require.resolve(`@deployment/deploymentScript/package.json`))
      
    } catch (error) {
      return 
    }
  },
}

module.exports = {
  script: [
    {
      type: 'directory',
      path: `${resolvedModule.deploymentScript}/script`,
    },
  ],
}
