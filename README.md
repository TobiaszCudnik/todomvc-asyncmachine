# TodoMVC on AsyncMachine

Sample TodoMVC app showing how [AsyncMachine](https://github.com/TobiaszCudnik/asyncmachine) can be used as a classic MVC controller with **React** as a view.

Based on [Redux TodoMVC](https://github.com/reduxjs/redux/tree/master/examples/todomvc), but **Redux got replaced with AsyncMachine**.

## Demo

* [Edit on Stackblitz](https://stackblitz.com/edit/asyncmachine-example-todomvc?file=src/controller.js)

## Usage

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## State Graph

![state graph](http://tobiaszcudnik.github.io/asyncmachine/images/todomvc-graph.png)

## Persistent and async storage

There's a [blockchain version](https://github.com/TobiaszCudnik/todomvc-blockstack-asyncmachine) which shows how moving to an async storage would look like from the AsyncMachine's perspective. Spoiler - it's smooth ;)
