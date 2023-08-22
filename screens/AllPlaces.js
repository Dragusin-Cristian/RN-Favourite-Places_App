import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";

const AllPlaces = ({ route }) => {

  const isFocused = useIsFocused()

  const [loadedPlaces, setLoadedPlaces] = useState([])

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces(oldState => [...oldState, route.params.place])
    }
  }, [isFocused, route])

  return (
    <PlacesList places={loadedPlaces} />
  );
};

export default AllPlaces;