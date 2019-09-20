/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
 
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends Component {


  state = {
    initialPosition: {
        latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
    },
    markerPosition:{
      latitude: 0,
      longitude: 0
    }
  }

  watchID: ?number = null

  componentDidMount() {
   
    Geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({
        initialPosition: initialRegion,
        markerPosition: initialRegion
      })
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 })

    this.watchID = Geolocation.watchPosition((position ) => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({
        initialPosition: lastRegion,
        markerPosition: lastRegion
      })
    })

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }



  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Maps</Text>
        </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={this.state.initialPosition}
        // region={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.015,
        //   longitudeDelta: 0.0121,
        // }}
      >
        <MapView.Marker 
        coordinate={this.state.markerPosition}>
          <View style={styles.radius}>
            <View style={styles.marker}>

            </View>
          </View>
        </MapView.Marker>
      </MapView>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: { 
    flex: 1
   },
  map: { 
    flex: 1
   }
});

export default App;
