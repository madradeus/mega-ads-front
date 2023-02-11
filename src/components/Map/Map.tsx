import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import './Map.css'
import 'leaflet/dist/leaflet.css'
import '../../utils/fix-map-icon'


export const Map = () => {

    const position = [49.15535141555375, 22.46817354258396]
    return (
        <div className="map">
            <MapContainer center={(position as LatLngExpression)} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position as LatLngExpression}>
                    <Popup className="place-desc">
                        <h1>Baza ludzi z mgły</h1>
                        <p>Warto wstąpić wieczorem na parę głębszych :)</p>
                    </Popup>
                </Marker>
                <Marker position={[49.1591903205776, 22.472038678451522]}>
                    <Popup className="place-desc">
                        <h1>Werchowyna</h1>
                        <p>Noclegi u Seby</p>
                    </Popup>
                </Marker>
            </MapContainer>

        </div>
    )

}

