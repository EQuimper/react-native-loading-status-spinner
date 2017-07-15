import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import LoadingStatusSpinner from 'react-native-loading-status-spinner';

export default class App extends React.Component {
  state = {
    people: {},
    loading: true,
  };

  componentDidMount() {
    this._fetchLuke();
  }

  _fetchLuke = async () => {
    const res = await fetch('http://swapi.co/api/people/1');
    const resJson = await res.json();
    this.setState({ people: resJson, loading: false });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LoadingStatusSpinner barStyle="light-content" />
        <Text style={styles.text}>
          {this.state.people.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
