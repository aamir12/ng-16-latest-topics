import { Route } from "@angular/router";
import { ListPostComponent } from "./components/list-post/list-post.component";
import { CreatePostComponent } from "./components/create-post/create-post.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CreateCategoryComponent } from "./components/create-category/create-category.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { RetryComponent } from "./components/retry/retry.component";

export const CRUD_ROUTES: Route[] = [
    {
        path:'',
        component:ListPostComponent
    },
    {
        path:'create',
        component:CreatePostComponent
    },
    {
        path:'edit',
        component:CreatePostComponent
    },
    {
        path:'view',
        component:CreatePostComponent
    },
    {
        path:'categories',
        component: CategoriesComponent,
        children:[
            {
                path:'',
                component:CategoryListComponent
            },
            {
                path:'create',
                component:CreateCategoryComponent
            },
            {
                path:'edit',
                component:CreateCategoryComponent
            },
            {
                path:'view',
                component:CreateCategoryComponent
            }
        ]
    },
    {
        path:'users',
        component: UserListComponent,
    },
    {
        path:'users/create',
        component: CreateUserComponent,
    },
    {
        path:'users/edit',
        component: CreateUserComponent,
    },
    {
        path:'users/view',
        component: CreateUserComponent,
    },
    {
        path:'retry',
        component: RetryComponent,
    }
    
]
