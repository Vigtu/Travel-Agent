import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  destinations: { name: string }[];
  onMapLoaded?: () => void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ destinations, onMapLoaded }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const saveMapState = () => {
    if (mapInstance.current) {
      const center = mapInstance.current.getCenter();
      const state = {
        center: [center.lng, center.lat],
        zoom: mapInstance.current.getZoom(),
        pitch: mapInstance.current.getPitch(),
        bearing: mapInstance.current.getBearing(),
      };
      localStorage.setItem('mapboxMapState', JSON.stringify(state));
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!mapContainer.current) return;

    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('Mapbox access token is not set');
      setMapError('Mapbox access token is missing. Please check your environment configuration.');
      return;
    }

    mapboxgl.accessToken = accessToken;
    
    const initializeMap = async () => {
      try {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/standard',
          center: [0, 0],
          zoom: 1,
          pitch: 0,
          bearing: 0,
          projection: 'globe'
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('style.load', () => {
          map.setFog({
            color: 'rgb(186, 210, 235)',
            'high-color': 'rgb(36, 92, 223)',
            'horizon-blend': 0.02,
            'space-color': 'rgb(11, 11, 25)',
            'star-intensity': 0.6
          });

          map.setConfigProperty('basemap', 'lightPreset', 'dusk');
          map.setConfigProperty('basemap', 'show3DObjects', true);

          mapInstance.current = map;
          onMapLoaded?.();
          updateMarkers();
        });

        map.on('moveend', saveMapState);

      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Unable to load map. Please check your internet connection and try again.');
      }
    };

    initializeMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.off('moveend', saveMapState);
        mapInstance.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      updateMarkers();
    }
  }, [destinations]);

  const updateMarkers = async () => {
    if (!mapInstance.current) return;

    // Remove existing markers
    for (const marker of markersRef.current) {
      marker.remove();
    }
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();

    for (const dest of destinations) {
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(dest.name)}.json?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${dest.name}</h3>`))
            .addTo(mapInstance.current);
          
          markersRef.current.push(marker);
          bounds.extend([lng, lat]);
        }
      } catch (error) {
        console.error('Error geocoding destination:', error);
      }
    }

    if (!bounds.isEmpty()) {
      // Calculate the appropriate zoom level
      const boundsArray = bounds.toArray();
      const maxDistance = Math.max(
        Math.abs(boundsArray[0][0] - boundsArray[1][0]),
        Math.abs(boundsArray[0][1] - boundsArray[1][1])
      );
      
      // Increase the base zoom level and adjust the range
      let zoom = Math.floor(Math.log2(360 / maxDistance)) + 1;
      zoom = Math.min(Math.max(zoom, 6), 15); // Adjust zoom range to 6-15

      mapInstance.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        pitch: 45,
        bearing: 0,
        maxZoom: zoom
      });
    } else {
      // If no destinations, reset to global view
      mapInstance.current.flyTo({
        center: [0, 0],
        zoom: 1,
        pitch: 0,
        bearing: 0
      });
    }
  };

  if (mapError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
        <MapPin className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Map Unavailable</h3>
        <p className="text-gray-600 text-center">{mapError}</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MapboxMap;