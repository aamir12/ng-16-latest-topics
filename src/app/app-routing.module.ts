import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'view-encapsulation',
    loadComponent: () => import('./pages/view-encapsulation/view-encapsulation.component').then(mod => mod.ViewEncapsulationComponent)
  },
  {
    path: 'angular-css',
    loadComponent: () => import('./pages/angular-css/angular-css.component').then(mod => mod.AngularCssComponent),
    loadChildren: () =>
      import('./pages/angular-css/angular-routing').then(
        (mod) => mod.ANGULAR_CSS_ROUTES
      ),

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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
