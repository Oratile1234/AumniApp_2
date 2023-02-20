import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PorfolioService {
  baseURL = 'https://alumni-ap-test.herokuapp.com/api/';
  // baseURL = 'http://localhost:7073/api/';

  constructor(private http: HttpClient) { }

  getSkills(){
    return this.http.get(`${this.baseURL}`+ 'getSkills')
  }

  getExpertise(){
    return this.http.get(`${this.baseURL}`+ 'getExpertise')
  }

  projects(employee_number:any){
    return this.http.get(`${this.baseURL}projects/${employee_number}`)
  }
  summary(employee_number:any){
    return this.http.get(`${this.baseURL}getPortfolio/${employee_number}`)
  }

 addSkills(details:any,user_id:any){
   return this.http.post(`${this.baseURL}addSkills/${user_id}`,details)
 }

 addExpertise(details:any,user_id:any){
  return this.http.post(`${this.baseURL}addExpertise/${user_id}`,details)
}

addProject(details:any,user_id:any){
  return this.http.post(`${this.baseURL}addProject/${user_id}`,details)
}
getMySkills(user_id:any){
  return this.http.get(`${this.baseURL}mySkills/${user_id}`)
}

getMyExpertise(user_id:any){
  return this.http.get(`${this.baseURL}myExpertise/${user_id}`)
}

addSummary(details:any,user_id:any){
  return this.http.post(`${this.baseURL}portfolio/${user_id}`,details)
}
getSummary(user_id:any){
  return this.http.get(`${this.baseURL}getPortfolio/${user_id}`)
}

sum( details: any, user_id:any){
  return this.http.patch(`${this.baseURL}updateSummary/${user_id}`,details)
}

updateRatings( details:any,user_id:any){
  return this.http.patch(`${this.baseURL}updateRatings/${user_id}`,details)
}
deleteProject(id:any){
return this.http.delete(`${this.baseURL}deleteProject/${id}`)
}

}

