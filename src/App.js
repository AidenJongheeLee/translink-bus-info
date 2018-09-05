import React, { Component } from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import MapContainer from './components/MapContainer';
import BusLists from './components/BusLists';
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
        <MainContainer>
          <MapContainer
            getCurrentLocation={this.getCurrentLocation}
            viewportChange={this.handleViewPortChange}
            currentLocation={currentLocation}
          />
          <BusLists />
        </MainContainer>
      </Provider>
    );
  }
}

const MainContainer = styled.div`
  display: flex;
`;

export default App;
