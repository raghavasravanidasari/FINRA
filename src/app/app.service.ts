import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
 apiurl="http://localhost:3001/Numbers_Pattern?_page=1&_limit=2";

 constructor(private http:HttpClient) { }
 getData(page,limit){
   return this.http.get(`http://localhost:3001/Numbers_Pattern?_page=${page}&_limit=${limit}`);
 }

 postData(value){
  this.http.post(`http://localhost:3001/Numbers_Pattern`, `{'value':${value}}`).subscribe(
    data => {
      console.log('POST value Request is successful ', data);
    },
    error => {
      console.log('Error', error);
    }
  ); 
}
postCount(value){
  this.http.post(`http://localhost:3001/Total_Count`, `{'value':${value}}`).subscribe(
    data => {
      console.log('POST count Request is successful ', data);
    },
    error => {
      console.log('Error', error);
    }
  );

}
}



