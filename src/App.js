import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import MapContainer from './components/MapContainer';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  state = {
    currentLocation: {
      latitude: 49.2878519,
      longitude: -123.124349
    }
  };

  componentDidMount() {
    this.getCurrentLocation();
  }

  handleViewPortChange = viewport => {
    this.setState({ currentLocation: viewport });
  };

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        currentLocation: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
      });
    });
  };

  render() {
    const { currentLocation } = this.state;
    return (
      <Provider store={store}>
        <MapContainer
          getCurrentLocation={this.getCurrentLocation}
          viewportChange={this.handleViewPortChange}
          currentLocation={currentLocation}
        />
      </Provider>
    );
  }
}

export default App;
