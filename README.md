# Vancouver Bus Schedule Web App

Display Vancouver bus schedule through Translink API. The live Site is [here](https://vancouver-bus-schedule.herokuapp.com/).
Translink han't added CORS support due to securiy problems. Server-side based on [this](https://github.com/yeah568/simplebus-server).
Clien-side based on ReactJS with Redux(state management)

### Installation

To run this project in your local machine

```
npm start
```

or

```
yarn
```

after intalled node_moudles

```
yarn start
```

### Expect Behavior

Display all the bus stops near my location on the map and the list. The list and the stop show the next 3 buses arrival time and destination.

### Deployment

Deploy through [Heroku](https://www.heroku.com/)

### Built With

- Map - [React-Map-Gl](https://uber.github.io/react-map-gl/#/)
- General UI Components - [Material-ui](https://material-ui.com/)
- CSS - [Styled-components](https://github.com/styled-components/styled-components)
