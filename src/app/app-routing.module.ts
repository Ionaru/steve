import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component.js';
import { HomeComponent } from './home/home.component.js';
import { ShipsComponent } from './ships/ships.component.js';
import { TripsComponent } from './trips/trips.component.js';

const routes: Routes = [
    {
        component: HomeComponent,
        path: '',
    },
    {
        component: AuthComponent,
        path: 'auth',
    },
    {
        component: TripsComponent,
        path: 'trips',
    },
    {
        component: ShipsComponent,
        path: 'ships',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
