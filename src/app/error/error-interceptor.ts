import { ErrorComponent } from './error.component';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occured';
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.dialog.open(ErrorComponent, {
                    data: {
                        message: errorMessage,
                    }
                });

                return throwError(error);
            })
        );
    }
}