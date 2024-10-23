import React, { useEffect, useState } from 'react';
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';

const MapComponent: React.FC = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null); // Tipo para o objeto de mapa
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]); // Array para armazenar marcadores

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyCwJLSj5NjWnP5o8AStmraaeMfJ42VCfQE', 
            version: 'weekly', 
        } as LoaderOptions); 

        loader.load().then((google) => {
            const maps = google.maps;
            
            const mapInstance = new maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });

            
            mapInstance.addListener('click', (event: { latLng: any; }) => {
                const clickedLatLng = event.latLng;
                console.log('Latitude:', clickedLatLng.lat());
                console.log('Longitude:', clickedLatLng.lng());

                
                const newMarker = new maps.Marker({
                    position: clickedLatLng,
                    map: mapInstance,
                    title: 'Novo Marcador', 
                });

                
                setMarkers([...markers, newMarker]);
            });

            setMap(mapInstance);
        });
    }, []);

    return (
        <div id="map" style={{ height: '400px', width: '100%' }}>
            {/* Mapa será renderizado aqui */}
        </div>
    );
};

export default MapComponent;
