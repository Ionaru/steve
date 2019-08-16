import {
    MdcButtonModule,
    MdcCardModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcIconButtonModule,
    MdcIconModule,
    MdcListModule,
    MdcMenuModule,
    MdcTabBarModule,
    MdcTopAppBarModule,
    MdcTypographyModule,
} from '@angular-mdc/web';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ShipDialog } from './ships/ship.dialog';
import { ShipsComponent } from './ships/ships.component';
import { TripsComponent } from './trips/trips.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        AuthComponent,
        ShipsComponent,
        TripsComponent,
        ShipDialog,
    ],
    entryComponents: [
        ShipDialog,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MdcButtonModule,
        MdcCardModule,
        MdcDialogModule,
        MdcDrawerModule,
        MdcIconButtonModule,
        MdcIconModule,
        MdcListModule,
        MdcMenuModule,
        MdcTabBarModule,
        MdcTopAppBarModule,
        FontAwesomeModule,
        MdcTypographyModule,
    ],
    providers: [],
})
export class AppModule {}
