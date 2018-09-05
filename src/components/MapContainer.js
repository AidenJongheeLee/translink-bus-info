import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';

import Place from '@material-ui/icons/Place';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import MyLocation from '@material-ui/icons/MyLocation';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

import { stopsFetch, stopEstimate } from '../actions';

class MapContainer extends Component {
  state = {
    anchorEl: null
  };

  componentDidMount() {
    const { latitude, longitude } = this.props.currentLocation;
    const { stopsFetch } = this.props;
    stopsFetch(latitude, longitude);
  }

  componentDidUpdate(prevProps) {
    const { latitude, longitude } = this.props.currentLocation;
    if (prevProps.currentLocation !== this.props.currentLocation) {
      const { stopsFetch } = this.props;
      stopsFetch(latitude, longitude);
    }
  }

  formatTime = time => {
    let newHour;
    const hour = parseInt(time.split(' ')[0].split(':')[0]);
    const minute = parseInt(time.split(' ')[0].split(':')[1]);
    const regex = /am/gm;
    const morning = regex.test(time.split(' ')[0]);
    if (!morning) {
      newHour = (hour + 12).toString() + ':' + minute.toString() + ' ' + time.split(' ')[1];
    } else {
      newHour = hour.toString() + ':' + minute.toString() + ' ' + time.split(' ')[1];
    }

    return newHour;
  };

  render() {
    const {
      viewportChange,
      currentLocation,
      stops,
      stopEstimate,
      busInfo,
      classes,
      getCurrentLocation,
      loading,
      selectedStop
    } = this.props;
    const { latitude, longitude } = currentLocation;
    const { anchorEl } = this.state;

    return (
      <div id="my-map">
        <ReactMapGL
          mapStyle={'mapbox://styles/mapbox/streets-v9'}
          scrollZoom
          width={1000}
          height={800}
          latitude={latitude}
          longitude={longitude}
          zoom={15}
          mapboxApiAccessToken="pk.eyJ1IjoiYWlkZW4xNSIsImEiOiJjamxsYXBxMXkwMmtlM3ZxbWU4cGIwaGxxIn0.B-nUUHbg0KCitSFJkaLMwg"
          onViewportChange={viewport => viewportChange(viewport)}>
          <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
            <MyLocation nativeColor="#4d87ec" />
          </Marker>

          {loading ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : (
            <div>
              {stops.filter(item => item.Routes).map(stop => {
                return (
                  <Marker key={stop.StopNo} latitude={stop.Latitude} longitude={stop.Longitude}>
                    <Place
                      nativeColor={
                        selectedStop && selectedStop.StopNo === stop.StopNo ? '#d95054' : '#4fb1c4'
                      }
                      className={classes.markerIcon}
                      onClick={e => {
                        this.setState({ anchorEl: e.currentTarget });
                        stopEstimate(stop.StopNo);
                      }}
                    />
                  </Marker>
                );
              })}
            </div>
          )}

          {busInfo &&
            !busInfo.error &&
            anchorEl && (
              <Popover
                onClose={() => this.setState({ anchorEl: null })}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}>
                <Paper>
                  <DialogTitle className={classes.dialogTitle}>{busInfo.RouteNo}</DialogTitle>
                  <DialogContent>
                    <ColumnContainer>
                      <ColumnHeader>Destination</ColumnHeader>
                      <ColumnHeader last>Waiting time</ColumnHeader>
                    </ColumnContainer>

                    {busInfo.Schedules &&
                      busInfo.Schedules.map((schedule, index) => {
                        const formatTime = this.formatTime(schedule.ExpectedLeaveTime);
                        return (
                          <ContentContainer key={`info-${index}`}>
                            <Destination>{_.capitalize(schedule.Destination)}</Destination>
                            <Time>
                              {moment(formatTime)
                                .local()
                                .fromNow()}
                            </Time>
                          </ContentContainer>
                        );
                      })}
                  </DialogContent>
                </Paper>
              </Popover>
            )}
          {busInfo.error && (
            <Snackbar
              open={busInfo.error}
              autoHideDuration={2000}
              message={<span>There has been an error</span>}
            />
          )}

          <ButtonContainer>
            <IconButton
              className={classes.button}
              onClick={() => {
                getCurrentLocation();
              }}>
              <MyLocation />
            </IconButton>
          </ButtonContainer>
        </ReactMapGL>
      </div>
    );
  }
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 28pt;
  right: 4pt;
`;

const ColumnContainer = styled.div`
  display: flex;
`;
const ColumnHeader = styled.p`
  margin-left: ${props => props.last && '16pt'};
  font-weight: 400;
`;

const ContentContainer = styled.div`
  display: flex;
`;

const Destination = styled.p``;

const Time = styled.p`
  margin-left: 16pt;
`;

const styles = {
  markerIcon: {
    cursor: 'pointer'
  },
  dialogTitle: {
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#ffffff'
  }
};

const mapStateToProps = state => {
  const stops = _.map(state.stops, val => {
    return { ...val };
  });
  return {
    stops,
    busInfo: state.busInfo,
    loading: state.loading.loading,
    selectedStop: state.seelctedStop.selectedStop
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { stopsFetch, stopEstimate }
  )(MapContainer)
);
