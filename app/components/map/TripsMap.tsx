import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { useMap } from '~/context/MapContext';

const TripsMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const { map } = useMap();

  useEffect(() => {
    if (!mapRef.current) return;

    const view = new View({
      center: [0, 0],
      zoom: 2,
    });

    const layer = new TileLayer({
      source: new OSM({
        crossOrigin: 'anonymous',
        interpolate: true,
      }),
      cacheSize: 128,
      preload: 128
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [layer],
      view,
      maxTilesLoading: 64,
      controls: [],
    });

    mapInstance.current.getInteractions().forEach((i) => {i.setActive(false);});

    map.current = mapInstance.current;

    return () => {
      map.current = null;
      mapInstance.current?.setTarget(undefined);
    };
  }, [map]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    />
  );
};

export default TripsMap;
