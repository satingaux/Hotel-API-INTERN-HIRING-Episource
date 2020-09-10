import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLoadHotels(count): Observable<any> {
    return this.http.get<any>('http://fake-hotel-api.herokuapp.com/api/hotels/?count=5');
  }

  getReviews(hotelId:any):  Observable<any> {
    return this.http.get<any>('http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=' + hotelId);
  }
}
