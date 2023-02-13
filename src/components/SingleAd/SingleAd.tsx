import React, { useEffect, useState } from 'react';
import { AdEntity } from 'types';
import { api } from "../../lib/api";
import { Loader } from "../common/Loader/Loader";

interface Props {
    id: string;
}

export const SingleAd = ({ id }: Props) => {

    const [ad, setAd] = useState<null | AdEntity>(null);

    useEffect(() => {
        (async () => {
            const adData = await api.getOne(id);
            setAd(adData)
        })()
    }, []);

    if ( !ad ) {
        return <Loader/>
    }
    return (
        <div className="ad-info">

            <h1>{ad.name}</h1>
            <p>{ad.description}</p>
            <p>💰{ad.price} EUR</p>
            <p>🔗 <a target="_blank" rel="noreferrer" href={ad.url}>Find out more:</a></p>

        </div>
    );
};


