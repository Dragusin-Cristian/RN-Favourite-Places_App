import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
  const { placeId } = route.params
  const [fetchedPlace, setFetchedPlace] = useState()

  useEffect(() => {
    (async () => {
      const place = await fetchPlaceDetails(placeId)
      setFetchedPlace(place)
      navigation.setOptions({
        title: place.title
      })
    })()
  }, [placeId])

  const showOnMapHandler = () => {

  }

  if(!fetchedPlace){
    return (
      <View style={styles.fallback}>
        <Text>
          Loading place data...
        </Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon={'map'} onPress={showOnMapHandler}>View on Map</OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default PlaceDetails;