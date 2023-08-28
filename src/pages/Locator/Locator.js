import React, {useEffect, useState} from 'react';
import {RebellionsList} from '../../components/RebellionsList';
import {getEntityDetails, getSecretData} from '../../helpers';
import {Map} from '../../components/Map';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const Locator = () => {
    const [locations, setLocations] = useState({});
    const [entities, setEntities] = useState([]);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [list, setList] = useState(null);

    useEffect(() => {
        (async () => {
            await getLocations();
        })()
    }, [])

    useEffect(() => {
        if (Object.keys(locations).length > 0) {
            (async () => {
                await getLocationsData();
            })()
        }
    }, [locations])

    useEffect(() => {
        if (markerPosition) {
            const distances = [];
            Object.values(locations).forEach(location => {
                const distance = calculateDistance(location.lat, location.long);
                distances.push({id: location.id, distance});
            })
            distances.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0));

            const entitiesList = [];
            distances.forEach(item => {
                const entity = entities.find(entity => entity.id === item.id);
                entitiesList.push(entity);
            })

            setList(entitiesList);
        }
    }, [markerPosition])

    const calculateDistance = (lat, lng) => {
        const from = L.latLng(markerPosition.lat, markerPosition.lng);
        const to = L.latLng(lat, lng);

        return from.distanceTo(to) / 1000;
    }

    const getLocations = async () => {
        const message = await getSecretData();
        setLocations(message);
    };

    const getLocationsData = async () => {
        const items = await Promise.all(Object.values(locations).map(item => {
            return getEntityDetails(item.id);
        }));
        setEntities(items);
    };

    return (
        <div>
            <Map
                entities={entities}
                locations={locations}
                setMarkerPosition={setMarkerPosition}
            />
            {list &&
                <RebellionsList list={list}/>
            }
        </div>
    )
};
