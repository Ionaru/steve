import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ShipsComponent } from './ships/ships.component';
import { TripsComponent } from './trips/trips.component';

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
    {
        component: AboutComponent,
        path: 'about',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
