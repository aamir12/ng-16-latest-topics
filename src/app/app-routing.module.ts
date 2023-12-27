import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'angular-css',
    loadComponent: () => import('./pages/angular-css/angular-css.component').then(mod => mod.AngularCssComponent),
    
  },
  {
    path: 'gaurds',
    loadComponent: () => import('./pages/gaurds/gaurds.component').then(mod => mod.GaurdsComponent)
  },
  {
    path: 'ng-template-outlet',
    loadComponent: () => import('./pages/ng-template-outlet/ng-template-outlet.component').then(mod => mod.NgTemplateOutletComponent)
  },
  {
    path: 'signals',
    loadComponent: () => import('./pages/signals/signals.component').then(mod => mod.SignalsComponent)
  },
  {
    path: 'custom-directives',
    loadComponent: () => import('./pages/custom-directives/custom-directives.component').then(mod => mod.CustomDirectivesComponent),
    loadChildren: () =>
      import('./pages/custom-directives/directive-routing').then(
        (mod) => mod.CUSTOM_DIRECTIVES_ROUTES
      ),

  },
  {
    path: 'pipes',
    loadComponent: () => import('./pages/pipes/pipes.component').then(mod => mod.PipesComponent)
  },
  {
    path: 'inline-edit-able-mat-table',
    loadComponent: () => import('./pages/edit-eable-mat-table/edit-eable-mat-table.component').then(mod => mod.EditEableMatTableComponent)
  },
  {
    path: 'lazy-images',
    loadComponent: () => import('./pages/lazy-load-image/lazy-load-image.component').then(mod => mod.LazyLoadImageComponent)
  },
  {
    path: 'crud',
    loadComponent: () => import('./pages/crud/crud.component').then(mod => mod.CrudComponent),
    loadChildren: () =>
      import('./pages/crud/crud-routing').then(
        (mod) => mod.CRUD_ROUTES
      ),

  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
