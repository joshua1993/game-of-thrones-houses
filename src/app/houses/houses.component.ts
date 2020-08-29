import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {House} from '../house';
import {HousesService} from '../services/houses.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-houses',
    templateUrl: './houses.component.html',
    styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {
    houses: House[];
    itemHeight: number;
    page = 1;
    amount = 50;
    displayedColumns: string[] = ['id', 'name'];
    dataSource: MatTableDataSource<House>;
    previousTotalDataAmount: number;
    housesLoaded: number;


    constructor(private http: HttpClient, private housesService: HousesService) {
    }

    ngOnInit(): void {
        this.getHouses(this.page, this.amount);
    }

    getHouses(page, amount) {
        this.housesService.getHouses(page, amount).subscribe(houses => {
            this.housesLoaded = houses.length;
            if (this.dataSource) {
                const data = this.dataSource.data;
                houses.forEach(house => data.push(house));
                this.dataSource.data = data;
            } else {
                this.dataSource = new MatTableDataSource(houses);
            }
        });
    }

    getAllHouses() {
        this.page++;
        this.housesService.getHouses(this.page, this.amount).subscribe(houses => {
            this.housesLoaded = houses.length;

            const data = this.dataSource.data;
            houses.forEach(house => data.push(house));
            this.dataSource.data = data;

            if (this.housesLoaded != 0) {
                this.getAllHouses();
            }
        });
    }

    loadMoreHouses() {
        this.page++;
        this.getHouses(this.page, this.amount);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.filteredData.length < 20 && this.housesLoaded != 0) {
            this.getAllHouses();
        }
    }
}
