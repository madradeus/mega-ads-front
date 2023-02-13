import { AdEntity, NewAdEntity, SimpleAdEntity } from 'types'

export class Api {
    private url: string = 'http://localhost:3001/ad';

    async getOne(id: string): Promise<AdEntity> {
        const res = await fetch(`${this.url}/${id}`);
        return await res.json() as AdEntity;
    }

    async findAll(name = ''): Promise<SimpleAdEntity[]> {

        const res = await fetch(`${this.url}/?name=${name}`);
        const data = await res.json() as {
            ads: AdEntity[]
        };

        return data.ads;
    }

    async insert(ad: NewAdEntity): Promise<string> {

        const res = await fetch(this.url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(ad)
        })
        const data: AdEntity = await res.json();

        return data.id;
    }


}

export const api = new Api()