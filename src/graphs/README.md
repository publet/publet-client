# Graphs Client
Graphs is an client-side component application that consumes Publet's Graphs API. It is built using React, Redux, & ES2015. This component application should serve as a documented example for converting other parts of `publet-client` to use Redux & ES2015.

## Top-level Files
* `index.js` JS entry point for component application. It renders the `<App>` container component.
* `graphs-store.js` is the central Redux store of the application.
* `index.html` HTML wrapper for component application.
* `dummyAPI-graphs.js` A static response object taken from the Graphs API. This was used to help design the API as well as building the component app before integrating it with the API and developing the app while offline. It is useful as a schema as well as a tool when deveolping on the road.

## Folder Structure
* `/components` is a folder containing **presentation components only** Presentation components are pure functions that take props and return user interface. They contain very little to no logic other than taking props and consuming them. No component should rely on Redux and should work as long as valid props are passed to it. EXAMPLE: A navbar list item component that consumes the `onClick()` prop passed down to it.
* `/containers` is the folder for container components. Container components are what define the functionality of the application, and may be coupled to Redux. Presentation components are commonly classes, though they don't have to be. EXAMPLE: A navbar component that passes an action as an `onClick` prop to a navbar list item component
* `/reducers` contains all Redux reducers. Reducers are functions used by our store to update state without direct mutation. Right now, there's only one file here, `index.js` which houses all of the Graphs component application's reducers. Should one file be too wieldly, just split it up into multiple files for multiple reducers.

* `/actions` contains all Redux actions. Actions are dispatched within container components to the store, which then triggers appropriate reducers. Right now, there's only one file here, `index.js` which houses all of the Graphs component application's actions. Should one file be too wieldly, just split it up into multiple files for multiple actions.
