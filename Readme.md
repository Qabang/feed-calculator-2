# Feed Calculator

- Created 2020-02-28
  A simple application that lets you create a horse profile and helps you calculate the horse's feed need.

## Installation

1. `cp .env-example .env` - (update credentials)
2. `run npm install` in the root folder.
3. import the db-copy and name it feed_calculator.

4. `docker compose up --build` Project uses docker. run with --build flag to build the container.

Start:
`docker compose up`

Stop:
`docker compose down`

5. visit the application in [The browser](http://localhost:3000/)

### Frontend

Styling is done in SCSS and the project is using gulp for building.
Open shell in the container (docker extension-> feed-calculator-2 -> attach shell)

`gulp` - runs all tasks.

`gulp watch` - Watches scss and js files for changes

`gulp scss` - for scss changes

`gulp js` - js changes

## Authors

- **Sandra Lindström** - [Qabang](https://github.com/Qabang)

## Acknowledgments

- Calculations is based on SLU's, Swedish University of Agricultural Sciences, feeding recommendations for horses - [Report by Anna Jansson](https://www.slu.se/globalassets/ew/org/inst/huv/publikationer/utfodringsrekommendationer-for-hast_2013_rapport_289.pdf)
