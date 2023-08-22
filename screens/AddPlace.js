import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {

  const createPlaceHandler = async (place) => {
    await insertPlace(place)
    navigation.navigate('AllPlaces', {
      place: place
    })
  }

  return (
    <PlaceForm oncCreatePlace={createPlaceHandler} />
  );
};

export default AddPlace;