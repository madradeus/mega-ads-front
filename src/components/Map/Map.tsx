import React, { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import './Map.css'
import 'leaflet/dist/leaflet.css'
import '../../utils/fix-map-icon'
import { SearchContext } from "../../contexts/SearchContext";
import { api } from "../../lib/api";
import { SimpleAdEntity } from "types";
import { SingleAd } from "../SingleAd/SingleAd";


export const Map = () => {

    const { nameToSearch } = useContext(SearchContext);
    const [ads, setAds] = useState<[] | SimpleAdEntity[]>([]);

    useEffect(() => {
        (async () => {
            const adsList = await api.findAll(nameToSearch);
            setAds(adsList)
        })()
    }, [nameToSearch]);

    const renderMarkers = () => (
        ads.map(ad => (
            <Marker position={[ad.lat, ad.lon]} key={ad.id}>
                <Popup className="place-desc">
                    <SingleAd id={ad.id}></SingleAd>
                </Popup>
            </Marker>
        ))
    )

    const position = [49.15535141555375, 22.46817354258396]
    return (
        <div className="map">
            <MapContainer center={(position as LatLngExpression)} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    renderMarkers()
                }
            </MapContainer>

        </div>
    )

}

