import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { getMapPreview } from "../../util/location";

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";

const LocationPicker = () => {

  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused() // checks if the screen is visible

  const [pickedLocation, setPickedLocation] = useState()

  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()


  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = { lat: route.params.pickedLat, lng: route.params.pickedLng }
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  const verifyPermissions = async () => {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use the geolocation'
      )
      return false
    }

    return true
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map')
  }

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation) {
    locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>

      <View style={styles.actions}>
        <OutlinedButton icon={'location'} onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon={'map'} onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    with: '100%',
    height: 200,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
})

export default LocationPicker;