import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../../services/company.service'
// import { Company } from '../../../interfaces/company'
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent,ngxLoadingAnimationTypes } from 'ngx-loading';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  decodedToken: any;
  myEmpNum: any;
  me: any;
  mytype: any;
  fullname: any;

  constructor(private companyServ:CompanyService,
    private userserv: UsersService,
     private auth: AuthService)
     {
    this.decodedToken = this.auth.decodeToken(
      localStorage.getItem('access_token')
    );
    this.myEmpNum = this.decodedToken.employee_number;
    this.myProf(this.myEmpNum);
   }
prof:any;

  ngOnInit(): void {

  }

  myProf(EmpNum: any) {
    this.userserv.getById(EmpNum).subscribe((response: any) => {
      this.me = response;
      console.log(this.me);
      this.mytype = this.me[0].company_id
      this.companyServ.getCompanyById(this.mytype).subscribe((respond: any) => {
        this.prof = respond;
        console.log( this.prof);

      });

      this.fullname = this.me[0].name
        // this.notifications()
      console.log( this.mytype + 'My UserType!!!!');
      //console.log(this.me[0].company_id, 'My Company ID!!!!');
    });
  }

}
