import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeeyondComponent } from './seeyond/seeyond.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
	{ path: '', redirectTo: '/feature/wall', pathMatch: 'full'},
  { path: 'feature/:name', component: SeeyondComponent }, // starting with a feature
  { path: 'feature/:name/:id', component: SeeyondComponent }, // loading an id from DB.
	{ path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
