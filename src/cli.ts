#!/usr/bin/env node

import {create} from 'create-create-app';
import path, {resolve} from 'path';
import * as fs from "fs";

const templateRoot = resolve(__dirname, '..', 'templates');

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

create('create-ts-app', {
  templateRoot,
  extra: {
    github: {
      type: "input",
      describe: "github username",
      prompt: "if-empty"
    }
  },
  after: ({answers, packageDir}) => {
    if (!answers.github) {
      let packageJsonFile = path.join(packageDir, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonFile).toString());
      delete packageJson.repository;
      delete packageJson.funding;
      delete packageJson.bugs;
      delete packageJson.homepage
      fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, '  '));
    }
  }
});
