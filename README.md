# Seeyond

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://dev-ng.3-form.com:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


----------------

## Technologies & Libraries

### Angular 2.x 
Javascript Framework for building dynamic web applications.

- Source: https://angular.io/
- Docs: https://angular.io/docs/ts/latest/

### Angular-cli
Command Line Interface for Angular 2

- Source: https://github.com/angular/angular-cli

### Threejs 
Javascript 3D library used to render the visualization for the user using webGL

- Source: https://github.com/mrdoob/three.js
- Docs: https://threejs.org/docs/

### Verb 
Open-source, cross-platform NURBS library for generating the tesselations

- Source: https://github.com/pboyer/verb
- Docs: http://verbnurbs.com/docs/

### Using Verb with Threejs
https://github.com/pboyer/verb/blob/master/examples/js/verbToThreeConversion.js

## Setup instructions

1. install angular-cli - `npm install -g angular-cli` (unless already installed)
2. install packages - `npm install`
3. build code - `ng build`
4. run server - `ng serve`
5. access server - `http://dev-ng.3-form.com:4200/`

In order to use the url `http://dev-ng.3-form.com:4200/` you will need to create a record in your hosts file that points to your localhost. On the mac we use an application called [Hosts](https://github.com/specialunderwear/Hosts.prefpane/downloads). My record looks like this:

```
127.0.0.1    dev-ng.3-form.com
```

We need to use this URL because of CORS with the global css file that is loaded from our Amazon S3. (http://3form.s3.amazonaws.com/assets/3form-bootstrap3-combined.min.css)
