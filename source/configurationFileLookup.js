const path = require('path')

/**
 * Find configuration file according to specific assumptions and configuration of this module with preset defaults.
 * Assumptions made: 
 *  - 'configuration' argument set relative to current working directory.
 * or
 *  - current working directory is the location where 'configuration' module should be present (e.g. '<app path>/setup')
 */
export function configurationFileLookup({ 
    configurationPath = 'configuration', // could be absolute or relative to CWD & base path. (can be also the name of the file)
    currentDirectory,
    configurationBasePath = [], // [string | array] path of directories where the configuration file should be searched in (additional starting path to look from). In case relative path it will be relative to the current working directory.
    possibleConfigurationPath = [] // accumulator of possible configuration paths to look for.
    
} = {}) {
    // TODO:(deal with this comment) default where the assumption that script executed in path '<app path>/setup'

/** Parameters initialization, sanitization, and validation */

    // if `configurationBasePath` is a string, convert it to an array. 
    if(!Array.isArray(configurationBasePath)) configurationBasePath = [ configurationBasePath ]

    // transform all configurationBase paths to absolute
    configurationBasePath = configurationBasePath.map(basePath => {
        if(path.isAbsolute(basePath)) return basePath
        else return path.join(currentDirectory, basePath) 
    })

    // add CWD to base paths that search will start from - by default search will always CWD as starting point.
    configurationBasePath.push(currentDirectory)

/** Create possible absolute configuration paths */

    // add base paths to possible configuration paths.
    possibleConfigurationPath = possibleConfigurationPath.concat(configurationBasePath) 

    // add provided configuration path to possible configuration paths (the lookup algorithm will be executed regardless of provided configuration path).
    if(configurationPath) { 
        if(path.isAbsolute(configurationPath)) // absolute
            possibleConfigurationPath.push(configurationPath)
        else { // relative path
            // relative to provided `configurationBasePath` base paths - paths to search from.
            possibleConfigurationPath = possibleConfigurationPath.concat(configurationBasePath.map(basePath => path.join(basePath, configurationPath))) 
        }
    }
    
    // remove duplicate paths if any
    possibleConfigurationPath = [...new Set(possibleConfigurationPath)] // filters any duplicates as `Set` creates an iterable with unique elements, i.e. filtering duplicates.

/** try loading configuration file, on first success break. */

    let configuration, errorAccumulator = [], index = 0, configurationAbsolutePath;
    while(index < possibleConfigurationPath.length) {
        let configurationPath = possibleConfigurationPath[index]
        try {
            configuration = require(configurationPath)
            configurationAbsolutePath = configurationPath
            break;
        } catch(error) {
            // try requiring all array loops
            errorAccumulator.push(error)
        }
        index++
    }
    if(!configuration) {
        console.log(`%c45455455`, 'color: #F99157;', 'X `configuration` parameter (relative configuration path from PWD) in command line argument must be set, because the configuration algorithm failed to look it up.')
        console.log(errorAccumulator)
        throw new Error('• Lookup algorithm for app configuration path from current working directory failed.')
    }

    process.argv = process.argv.filter(value => value !== `configuration=${configurationPath}`) // remove configuration paramter
    return { 
        configuration, // configuration object
        path: configurationAbsolutePath // configuration absolute path
    }
}
