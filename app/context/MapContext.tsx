import React, { createContext, useContext, useRef } from 'react';
import type { Map } from 'ol';
import { fromLonLat } from 'ol/proj';

interface MapContextType {
  map: React.MutableRefObject<Map | null>;
  setCenter: (coords: [number, number]) => void;
  setZoom: (zoomLevel: number) => void;
  flyTo: (coords: [number, number], zoom?: number) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const map = useRef<Map | null>(null);

  const setCenter = (coords: [number, number]) => {
    map.current?.getView().setCenter(coords);
  };

  const setZoom = (zoomLevel: number) => {
    map.current?.getView().setZoom(zoomLevel);
  };

  const flyTo = (coords: [number, number], zoom?: number) => {
    const view = map.current?.getView();
    if (view) {
      const transformedCoords = fromLonLat(coords);
      view.animate({
        center: transformedCoords,
        zoom: zoom !== undefined ? zoom : view.getZoom(),
        duration: 500,
      });
    }
  };  

  return (
    <MapContext.Provider value={{ map, setCenter, setZoom, flyTo }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
