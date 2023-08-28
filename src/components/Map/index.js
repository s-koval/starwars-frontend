import React from 'react';
import {LocationMarker} from '../LocationMarker';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const Map = ({locations, entities, setMarkerPosition}) => {

    return (
        <MapContainer
            center={[0, 0]}
            zoom={1.87}
            style={{width: '1100px', height: '600px', margin: '50px auto'}}
            doubleClickZoom={false}
            zoomControl={false}
            closePopupOnClick={false}
            dragging={false}
            zoomSnap={false}
            zoomDelta={false}
            trackResize={false}
            touchZoom={false}
            scrollWheelZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.values(locations).map((location) => (
                    <Marker
                        key={location?.id}
                        position={[location?.lat, location?.long]}
                    >
                        <Popup>{entities.find(item => item.id === location?.id)?.name}</Popup>
                    </Marker>
                )
            )}
            <LocationMarker setMarkerPosition={setMarkerPosition}/>
        </MapContainer>
    )
};
