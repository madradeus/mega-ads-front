export const getLocationInfo = async (address: string) => {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const [geoData] = await geoRes.json();
    if ( !geoData ) {
        throw new Error('Cannot find address')
    }

    return geoData

};