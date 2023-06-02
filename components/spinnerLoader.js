
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';


const SpinnerLoader = () => {
  const spinner = useSelector(x => x.Spinner)
  if (!spinner.visible) return null;
  return (
    <Spinner
      visible
      textContent={spinner?.text || ''}
      textStyle={styles.spinnerTextStyle}
    />
  );
}

export default React.memo(SpinnerLoader)

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});