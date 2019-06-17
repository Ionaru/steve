import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component.js';
import { HomeComponent } from './home/home.component.js';

const routes: Routes = [
    {
        component: HomeComponent,
        path: '',
    },
    {
        component: AuthComponent,
        path: 'auth',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
