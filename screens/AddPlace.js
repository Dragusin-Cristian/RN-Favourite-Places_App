import PlaceForm from "../components/places/PlaceForm";

const AddPlace = ({navigation}) => {

  const createPlaceHandler = (place) => {
    navigation.navigate('AllPlaces', {
      place: place
    })
  }

  return (
    <PlaceForm oncCreatePlace={createPlaceHandler} />
  );
};

export default AddPlace;