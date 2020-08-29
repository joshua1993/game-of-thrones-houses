import {HttpClient, HttpParams} from '@angular/common/http';
import {stringify} from '@angular/compiler/src/util';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {House} from '../house';

@Injectable({
    providedIn: 'root'
})
export class HousesService {
    private apiUrl = '/api/houses';

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrlPrefix + this.apiUrl;
    }

    getHouses(page, amount): Observable<House[]> {
        let params = new HttpParams();

        page ? params = params.set('page', stringify(page)) : '';
        amount ? params = params.set('pageSize', stringify(amount)) : '';

        return this.http.get<House[]>(this.apiUrl, {params: params}).pipe(
            map((houses: House[]) => {
                houses.forEach((house) => {
                    house.id = house.url.substring(house.url.lastIndexOf('/') + 1);
                });
                return houses;
            })
        );
    }

    getHouseById(id: string): Observable<House> {
        const url = `${ this.apiUrl }/${ id }`;

        return this.http.get<House>(url).pipe(
            map((house: House) => {
                house.id = house.url.substring(house.url.lastIndexOf('/') + 1);

                return house;
            })
        );
    }
}
