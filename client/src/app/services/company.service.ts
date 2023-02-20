import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  baseURL = 'https://alumni-ap-test.herokuapp.com/api/';
  // baseURL = 'http://localhost:7073/api/';


  constructor(private http: HttpClient) { }

  registration(companyRegister: Company){
    return this.http.post(`${this.baseURL}`+ 'registration',companyRegister )
  }

  getAllCompanies(){
    return this.http.get(`${this.baseURL}`+ 'getCompany')
  }

  getCompanyById(registration_number:any){
    return this.http.get(`${this.baseURL}`+ `getCompanyById/${registration_number}`);
  }

  getNotifs(){
    return this.http.get(`${this.baseURL}`+ `getNotifications`);
  }

  getNotified(){
    return this.http.get(`${this.baseURL}`+ `getNotified`);
  }

  approvePicture( employee_number: any){
     this.http.get(`${this.baseURL}approvePicture/${employee_number}`);
    return this.http.get(`${this.baseURL}approvePicture2/${employee_number}`);
  }

  deleteNotifs(user_id: any, deleted: any){
    return this.http.patch(`${this.baseURL}deleteNotifs/${user_id}`, deleted)
  }

  addCompanyID(employee_number:any, body:any){
    return this.http.patch(`${this.baseURL}addCompanyID/${employee_number}`, body)
  }
}

