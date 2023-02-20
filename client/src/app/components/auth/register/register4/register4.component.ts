import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShareRegistrationDataService } from 'src/app/services/share-registration-data.service';
import { CompanyService } from "../../../../services/company.service";
import { AuthService } from "../../../../services/auth.service";
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent,ngxLoadingAnimationTypes } from 'ngx-loading';


@Component({
  selector: 'app-register4',
  templateUrl: './register4.component.html',
  styleUrls: ['./register4.component.scss'],
  providers: [MessageService]
})
export class Register4Component implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  name!: string;
  email!: string;
  phone!: string;
  regnum!: string;
  adminName!: string;
  admiEmpNum!: string;
  adimEmail!: string;
  adminPassword!: string;
  companyId: any;
  constructor( private shareService:ShareRegistrationDataService, private router: Router, private authserv:CompanyService, private authservAdmin:AuthService) {
   
    this.authserv.getAllCompanies().subscribe((response:any)=>{
      for (let i = 0; i< response.length; i++) {
      const element = response[i].company_id;
      this.companyId = element +1;
      console.log(element +1, "This me who am I")
      }
    })
   
  }

  ngOnInit(): void {
    this.shareService.sharedMessage1.subscribe(name => this.name = name)
    this.shareService.sharedMessage2.subscribe(email => this.email = email)
    this.shareService.sharedMessage3.subscribe(phone => this.phone = phone)
    this.shareService.sharedMessage4.subscribe(regnum => this.regnum = regnum)
    this.shareService.sharedMessage10.subscribe(adminName => this.adminName = adminName)
    this.shareService.sharedMessage20.subscribe(admiEmpNum => this.admiEmpNum = admiEmpNum)
    this.shareService.sharedMessage30.subscribe(adimEmail => this.adimEmail = adimEmail)
    this.shareService.sharedMessage40.subscribe(adminPassword => this.adminPassword = adminPassword)

  }

  onSubmit():void{
    // this.loading = false;
    this.submitted = true;

    let company = {

    // company_id : number,
    company_name: this.name,
    registration_number: this.regnum,
    email: this.email,
    phone_number: this.phone,
    logo:""
    }
    this.loading = true;
    this.authserv.registration(company).subscribe({
      next:(data: any) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.submitted = false;
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      error: (err: { error: { message: string; }; }) => {
        this.loading = true;
        this.errorMessage = err.error.message;
        this.loading = false;
      }
    });

    let user = {
      image:"",
      employee_number: this.admiEmpNum,
      name: this.adminName,
      surname: this.adminName,
      email: this.adimEmail,
      phone_number: 0o611234456,
      employement_status: "employed",
      account_status: true,
      job_title:"Administrator",
      password: this.adminPassword,
      user_type: 1,
      company_id: this.companyId
    };
    this.loading = true;

    this.authservAdmin.register(user).subscribe({
      next: (data1) => {
        this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.submitted = false;
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (err: { error: { message: string; }; }) => {
          this.loading = true;
          this.errorMessage = err.error.message;
          this.loading = false;
        }
      });
  }

}
