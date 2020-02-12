import assert from 'assert'

/** Configuration API
 * An interface for reading configuration object in a way that follows a configuration specification (`appscript` projects configuration rules).
 * TODO: integrate a plugin system to allow extending the configuration api to follow different rules or specifications.
 */
export class Configuration {
  constructor({ configuration = {} }) {
    this.configuration = configuration // bare configuration, can be used directly or through the Configuration class api.

    return new Proxy(this, {
      // redirect requests to `this.configuration` when no method on the instance is found.
      get(target, name) {
        if (!target[name]) return target.configuration[name]
        return target[name]
      },
    })
  }

  get rootPath() {
    let rootPath = this.configuration.directory.root
    assert(rootPath, `❌ Configuration 'root path' option must be defined.`) // validate
    return rootPath
  }

  // Pick transpilation when a list is provided
  getTranspilation({ target = 'serverSide' } = {}) {
    assert(this.configuration.transpilation, `• Configuration (${this.rootPath}) does not have "transpilation" property.`)
    let configList = !Array.isArray(this.configuration.transpilation) ? [this.configuration.transpilation] : this.configuration.transpilation // convert to array

    if (configList.length == 0) return undefined
    else return configList.find(item => item.target == target) || configList[0]
  }
}
