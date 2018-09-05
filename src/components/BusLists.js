import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';

import { stopEstimate, selectStop } from '../actions';

class BusLists extends Component {
  state = {
    selected: null
  };

  handleLoadBusInfo = stop => {
    const { stopEstimate } = this.props;
    stopEstimate(stop.StopNo);
  };

  handleOpenPanel = stop => (event, expanded) => {
    const { selectStop } = this.props;
    this.setState({
      selected: expanded ? stop.StopNo : null
    });
    if (expanded) {
      selectStop(stop);
    } else {
      selectStop(null);
    }
  };

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
    const { stops, busInfo, loading } = this.props;
    const { selected } = this.state;

    return (
      <MainContainer>
        {!loading ? (
          <div>
            {stops.filter(item => item.Routes).map(stop => {
              return (
                <ExpansionPanel
                  onChange={this.handleOpenPanel(stop)}
                  expanded={selected === stop.StopNo}
                  key={stop.StopNo}
                  onClick={() => {
                    this.handleLoadBusInfo(stop);
                  }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p>{stop.Routes}</p>
                  </ExpansionPanelSummary>
                  {busInfo &&
                    busInfo.Schedules && (
                      <ExpansionPanelDetails>
                        <div>
                          <RoutesNum>{busInfo.RouteNo}</RoutesNum>
                          <ColumnContainer>
                            <ColumnHeader>Destination</ColumnHeader>
                            <ColumnHeader last>Waiting time</ColumnHeader>
                          </ColumnContainer>

                          {busInfo.Schedules.map((schedule, index) => {
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
                        </div>
                      </ExpansionPanelDetails>
                    )}
                </ExpansionPanel>
              );
            })}
          </div>
        ) : (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        )}
      </MainContainer>
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

const ColumnContainer = styled.div`
  display: flex;
`;
const ColumnHeader = styled.p`
  margin-left: ${props => props.last && '32pt'};
  font-weight: 400;
`;

const RoutesNum = styled.p`
  font-weight: bold;
`;

const MainContainer = styled.div`
  max-height: 800px;
  overflow-y: scroll;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
`;

const Destination = styled.p``;

const Time = styled.p`
  margin-left: 32pt;
`;

const mapStateToProps = state => {
  const stops = _.map(state.stops, val => {
    return { ...val };
  });

  return { stops, busInfo: state.busInfo, loading: state.loading.loading };
};

export default connect(
  mapStateToProps,
  { stopEstimate, selectStop }
)(BusLists);
