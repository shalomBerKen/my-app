import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button
} from '@chakra-ui/react';

const MapContainer = ({ formData, handleChange }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.99, lng: 34.89 });
  const [response, setResponse] = useState('');

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    
  });

  const onMapClick = event => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setMapCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    geocode({ location: event.latLng });
  };


  const handleSearch = () => {
    // geocode({ address: inputValue });
    geocode({ address: formData.address });
  };

  const geocode = request => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder
      .geocode(request)
      .then(result => {
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
      .catch(e => {
        alert('Geocode was not successful for the following reason: ' + e);
      });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ margin: 'auto', marginBottom: '16px' }}>
      <FormControl w={'xl'} m={'auto'}>
        <FormLabel isRequired={false}>Address (Optional)</FormLabel>
        <Input
          isRequired={false}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <FormHelperText>Provide an address if needed.</FormHelperText>
      </FormControl>
      <div style={{ marginTop: '16px' , marginBottom: '16px'}}>
        {/* <input
          type="text"
          placeholder="Enter a location"
          value={inputValue}
          onChange={handleInputChange}
        /> */}
          <Button colorScheme='teal' size='xs'onClick={handleSearch}>
          Search
          </Button>
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
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
    </div>
  );
};

export default MapContainer;
