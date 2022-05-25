import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postInfo(data : any){
    return this.http.post<any>("http://localhost:9000/productList/",data);
  }
  getInfo(){
    return this.http.get<any>("http://localhost:9000/productList/", );
  }
  putInfo(data:any,_id:number){
    return this.http.put<any>("http://localhost:9000/productList/" +_id, data);
  }
  deleteInfo(_id:number){
    return this.http.delete<any>("http://localhost:9000/productList/"+_id,)
  }
  //user apiis
  getUserInfo(){
    return this.http.get<any>("http://localhost:9000/userData/", );
  }
  postUserInfo(data : any){
    return this.http.post<any>("http://localhost:9000/userData/",data);
  }
  putUserInfo(data:any,_id:number){
    return this.http.put<any>("http://localhost:9000/userData/"+_id, data);
  }
  deleteUserInfo(_id:number){
    return this.http.delete<any>("http://localhost:9000/userData/"+_id,);
  }
  //Medicine Data
  postMedInfo(data : any){
    return this.http.post<any>("http://localhost:9000/medData/",data);
  }
  getMedInfo(){
    return this.http.get<any>("http://localhost:9000/medData/", );
  }
  putMedInfo(data:any,_id:number){
    return this.http.put<any>("http://localhost:9000/medData/"+_id, data);
  }
  deleteMedInfo(_id:number){
    return this.http.delete<any>("http://localhost:9000/medData/"+_id,);
  }
}
