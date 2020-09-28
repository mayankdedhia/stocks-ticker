Code to showcase websockets implementation with React and TS

The code fetches stock information over websocket and displays it in table.

A graph view is available on click of any of the stock row. This graph can be zoomed and panned.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/stocks-ticker](http://localhost:3000/stocks-ticker) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run deploy`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
The code is then deployed to the homepage url mentioned in the package.json.

## Known Issues

Currently the code is marked to be deployed on [https://mayankdedhia.github.io/stocks-ticker/](https://mayankdedhia.github.io/stocks-ticker/) which is over secure http protocol and the websocket url being used is [ws://stocks.mnet.website/](ws://stocks.mnet.website/) over unsecured websocket protocol. This is not allowed by the browsers if not running from localhost.
Ideal solution is to have secure websocket protocol and the not advisable easy solution is to host the code over unsecure http.
If both the above options are not feasible then a proxy server can be used which will read values from unsecure websocket and serve it over secure websocket.

As a workaround currently hosted at [http://s3.ap-south-1.amazonaws.com/stocks-ticker-mayankdedhia/index.html](http://s3.ap-south-1.amazonaws.com/stocks-ticker-mayankdedhia/index.html)
