const configuration = require('../../../configuration'),
  { Compiler } = require('@dependency/javascriptTranspilation')

// • Transpilation (babelJSCompiler)
let compiler = new Compiler({ babelTransformConfig: configuration.transpilation.babelConfig })
compiler.requireHook()

// • Run
Object.assign(module.exports, require('./')) // add exports that depend on runtime transpilation.
