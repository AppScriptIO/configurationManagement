# Configuration file specification for `appscript` projects: 

## Notes:
- **Relative paths** that are defined in the configuration file are all relative to the project`s root path.
- **Configuration types** - the project can have:
    - Own configuration for defining the root of the project and scripts that are used for deployment. 
    - configurations for the source code itself, i.e. configs for the module logic. Where that can vary between projects.

## Options: 
- **directory.root**:
    _Is the path for the project's root folder._
    - type: string
    - required
- **script**:
    _The path to the folder container the javascript scripts._
    - type: array of objects
        - object.type == module

        or
        - object.type == directory
    - optional / module dependent.

        
- **externalApp.configurationBasePath**:
    _The directories to look in for the configuration file or the configuration file paths themselves. Used in the search lookup algorithm. Could be relative paths to CWD or absolute_
    - type: string or array.
    - optional

- ****