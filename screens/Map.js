import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

const Map = () => {

  const [selectedLocation, setSelectedLocation] = useState()

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude
    const longitude = event.nativeEvent.coordinate.longitude
    setSelectedLocation({
      latitude,
      longitude
    })
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker
        title='Picked Location'
        coordinate={selectedLocation}
      />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

export default Map;