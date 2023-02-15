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
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";


export const Map = () => {

    const { nameToSearch } = useContext(SearchContext);
    const [ads, setAds] = useState<[] | SimpleAdEntity[]>([]);
    const toast = useToast();

    const { lat, lon, zoom } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const adsList = await api.findAll(nameToSearch);
                setAds(adsList)
            } catch (e: any) {
                toast({
                    position: "top-right",
                    title: 'Error',
                    description: e.message,
                    status: 'error',
                    duration: 3000,
                })
            }
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

    const defaultPosition: LatLngExpression = [52.4014407, 16.9618718]
    return (
        <div className="map">
            <MapContainer
                center={lat && lon ? [Number(lat), Number(lon)] : defaultPosition}
                zoom={zoom ? Number(zoom) : 14}>
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

