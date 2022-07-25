# Nexmock

Nexmock provides a Heroku web server to receive your SMS messages, which allows us to mock out the sending of an SMS in order to avoid unnecessary fees, such as in a staging environment.

## Save money and make your CTO happy

<img width="1674" alt="Screenshot 2019-06-25 at 23 19 48" src="https://user-images.githubusercontent.com/1935746/60137745-daebee00-979f-11e9-8cf2-3b06294b779d.png">

## Documentation

# Setting up

All that's needed to get set up is to install the dependencies:

`npm install`

# How to use

To start development on Nexmock, simply run `npm run start:dev`. This will launch a `nodemon` process.

By default, Nexmock will run on port `3000`. However, you can override this by specifying the `PORT` environment variable, like so: `PORT=5151 npm run start:dev`.

Once it's running, you can access the webview at `http://localhost:<PORT>/list`.

# Contributing

- Create a new branch from the `master` branch
- Create a PR with your desired changes
