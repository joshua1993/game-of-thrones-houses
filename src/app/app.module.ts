import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HousesComponent} from './houses/houses.component';
import {HttpClientModule} from '@angular/common/http';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
        HousesComponent,
        HouseDetailComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        InfiniteScrollModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
