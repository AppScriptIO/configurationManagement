const projectConfig = require('../../configuration'),
  path = require('path'),
  filesystem = require('fs')

// • Run
if (filesystem.existsSync(projectConfig.directory.distribution)) module.exports = require(projectConfig.directory.distribution)
else {
  // • Transpilation (babelJSCompiler)
  const { Compiler } = require('@deployment/javascriptTranspilation')
  // TODO: FIX circular dependency - doesn't seem to work properly
  let compiler = new Compiler({
    callerPath: __dirname,
    babelConfig: projectConfig.transpilation.babelConfig /** bypass circular dependency by providing babelConfig when symlinked to javascriptTranspilation module. */,
  })
  compiler.requireHook({ restrictToTargetProject: projectConfig.directory.rootPath /** bypass circular dependency by providing rootPath when symlinked to javascriptTranspilation module. */ })
  module.exports = require(path.join(projectConfig.directory.source, projectConfig.entrypoint.programmaticAPI))
  // way to output runtime transpilation in circular dependency.
  // process.nextTick(() => {
  //   console.log(compiler.loadedFiles) // write any newer files transpiled in successive usage of this module.
  // })
}
