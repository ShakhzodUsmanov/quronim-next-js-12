import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../context/store-context";

const useTrackLocation = () => {
  const { dispatch } = useContext(StoreContext);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [isFindingLocation, setIsFindinLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMsg("");
    setIsFindinLocation(false);
  };

  const error = () => {
    setIsFindinLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    setIsFindinLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindinLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
      setIsFindinLocation(false);
    }
  };

  return {
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};
export default useTrackLocation;
