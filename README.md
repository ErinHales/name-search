This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Project Objective
Your task is to implement an autocomplete feature, using React.

You are given an API that has a function searchUsersByName, which can be used to search for users by name.

You need to implement a React component Autocomplete using the provided API function. When a user writes some text in the input, a list of user's names starting with text should populate below the input.

Feel free to provide your custom renderer for the search results.

## Project Description
The autocomplete functionality has been completely refactored.  Instead of making an API call every time the user types into the input, we now call the API only once when the page is loaded.  Upon retrieval, the list is passed into the `Names.init` method which recursively builds a trie graph out of all the names.  This can handle several thousand names in less than a second!

The graph is built using `Letter` nodes which keep track of:
  * `value` (the letter itself)
  * `path` (the path to the letter, i.e. 'Frank Lo...')
  * and `extensions` (an array of `Letter`s, which lead to potential names)

The search functionality is provided through the `Names.search` method.  Finding whether a path existed within the tree was fairly straightforward, but populating a list of all the potential matches proved to be more difficult.  First I had to determine if there **was** a path.  If there was, I had to explore all paths from that point down the tree.  I used the recursive function `populateMatches` to acheieve this. 

Here's how `populateMatches` works. If I found a full name, it was added to an array which was either passed back into `populateMatches` or returned at the end of the function.  Also, just because I found a full name, didn't mean that branch was complete.  Say we had two names: "Susan Hale" and "Susan Hales".  If I returned once I found "Susan Hale" I would not be able to reach "Susan Hales".  So, full names were pushed onto the array as well as names returned by recursive called.  I knew I was finished with a branch when `Letter.isFullName` returned true and the length of `this.extensions` was 1.  In the end, this gave me a full list of possible names basically instantaneously.

NOTE:
Although I liked logging every time a name was added to the trie graph, I found that it really slowed things down.  For fun, if you want to uncomment `line 18` in `Utils/index.js`, you can see all of the names pouring in!

This also includes a cool loading component... but I think that the trie graph populates so fast that it doesn't cause the component to rerender.  I came to this conclusion because if I set a timeout and wait to return the data, the loading component renders correctly.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
