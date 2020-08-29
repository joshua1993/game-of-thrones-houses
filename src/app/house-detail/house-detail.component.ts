import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {House} from '../house';
import {CharacterService} from '../services/character.service';
import {HousesService} from '../services/houses.service';

@Component({
    selector: 'app-house-detail',
    templateUrl: './house-detail.component.html',
    styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnInit {
    house: House;
    activeHouseID = this.route.snapshot.paramMap.get('id');

    constructor(private housesService: HousesService, private characterService: CharacterService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initHouse();
    }

    initHouse(): void {
        this.housesService.getHouseById(this.activeHouseID).subscribe(house => {
            this.house = house;

            house.overlord ? this.getHouse(house.overlord, 'overlord') : '';

            house.currentLord ? this.getCharacter(house.currentLord, 'currentLord') : '';

            house.founder ? this.getCharacter(house.founder, 'founder') : '';

            house.heir ? this.getCharacter(house.heir, 'heir') : '';

            house.cadetBranches[0] && house.cadetBranches[0].length > 0 ? this.getHouses(house.cadetBranches, 'cadetBranches') : '';

            house.swornMembers[0] && house.swornMembers[0].length > 0 ? this.getCharacters(house.swornMembers, 'swornMembers') : '';
        });
    }

    getHouse(houseUrl, fieldKey) {
        const houseID = houseUrl.substring(houseUrl.lastIndexOf('/') + 1);

        this.housesService.getHouseById(houseID).subscribe(house => {
            this.house[fieldKey] = {
                id: house.id,
                name: house.name
            };
        });
    }

    getHouses(houseUrls, fieldKey) {
        let houses = [];
        houseUrls.forEach(houseUrl => {
            const houseID = houseUrl.substring(houseUrl.lastIndexOf('/') + 1);

            this.housesService.getHouseById(houseID).subscribe(house => {
                houses.push({
                    id: house.id,
                    name: house.name
                });

                this.house[fieldKey] = houses;
            });
        });
    }

    getCharacter(characterUrl, fieldKey) {
        const characterID = characterUrl.substring(characterUrl.lastIndexOf('/') + 1);

        this.characterService.getCharacterById(characterID).subscribe(character => {
            this.house[fieldKey] = {
                id: character.id,
                name: character.name
            };
        });
    }

    getCharacters(characterUrls, fieldKey) {
        let characters = [];
        characterUrls.forEach(characterMember => {
            const characterID = characterMember.substring(characterMember.lastIndexOf('/') + 1);

            this.characterService.getCharacterById(characterID).subscribe(character => {
                characters.push({
                    id: character.id,
                    name: character.name
                });

                this.house[fieldKey] = characters;
            });
        });
    }

}
