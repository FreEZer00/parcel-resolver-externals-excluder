# parcel-resolver-externals-excluder

This Plugin for parcel v2 allows you to ignore files in resolving phase using a configuration in you package.json. 

## Installation

`yarn add -D parcel-resolver-externals-excluder`

`npm install --save-dev parcel-resolver-externals-excluder`

## Usage 

- In your [.parcelrc](https://v2.parceljs.org/configuration/plugin-configuration/) configure the resolver
- NOTE: the default resolver should be in the list after this plugin, to use the default behavior for not excluded files. 

  ```json
  {
    "extends": "@parcel/config-default",
    "resolvers": ["parcel-resolver-externals-excluder", "..."]
  }
  ```

- In your [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) configure the external files to be excluded
  ```json
  {
    "externalsExcluder": [
      "your/absolute/paths", 
      "*.fileType",
      "yourFolders/**/*"
    ]
  }
  ```
