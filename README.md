# Publet Client
This repo contains the client-side applications of Publet.

## Built With

* NPM
* Gulp
* Webpack
* Babel
* Sass
* React
* Reflux
* Immutable.js

## Getting Started
1. Clone this repo
2. Make sure you have `node.js` and `gulp` installed globally
3. `npm install`
4. `npm run [component app]`
6. Open `http://localhost:1337/[component app]/#/[articleID]` in your favorite browser.

The `component app` parameter refers to the individual application you would
like to run. For example, if you wanted to run the Article Editor on an article
w/ an ID of '3003, you could execute `npm run article` and then visit
`http://localhost:1337/article-editor/#/3003`. Right now the following apps are
available:

* **Article Editor**
  - `npm run article`
  - `http://localhost:1337/article-editor/`
* **Theme Editor**
  - `npm run theme`
  - `http://localhost:1337/theme-editor/`
* **Sandbox**
  - `npm run sandbox`
  - `http://localhost:1337/sandbox/`

The `articleID` param refers to the article you would like to view. In the
future, you could skip this step. At the moment, however, you must provide a
valid `articleID` or `themeID` for the editor.

#### FAQ

* Note that due to security concerns, you may have to alias your localhost
  to `[something].staging.publet.com`. [Instructions on how to do this on StackOverflow](http://stackoverflow.com/questions/19425086/alias-hostname-for-localhost)
* If getting `401` errors on load, please visit & log in to
  `staging.publet.com`. Publet-client's auth is not in the application itself.
* If you create a new file while gulp/webpack is running, you will need to
  restart the process to have it recognize the file and recompile when you
  save changes.
* Any commit to master will automatically be deployed to staging by CircleCI.
  Check Slack's `#robots` channel after you commit & push changes to see this
  in action.

#### Available NPM Commands

`npm run article` - Runs the article editor component application.

##### `npm run theme` - Runs the theme editor component application.
##### `npm run sandbox` - Runs the sandbox component application
##### `npm run server` - Runs the build component application

## File Structure

The file structure of `publet-client` is very deliberate and we try to keep
things as organized as much as possible. Since this repository contains
multiple applications, its very important to be consistent with what gets
committed where.

#### Top level

There's a bunch of config files (`gulpfile.js`, `fabfile.py`, `server.js`, etc)
that you probably won't need to worry about unless you're working on the build
system or the deploy system.

* `bin` contains scripts needed for our build & deployment system. If you
  aren't Honza, don't touch this.
* `config` contains environment variables needed for constructing API calls.
  Depending if you're on staging or beta, you'll can refer to these variables
  via `window.config`
* `node` contains node.js scripts needed for our build & deployment system.
  If you aren't Honza, don't touch this.
* `src` contains the source code for all of `publet-client`'s component
  applications. This is where you will do the majority of your work

#### Source Files (`/src`)

This is where component application source code is. Remember: try to keep
changes to components within the component application those changes are
relevant to.

* `article-editor` is the main content editor of Publet. It takes any
  articleID, and allows users to create or modify multimedia content using
  reusable styles.
* `build`is a Node.js service designed to take article data and output a static
  HTML document as a string. You can run the service locally by `npm run
  server`.
* `common` is where neutral components & resources live. For example, this is
  where the majority of our styling comes from, along with modals, mixins,
  actions, and shared libraries.
* `public` is where scripts & resources used for output publications go. Output
  publications are pure CSS, HTML, and JS and do not contain any client-side
  framework like React. Try to keep this code as simple and clean as possible,
  preferably vanilla JS.
* `sandbox` is a marketing application designed to give visitors to Publet.com
  a chance to try out our product.
* `theme-editor` controls much of how an article appears. We use Theme Editor
  to create the reusable styles that Article Editor consumes, along with
  setting which fonts and colors are available.

#### Component Application

Each component application reuses a file structure similar to this. Notable
exceptions are `common` and `public`, which lack this structure, as they're
never used by themselves. So each component application looks like:

* `components` is the folder you will me working with the most. It contains
  folders for each component used or associated in the component application.
* `actions.js` is the file that describes Reflux actions unique to the
  component application.
* `dummyAPI.js` is the file that contains the rough specc for the response obj
  that the application should get. Use this to help design the API with backend
  developers or just to work offline.
* `index.html` is the very lightweight HTML file used to load the application.
* `index.js` is the point of entry for the JS side of the component
  application. It should instantiate the primary application component.

#### Component folder

Component applications are built with components. Each component has a folder
that contains:

* `component.js` or `component.jsx` is the file for the actual component.
* `component-store.js` is the associated Reflux store for the component.
* `component.scss` contains the styling for the component. Note that you don't
  have to `require()` this file, webpack will include it automatically.

## Contributing Guidelines

When contributing to `publet-client`, please keep a couple rules in mind:

* **Always work on a branch**: While committing to master is easy and simple,
  and this is a bit more work, please create a branch and work there. Once
  done, make a pull request, and someone will review your work before having it
  merged into master.

* **Think with Components**: Don't make gigantic components that cannot be
  reused. Instead, make a bunch of small components that can be reused & are
  composable.

* **Don't make excess Stores**: While common in many flux applications, stores
  are very limited in `publet-client`. There should be 2 stores for every
  component application - no more, no less. These stores will be at the top
  level of the application like so:
  - `component-app-store.js` will handle loading and syncing the application's data
  - `component-store.js` will handle application state.

An example of this would be Article Editor. Article Editor has two store -
`article-editor-store.js` and `article-store.js`. `article-editor-store.js`
loads data from the server into Article Editor, then listens to
`article-store.js` for any changes, then syncs those changes with the server.
Any actual state mutation goes in `article-store.js`.
