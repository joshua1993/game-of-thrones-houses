import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Character} from '../character';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    private apiUrl = '/api/characters';

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrlPrefix + this.apiUrl;
    }

    getCharacterById(id: string): Observable<Character> {
        const url = `${ this.apiUrl }/${ id }`;

        return this.http.get<Character>(url).pipe(
            map((character: Character) => {
                character.id = character.url.substring(character.url.lastIndexOf('/') + 1);

                return character;
            })
        );
    }
}
