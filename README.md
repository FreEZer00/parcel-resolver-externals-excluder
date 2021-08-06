# parcel-resolver-externals-excluder

An attempt to actually work with parcelv2

## Installation

`yarn add -D parcel-resolver-externals-excluder`

`npm install --save-dev parcel-resolver-externals-excluder`

## Usage 

- In your [.parcelrc](https://v2.parceljs.org/configuration/plugin-configuration/) configure the resolver

  ```json
  {
  "extends": "@parcel/config-default",
  "resolvers": ["...", "parcel-resolver-externals-excluder"]
  }
  ```

- In your [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) configure the external files to be excluded
  ```json
  {
  "externalsExcluder": ["your", "paths"]
  }
  ```
