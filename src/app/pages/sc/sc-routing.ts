import { Route } from "@angular/router";
import { IAAListComponent } from "./components/iaa-list/iaa-list.component";
import { IAACreateComponent } from "./components/iaa-create/iaa-create.component";
import { ActivityListComponent } from "./components/activity-list/activity-list.component";
import { ActivityCreateComponent } from "./components/activity-create/activity-create.component";
import { InvoiceListComponent } from "./components/invoice-list/invoice-list.component";
import { InvoiceCreateComponent } from "./components/invoice-create/invoice-create.component";
import { AgencyListComponent } from "./components/agency-list/agency-list.component";
import { AgencyCreateComponent } from "./components/agency-create/agency-create.component";
import { ContractorListComponent } from "./components/contractor-list/contractor-list.component";
import { ContractorCreateComponent } from "./components/contractor-create/contractor-create.component";

export const SC_ROUTES: Route[] = [
    {
        path:'iaas',
        component:IAAListComponent
    },
    {
        path:'iaas/:encId', //create
        component:IAACreateComponent
    },
    {
        path:'activities',
        component:ActivityListComponent
    },
    {
        path:'activities/:encId',
        component:ActivityCreateComponent
    },
    {
        path:'invoices',
        component:InvoiceListComponent
    },
    {
        path:'invoices/:encId',
        component:InvoiceCreateComponent
    },
    {
        path:'agencies',
        component:AgencyListComponent
    },
    {
        path:'agencies/:encId',
        component:AgencyCreateComponent
    },
    {
        path:'contractors',
        component:ContractorListComponent
    },
    {
        path:'contractors/:encId',
        component:ContractorCreateComponent
    },
    {
        path:'',
        redirectTo:'iaas',
        pathMatch:'full'
    }    
]
