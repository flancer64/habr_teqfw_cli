# habr_teqfw_cli
Demo package for the Habr [publication](https://habr.com/ru/post/567252/).

This is sample of the Tequila Framework based application with CLI command. This framework is written in ES2015+ and uses namespaces and dependency injection to load sources.

## Installation
```shell
$ npm install
```

## Run commands

This plugin adds one command - `demo-plugins-list`:
```shell
$ node ./bin/tequila.mjs help demo-plugins-list
Usage: tequila demo-plugins-list [options]

Get list of teq-plugins.

Options:
  -s, --short  get plugins names and namespaces
  -f, --full   get plugins names, namespaces and path to the sources directory
  -h, --help   display help for command
```


## Implementation

1. [./bin/tequila.mjs](./bin/tequila.mjs): bootstrap script;
1. [./src/Back/Cli/PluginsList.mjs](./src/Back/Cli/PluginsList.mjs): es6-module with command factory;
1. [./teqfw.json](./teqfw.json): teq-plugin descriptor with command identifier; 
