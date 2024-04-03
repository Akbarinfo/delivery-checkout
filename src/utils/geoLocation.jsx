export const geoLocation = (setUserLocation) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  } else {
    console.log("Geolocation is not available.");
    setUserLocation([42.472089771357304, 59.60270319554459]);
  }
};
