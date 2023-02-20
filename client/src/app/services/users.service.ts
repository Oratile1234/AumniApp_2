import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumni } from '../interfaces/users';


@Injectable({
  providedIn: 'root'

})
export class UsersService {

  baseURL = 'https://alumni-ap-test.herokuapp.com/api/';
  circleColor = ['#367E18','#790252','#645CAA','#AF0171','#645CAA','#A460ED',
    '#42855B','#FF4A4A','#A62349','#FFB200','#781C68','#D61C4E','#FF87B2'];
  bgColor: any;
  // baseURL = 'http://localhost:7073/api/';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.baseURL}`+ 'getUsers')
  }

  updateStatus(status: any, employee_number: any){
    return this.http.patch(`${this.baseURL}updateStatus/${employee_number}`,status);
  }

  updateLookingStatus(status: any, employee_number: any){
    return this.http.patch(`${this.baseURL}updateLookingStatus/${employee_number}`,status);
  }

  getAlumni(){
    return this.http.get(`${this.baseURL}`+ 'getAlumni',)
  }

  getUnemployed(){
    return this.http.get(`${this.baseURL}`+ 'getalumni/unemployed')
  }

  getEmployed(){
    return this.http.get(`${this.baseURL}`+ 'getalumni/employed')
  }

  getLooking(){
    return this.http.get(`${this.baseURL}`+ 'getStats/true')
  }

  getUsersP(page: number){
    return this.http.get(`${this.baseURL}`+'getalumni/unemployed' + '?page=' + page)
  }

  getById(employee_number:any){
    return this.http.get(`${this.baseURL}getById/${employee_number}`)
  }

  updateProfile(file :any, employee_number:any){
    return this.http.patch(`${this.baseURL}upload/${employee_number}`,file)
  }

  insertProfile(file :any,user_id: any){
    return this.http.post(`${this.baseURL}uploadNew/${user_id}`,file)
  }

  acceptUserNotifs(user_id: any, body:any){
    return this.http.patch(`${this.baseURL}acceptUserNotifs/${user_id}`,body)
  }

  getUserNotifs(user_id: any){
    return this.http.get(`${this.baseURL}UserNotifs/${user_id}`)
  }

  declineNotifs(user_id:any, body:any){
    return this.http.patch(`${this.baseURL}declineNotifs/${user_id}`,body)
  }
}
