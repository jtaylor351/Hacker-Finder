import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Routes, RouterModule } from '@angular/router';


const APP_ROUTES: Routes = [
    {path: '', component: LandingPageComponent, pathMatch: 'full'},
    {path: 'user/signup', component: SignUpComponent},
    {path: 'user/login', component: LoginComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
