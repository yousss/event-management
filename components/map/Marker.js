import React from "react";
import RoomIcon from "@material-ui/icons/Room";
import { Marker } from "react-mapbox-gl";

const MarkerCustom = () => {
  return (
    <Marker coordinates={[104.9195063, 11.5664902]} anchor="bottom">
      <RoomIcon style={{ fontSize: "2rem", fill: "red" }} />
    </Marker>
  );
};

export default MarkerCustom;
