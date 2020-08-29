import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {HousesComponent} from './houses/houses.component';

const routes: Routes = [
    {path: '', component: HousesComponent},
    {path: 'house/:id', component: HouseDetailComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
