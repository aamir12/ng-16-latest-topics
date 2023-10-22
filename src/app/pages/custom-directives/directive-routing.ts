import { Route } from "@angular/router";
import { InputValidationComponent } from "./components/input-validation/input-validation.component";
import { LazyImageComponent } from "./components/lazy-image/lazy-image.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { SinglePostComponent } from "./components/single-post/single-post.component";
export const CUSTOM_DIRECTIVES_ROUTES: Route[] = [
    {
        path:'',
        component:InputValidationComponent
    },
    {
        path:'custom-validation',
        component:InputValidationComponent
    },
    {
        path:'lazy-load-image',
        component:LazyImageComponent
    },
    {
        path:'navigation',
        component:NavigationComponent
    },
    {
        path:'single-post',
        component:SinglePostComponent
    },
    // {
    //     path:'lazy-load-images',
    //     component:HostContextComponent
    // },
    // {
    //     path:'drag-and-drop',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'ellipsis',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'click-outside',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'confirm-dialog',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'infiinite-scroll',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'highlight-search',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'responsive',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'input-mask',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'disable-right-click',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'time-ago',
    //     component:OtherPageComponent
    // },
    // {
    //     path:'copy-to-clipboard',
    //     component:OtherPageComponent
    // }
]
