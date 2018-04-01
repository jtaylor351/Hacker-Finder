import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    {path: '', component: LandingPageComponent, pathMatch: 'full'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
