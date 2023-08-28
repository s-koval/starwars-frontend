import {useState} from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";

export const LocationMarker = ({setMarkerPosition}) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setMarkerPosition(e.latlng);
        }
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
