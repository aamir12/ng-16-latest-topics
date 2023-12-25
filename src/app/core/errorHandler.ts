import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";

export function handleError (error:HttpErrorResponse,router:Router) {
    let handled: boolean = false;
    console.error(error);
    let message = 'something went wrong';
    if (error instanceof HttpErrorResponse) {
        //server error
        console.log(`error status : ${error.status} ${error.statusText}`);
        switch (error.status) {
            case 401:      //login
            router.navigateByUrl("/login");
            console.log(`redirect to login`);
            handled = true;
            break;
            case 403:     //forbidden
            router.navigateByUrl("/login");
            console.log(`redirect to login`);
            handled = true;
            break;
            default:
            handled = true;
            message = error.statusText;
        }
    }
    else {
        //client side error
        console.error("Other Errors");
    }

    if (handled) {
        console.log('return back ');
        return throwError(() => message)
    } else {
        console.log('throw error back to to the subscriber');
        return throwError(() => message)
    }
}
   