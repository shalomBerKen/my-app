import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapContainer = ({ formData, setFormData }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.99, lng: 34.89 });
  const [response, setResponse] = useState('');

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onMapClick = (event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setMapCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    geocode({ location: event.latLng });
  };

  const handleSearch = useCallback(() => {
    geocode({ address: formData.address });
  }, [formData.address]);
  useEffect(() => {
    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        handleSearch,
      }));
    }
  }, [setFormData, handleSearch]);

  const geocode = (request) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        if (results.length > 0) {
          setMapCenter(results[0].geometry.location);
          setMarkerPosition(results[0].geometry.location);
          setResponse(JSON.stringify(result, null, 2));
        } else {
          alert('No results found');
        }

        return results;
      })
      .catch((e) => {
        alert('Geocode was not successful for the following reason: ' + e);
      });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ margin: 'auto', marginBottom: '16px', alignContent: 'center', display: 'flex', flexDirection: 'column'}}>
      <GoogleMap
        mapContainerStyle={{ width: '500px', height: '500px', margin: 'auto' }}
        center={mapCenter}
        zoom={10}
        onClick={onMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
        <div id="response-container">
          <pre id="response">{response}</pre>
        </div>
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
