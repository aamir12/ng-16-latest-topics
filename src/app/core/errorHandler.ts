import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";

export function handleError (error:HttpErrorResponse) {
    let handled: boolean = false;
    console.error(error);
    let message = 'something went wrong';
    if (error instanceof HttpErrorResponse) {
        //server error
        console.log(`error status : ${error.status} ${error.statusText}`);
        switch (error.status) {
            case 401:      //login
            break;
            case 403:     //forbidden
            break;
            default:
            message = error.statusText;
        }
    }else {
        //client side error
        console.error("Other Errors");
    }

    return throwError(() => message)
    
}
   