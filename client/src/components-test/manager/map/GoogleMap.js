// src/MapContainer.js
import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';




const MapContainer = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -34.397, lng: 150.644 });
  const [response, setResponse] = useState('');
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onMapClick = (event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setMapCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    geocode({ location: event.latLng });
  };

  const geocode = (request) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;
        setResponse(JSON.stringify(results, null, 2));
        return results;
      })
      .catch((e) => {
        alert('Geocode was not successful for the following reason: ' + e);
      });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '500px', height: '500px', margin: 'auto' }}
      center={mapCenter}
      zoom={8}
      onClick={onMapClick}
    >
      {markerPosition && <Marker position={markerPosition} />}
      <div id="response-container">
        <pre id="response">{response}</pre>
      </div>
    </GoogleMap>
  );
};

export default MapContainer;
