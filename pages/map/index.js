import React, { memo } from "react";
import Head from "next/head";
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapSideBar from "@components/map";
import MarkerCustom from "@components/map/Marker";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWFwYm94eXkiLCJhIjoiY2ttd3JzZHVyMGh0NTJubjgyNXFnMzBhZCJ9.T7pjJH532gif18aGfzVsGA",
});

const MapBox = () => {
  return (
    <>
      <Head>
        <title>Cambodia Map</title>
      </Head>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={[104.9195063, 11.5664902]}
      >
        <MarkerCustom />
        <MapSideBar />
      </Map>
    </>
  );
};

export default memo(MapBox);
