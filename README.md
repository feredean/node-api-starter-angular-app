**While the project can still be used for reference, the reality is that it has aged and no longer reflects best practices. To make this clear, the project is now archived.**

# Node API Starter's Frontend (Archived)

[![CircleCI](https://circleci.com/gh/feredean/node-api-starter-angular-app.svg?style=shield)](https://circleci.com/gh/feredean/node-api-starter-angular-app)

**Live App Demo**: [https://node-api-starter-angular-app.experiments.explabs.io](https://node-api-starter-angular-app.experiments.explabs.io)  
**Live API**: [https://node-api-starter.experiments.explabs.io/v1/hello](https://node-api-starter.experiments.explabs.io/v1/hello)  

An example application that uses node API starter.

![VSCode relative imports](https://user-images.githubusercontent.com/3910622/66318339-cc2ae080-e923-11e9-890e-a40be6a45935.png)

This project has several purposes:

- Serve as an example on how to consume the node API starter
- Provide a boilerplate for Angular applications that are built around a dashboard
- Serve as a reference for various implementations and concepts from project structure to CD with CircleCI

You can find the node API starter source code here [https://github.com/feredean/node-api-starter](https://github.com/feredean/node-api-starter)

# Table of contents

- [Requirements](#requirements)
  - [Quick start](#quick-start)
  - [Fancy start](#fancy-start)
- [Getting started](#getting-started)
- [Deployment](#deployment)
  - [Prerequisites](#prerequisites)
  - [Deploying to kubernetes](#deploying-to-kubernetes)
  - [CircleCI](#circleci)
- [Project Structure](#project-structure)
- [Build scripts](#build-scripts)
- [Testing](#testing)
  - [Running tests](#running-tests)
  - [Linting](#linting)
  - [VSCode Extensions](#vscode-extensions)
- [Dependencies](#dependencies)
  - [`production`](#production)
  - [`development`](#development)
- [License](#license)

# Requirements

There are two ways to go about handling requirements. You can either follow the quick start path where you dump all the dependencies in your system or you can go down the fancy setup that will give you more flexibility in the future by using nvm.

## Quick start

- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)

## Fancy start

- Install [Node Version Manager](https://github.com/nvm-sh/nvm#installation-and-update)
- Configure nvm [Shell Integration](https://github.com/nvm-sh/nvm#deeper-shell-integration) (highly recommend setting up zsh together with [oh my zsh](https://github.com/robbyrussell/oh-my-zsh)). Once you set it up it will automatically change the node version if the project has a `.nvmrc` file.

# Getting started

Set up the [node API starter](https://github.com/feredean/node-api-starter#requirements)

```shell
# Get the latest snapshot
git clone --depth=1 https://github.com/feredean/node-api-starter-angular-app.git <project_name>

# Change directory
cd <project_name>

# Install dependencies
npm install

# Run (development mode) the API on port 9100
npm run watch
```

Navigate to [http://localhost:4200](http://localhost:4200) and you now have access to your APP

# Deployment

The example in this project is built around the existence of a kubernetes cluster. You can easily change to your infrastructure of choice by changing the deploy step in `.circleci/config.yml` to pull the docker image wherever you need it.

```yaml
  # pull the image from docker hub and deploy it to the k8s cluster
  deploy:
    docker:
      - image: feredean/circleci-kops:0.1.0
    environment:
      IMAGE_NAME: feredean/node-api-starter-angular-app
      KOPS_STATE_STORE: s3://k8s-explabs-io-state-store
    steps:
      - run:
          name: Deploy to k8s cluster
          command: |
            # Ensure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set in the project's env vars
            kops export kubecfg --name k8s.explabs.io
            kubectl set image deploy/node-api-starter-angular-app node-api-starter-angular-app=$IMAGE_NAME:$CIRCLE_SHA1
```

## Prerequisites

### Kubernetes

Depending on your cloud provider of choice you can fairly quickly set up a managed, production-ready environment for deploying containerized applications.

- Google's [GKE](https://cloud.google.com/kubernetes-engine/)
- Amazon's [EKS](https://aws.amazon.com/eks/)
- Microsoft's [AKS](https://azure.microsoft.com/en-in/services/kubernetes-service/)

This project is deployed on a cluster set up with [kops](https://github.com/kubernetes/kops) on [aws spot instances](https://aws.amazon.com/ec2/spot/). If there is interest I plan on going more in depth on this subject and provide a walk-through.

## Deploying to Kubernetes

You need to create the kubernetes deployment and service. To do this simply run the following:

```zsh
kubectl create -f .kubernetes/deployment.yaml
```

If somehow a deadly bug has managed to make its way past the test suite and got deployed to production where it's wreaking havoc you need to run following command:

```zsh
kubectl rollout undo deployment <your deployment name>
```

This will instantly roll back the deployment to the previous one.

## CircleCI

To integrate with CircleCI:

1. Go to [CircleCI](https://circleci.com/) and create an account
1. Link your project
1. Add the needed environment variables to run the test

    ```zsh
    # Used to connect to the kubernetes cluster
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY

    # Used for publishing the image
    DOCKERHUB_PASS
    DOCKERHUB_USERNAME
    ```

1. Make master branch a protected branch require `ci/circleci: build` check before merging from feature branches. Once a PR is merged into master CircleCI will automatically build and deploy the new version of the APP.

# Project Structure

| Name | Description |
| ------------------------ | -----------------------------------------------------------------------------------------------------------|
| **.circleci**            | Contains CircleCI settings for continuous deployment                                                       |
| **.kubernetes**          | Contains kubernetes configuration for running the app on a cluster (auto-scaling included)                 |
| **.vscode**              | Contains VS Code specific settings                                                                         |
| **dist**                 | Contains the code you ship                                                                                 |
| **node_modules**         | Contains all your npm dependencies                                                                         |
| **src/app**              | Contains the application code                                                                              |
| **src/app/core**         | The CoreModule. Loaded once in AppModule used to instantiate the app and load core functionality           |
| **src/app/shared**       | The SharedModule. Exports modules, directives and components and is used by multiple feature modules       |
| **src/environments**     | Contains environment specific settings used by angular to build the app                                    |
| .editorconfig            | Maintain coding styles consistent across various editors                                                   |
| .nvmrc                   | A file containing the node version used in the project automatically loaded by nvm                         |
| angular.json             | Angular configuration                                                                                      |
| browserslist             | This file is used by the build system to adjust CSS and JS output to support the specified browsers        |
| Dockerfile               | Used to build the docker image in the `dockerize` job in `.circleci/config.yml`                            |
| karma.conf.js            | Used to configure karma test runner                                                                        |
| package.json             | File that contains npm dependencies as well as build scripts                                               |
| tsconfig.app.json        | Options used when working with code in the `app` folder                                                    |
| tsconfig.json            | Base options that different config files will import                                                       |
| tsconfig.spec.json       | Options used for the tests                                                                                 |
| tslint.json              | TSLint options - on course to deprecation https://github.com/palantir/tslint#tslint                        |

# Build scripts

[npm scripts](https://docs.npmjs.com/misc/scripts) can be found in `package.json` in the `scripts` section. They can call each other which means it's very easy to compose complex builds out of simple individual build scripts.

| Npm Script | Description |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `start`                      | Runs the application. Same as `watch`                                                                              |
| `build`                      | Builds app for production                                                                                          |
| `watch`                      | Runs the application. Use this for development                                                                     |
| `test`                       | Runs tests using karma test runner verbosely and generates a coverage report                                       |
| `watch-test`                 | Runs tests in watch mode                                                                                           |
| `lint`                       | Runs TSLint on project files                                                                                       |
| `e2e`                        | Runs e2e tests                                                                                                     |
| `check-deps` <img width=70/> | Audits and upgrades (inside package.json run npm install to apply) dependencies to their latest stable version     |

# Testing

While Karma is the default test runner for Angular, it is possible to configure the project to use another runner like [jest](https://github.com/thymikee/jest-preset-angular)

## Running tests

To run the tests simply use `npm test`. If you want to refresh the tests on save use `npm run watch-test`.

## Linting

This year [Palantir has announced](https://medium.com/palantir/tslint-in-2019-1a144c2317a9) the deprecation of TSLint.

> In order to avoid bifurcating the linting tool space for TypeScript, we therefore plan to deprecate TSLint and focus our efforts instead on improving ESLint’s TypeScript support.

Angular projects are still using `TSLint`.

## VSCode Extensions

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [SCSS Formatter](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

# Dependencies

## `production`

| Package                             | Description                                                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| @angular/animations                 | Module used for animation                                                                                                       |
| @angular/cdk                        | Angular Material component dev kit a set of tools that implement common interaction patterns                                    |
| @angular/common                     | Implements basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on                                    |
| @angular/compiler                   | Angular compiler library                                                                                                        |
| @angular/core                       | Implements Angular's core functionality, low-level services, and utilities                                                      |
| @angular/flex-layout                | Angular Flex Layout provides a sophisticated layout API using Flexbox CSS + mediaQuery                                          |
| @angular/forms                      | Implements a set of directives and providers to communicate with native DOM elements when building forms to capture user input  |
| @angular/material                   | Material Design components for Angular                                                                                          |
| @angular/platform-browser           | Supports execution of Angular apps on different supported browsers                                                              |
| @angular/platform-browser-dynamic   | Library for using Angular in a web browser with JIT compilation                                                                 |
| @angular/router                     | Implements the Angular Router service , which enables navigation from one view to the next as users perform application tasks   |
| @auth0/angular-jwt                  | This library provides an HttpInterceptor which automatically attaches a JSON Web Token to HttpClient requests                   |
| lodash                              | General utility library                                                                                                         |
| tslib                               | Runtime library for TypeScript helper functions                                                                                 |
| zone.js                             | Implements Zones for JavaScript                                                                                                 |
<!-- https://bundlephobia.com/ -->

## `development`

| Package                            | Description                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------|
| @angular-devkit/build-angular      | Angular Webpack Build Facade                                                           |
| @angular/cli                       | Angular command line interface `ng`                                                    |
| @angular/compiler-cli              | The compiler CLI for Node.js                                                           |
| @angular/language-service          | Angular Language Service                                                               |
| @types                             | Dependencies in this folder are `.d.ts` files used to provide types                    |
| codelyzer                          | Linting for Angular applications, following the angular.io/styleguide                  |
| jasmine-core                       | BDD testing framework for JavaScript                                                   |
| jasmine-spec-reporter              | Real time console spec reporter for jasmine testing framework.                         |
| karma                              | Test runner                                                                            |
| karma-chrome-launcher              | Karma plugin. Launcher for Chrome                                                      |
| karma-coverage-istanbul-reporter   | Karma coverage reporter - uses istanbul                                                |
| karma-jasmine                      | Karma plugin, adapter jasmine                                                          |
| karma-jasmine-html-reporter        | Karma plugin, dynamically displays test results at debug.html                          |
| npm-check-updates                  | Upgrades package.json dependencies to the latest versions, ignoring specified version  |
| protractor                         | Webdriver E2E test wrapper for Angular                                                 |
| ts-node                            | Typescript execution environment and REPL for node.js with source map support          |
| tslint                             | Linter for Typescript                                                                  |
| typescript                         | JavaScript compiler/type checker that boosts JavaScript productivity                   |

If you're the type of person that likes to live life on the bleeding edge feel free to use `npm run check-deps`. Just remember that the typescript version needs to be compatible with angular.

# License

The MIT License (MIT)

Copyright (c) 2019 Tiberiu Feredean

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
