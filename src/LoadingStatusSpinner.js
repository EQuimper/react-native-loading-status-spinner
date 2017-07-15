// @flow

import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';

import subscribeRequestStatus from './fetch';

type State = {
  requestInProgress: boolean,
};

type Props = {
  barStyle?: 'dark-content' | 'light-content' | 'default',
  hidden?: boolean,
  animated?: boolean,
  translucent?: boolean,
  backgroundColor?: string,
};

export default class LoadingStatusSpinner extends Component {
  state: State = { requestInProgress: false };

  props: Props;

  componentDidMount() {
    subscribeRequestStatus(this.handleRequestStatusChange);
  }

  handleRequestStatusChange = (requestInProgress: boolean) => {
    this.setState({ requestInProgress });
  };

  render() {
    if (Platform.OS === 'ios') {
      return (
        <StatusBar
          networkActivityIndicatorVisible={this.state.requestInProgress}
          {...this.props}
        />
      );
    }
    return <StatusBar {...this.props} />;
  }
}
