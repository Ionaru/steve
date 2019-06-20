import {
    MdcButtonModule,
    MdcDrawerModule,
    MdcIconModule,
    MdcListModule,
    MdcMenuModule,
    MdcTabBarModule,
    MdcTopAppBarModule,
} from '@angular-mdc/web';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        AuthComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MdcButtonModule,
        MdcDrawerModule,
        MdcIconModule,
        MdcListModule,
        MdcMenuModule,
        MdcTabBarModule,
        MdcTopAppBarModule,
        FontAwesomeModule,
    ],
    providers: [],
})
export class AppModule {}
