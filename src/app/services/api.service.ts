import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ApiService{

    constructor(private http:HttpClient){
    }

    private promiseResponse(res: Observable<any>): Promise<any> {
        return new Promise((resolve, reject) => {
          res.pipe(catchError(this.handleError)).subscribe({
            next: (data: any) => resolve(data),
            error: (err: any) => reject(err),
          });
        });
      }
    
      private handleError(error: HttpErrorResponse): Observable<never> {
        return throwError(()=>{
          error.error ? { ...error.error, statusText: error.statusText } : error
        }  
        );
      }

      private setURL(url: string): string {
        return env.API_URL + url;
      }

      public get(url: string): Promise<any> {
        return this.promiseResponse(this.http.get(this.setURL(url)));
      }

}