import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = () => {

  const isFocused = useIsFocused()

  const [loadedPlaces, setLoadedPlaces] = useState([])

  useEffect(() => {
    (async () => {
      if (isFocused) {
        const places = await fetchPlaces()
        setLoadedPlaces(places)
      }
    })()
  }, [isFocused])


  return (
    <PlacesList places={loadedPlaces} />
  );
};

export default AllPlaces;