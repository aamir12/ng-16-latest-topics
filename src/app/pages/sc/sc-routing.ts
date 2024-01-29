import { Route } from "@angular/router";
import { IAAListComponent } from "./components/iaa-list/iaa-list.component";
import { CreateIAAComponent } from "./components/create-iaa/create-iaa.component";

export const SC_ROUTES: Route[] = [
    {
        path:'iaa',
        component:IAAListComponent
    },
    {
        path:'iaa/:encId', //create
        component:CreateIAAComponent
    },
    {
        path:'activity',
        component:CreateIAAComponent
    },
    {
        path:'activity/:encId',
        component:CreateIAAComponent
    },
    {
        path:'invoice',
        component:CreateIAAComponent
    },
    {
        path:'invoice/:encId',
        component:CreateIAAComponent
    },
    {
        path:'agencies',
        component:CreateIAAComponent
    },
    {
        path:'agencies/:encId',
        component:CreateIAAComponent
    },
    {
        path:'contractor',
        component:CreateIAAComponent
    },
    {
        path:'contractor/:encId',
        component:CreateIAAComponent
    },
    {
        path:'',
        redirectTo:'iaa',
        pathMatch:'full'
    }    
]
