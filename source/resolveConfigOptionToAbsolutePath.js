import path from 'path'
import assert from 'assert'
import { Configuration } from './Configuration.class.js'

/**
 * Converts paths that are relative to absolute using `rootPath` as base for the relative paths.
 * 
 */
export function resolveConfigOptionToAbsolutePath({
    optionPath, 
    rootPath // instance of Configuration class
}) {
    optionPath = (!path.isAbsolute(optionPath)) ? // check if is relative or absolute.
        path.join(rootPath, optionPath) : // resolve path relative to root.
        optionPath;
    return optionPath
}
