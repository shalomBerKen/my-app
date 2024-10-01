import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapContainer = ({ address , onAddressChange}) => { 
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.99, lng: 34.89 });
  const [response, setResponse] = useState('');

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded && address) {
      geocode({ address });
    }
  }, [isLoaded, address]);

  const geocode = (request) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;

        if (results.length > 0) {
          const location = results[0].geometry.location;
          setMapCenter(location);
          setMarkerPosition(location);
          setResponse(JSON.stringify(result, null, 2));
          if (onAddressChange) {
            onAddressChange(results[0].formatted_address);
          }
        } else {
          alert('No results found');
        }

        return results;
      })
      .catch((e) => {
        alert('Geocode was not successful for the following reason: ' + e);
      });
  };
  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();
    setMarkerPosition({ lat: clickedLat, lng: clickedLng });
    setMapCenter({ lat: clickedLat, lng: clickedLng });

    // Reverse geocoding
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: clickedLat, lng: clickedLng } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          if (onAddressChange) {
            onAddressChange(results[0].formatted_address);
          }
        }
      }
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
