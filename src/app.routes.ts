import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/Home';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent }
];