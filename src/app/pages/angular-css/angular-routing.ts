import { Route } from "@angular/router";
import { NgDeepComponent } from "./ng-deep/ng-deep.component";
import { HostContextComponent } from "./host-context/host-context.component";
import { OtherPageComponent } from "./other-page/other-page.component";


export const ANGULAR_CSS_ROUTES: Route[] = [
    {

        path:'',
        component:NgDeepComponent
    },
    {

        path:'ng-deep',
        component:NgDeepComponent
    },
    {
        path:'host-context',
        component:HostContextComponent
    },
    {
        path:'other-page',
        component:OtherPageComponent
    }
]
