import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareRegistrationDataService {

  private image = new BehaviorSubject('');

  private name = new BehaviorSubject('');
  private regnum = new BehaviorSubject('');
  private email = new BehaviorSubject('');
  private phoneNum = new BehaviorSubject('');

  private adminName = new BehaviorSubject('');
  private admiEmpNum = new BehaviorSubject('');
  private adimEmail = new BehaviorSubject('');
  private adminPassword = new BehaviorSubject('');


  sharedMessageImage = this.image.asObservable();

  sharedMessage1 = this.name.asObservable();
  sharedMessage2 = this.regnum.asObservable();
  sharedMessage3 = this.email.asObservable();
  sharedMessage4 = this.phoneNum.asObservable();
  sharedMessage10 = this.adminName.asObservable();
  sharedMessage20 = this.admiEmpNum.asObservable();
  sharedMessage30 = this.adimEmail.asObservable();
  sharedMessage40 = this.adminPassword.asObservable();

  constructor() { }

  nextName(name: string) {
    this.name.next(name)
  };
  nextRegnum(regnum: string) {
    this.regnum.next(regnum)
  };
  nextEmail(email: string) {
    this.email.next(email)
  };
  nextPhoneNum(phoneNum: string) {
    this.phoneNum.next(phoneNum)
  };
  nextAdminName(adminName: string) {
    this.adminName.next(adminName)
  };
  nextAdminEmpNum(admiEmpNum: string) {
    this.admiEmpNum.next(admiEmpNum)
  };
  nextAdminEmail(adimEmail: string) {
    this.adimEmail.next(adimEmail)
  };
  nextPassword(adminPassword: string) {
    this.adminPassword.next(adminPassword)
  };

  uploadImage(image: any) {
    this.image.next(image)
  };
}
