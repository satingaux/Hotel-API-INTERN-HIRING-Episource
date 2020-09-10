import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(public apiService: ApiService, private breakpointObserver: BreakpointObserver) { }
  count = 5;
  hotelData = [];
  reviewData;
  errorContent;
  isError = false;
  reviewId;
  isLoading=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.isError = false;
    // this.loadHotels();
  }

  loadHotels()  {
    this.isLoading=true;
    this.reviewData={};
    this.isError = false;
    this.apiService.getLoadHotels(this.count).toPromise().then((data: any) =>  {
      // console.log(data);
      this.hotelData = data;
    }).then((e) => {
      this.isLoading=false;
    }).catch((e) =>  {
      this.errorContent = e.statusText;
      this.isError = true;
      this.isLoading=false;
    });
  }

  loadReviews(hotelId) {
    this.isError = false;
    this.apiService.getReviews(hotelId).toPromise().then((data: any) =>  {
      this.reviewData[hotelId] = data;
      console.log(this.reviewData);
    }).then((e) => {

    }).catch((e) =>  {
      this.errorContent = e.statusText;
      this.isError = true;
    });
  }
}
