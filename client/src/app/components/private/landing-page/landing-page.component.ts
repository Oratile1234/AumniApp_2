import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [MessageService],
})
export class LandingPageComponent implements OnInit {


  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;


  users: any[] = [];
  employed: any[] = [];
  unEmployed: any[] = [];
  looking: any[] = [];
  updateNotifs: any[] = [];
  decodedToken: any;
  userServ: any;
  profile: any;
  image: any;
  fullname: any;
  employee_num: any;

  public photoUrl = '';
  // userss:any;
  public showInitials = true;
  public initials: string = '';
  public bgColor: string = ''
  // public circleColor: string = '';
  firstname: string = '';
  lastname: string = '';
  public circleColor = ['#EB7181', '#468547', '#FFD558', '#3670B2', '#6b5b95', '#feb236',
    '#d64161', '#ff7b25', '#FFD558', '#468547', '#3670B2'];


  // updateNotifs: any[] = [];
  me: any;
  notifs: any[] = [];
  not: any;
  // decodedToken: any;
  myEmpNum: any;
  mytype: any;
  mycomptype: any;
  totUsers: any;
  totEmpl: any;
  totUnEmpl: any;
  totLook: any;


  constructor(private userserv: UsersService, private auth: AuthService, private companyService: CompanyService) {
    this.decodedToken = this.auth.decodeToken(
      localStorage.getItem('access_token')
    );
    this.myEmpNum = this.decodedToken.employee_number;


  }


  ngOnInit(): void {
    this.myProf(this.myEmpNum);


  }

  color(fname: string, index: any) {

    fname = fname[0].toUpperCase();
    console.log(fname, index)


    if (fname.match(/[A-C]/i)) {
      this.circleColor[0]
      this.bgColor = this.circleColor[0]
    }
    if (fname.match(/[D-F]/i)) {
      this.circleColor[1]
      this.bgColor = this.circleColor[1]
    }
    if (fname.match(/[G-I]/i)) {
      this.circleColor[2]
      this.bgColor = this.circleColor[2]
    }
    if (fname.match(/[J-L]/i)) {
      this.circleColor[3]
      this.bgColor = this.circleColor[3]
    }
    if (fname.match(/[M-O]/i)) {
      this.circleColor[4]
      this.bgColor = this.circleColor[4]
    }
    if (fname.match(/[P-R]/i)) {
      this.circleColor[5]
      this.bgColor = this.circleColor[5]
    }
    if (fname.match(/[S-U]/i)) {
      this.circleColor[6]
      this.bgColor = this.circleColor[6]
    }
    if (fname.match(/[V-X]/i)) {
      this.circleColor[7]
      this.bgColor = this.circleColor[7]
    }
    if (fname.match(/[YZ]/i)) {
      this.circleColor[8]
      this.bgColor = this.circleColor[8]
    }
    if (index > this.circleColor.length) {
      this.circleColor[this.circleColor.length]
    }
    return this.bgColor
  }

  notifications() {
    this.companyService.getNotifs().subscribe((respond: any) => {
      this.users = respond
      this.circleColor.length = this.users.length

      for (let index = 0; index < respond.length; index++) {

        if (this.users[index].image) {
          this.showInitials = false
          this.photoUrl = this.users[index].image
        } else {
          this.showInitials = true
        }
      }

      for (let i = 0; i < respond.length; i++) {
        if (this.me[0].company_id == respond[i].company_id) {

          //console.log(respond[i], 'All admin Notifications');
          this.notifs.push(respond[i]);
          this.updateNotifs.push(respond[i]);
          // this.loading = false;
          //console.log(this.notifs);
          // const element = this.notifs[i];
          // this.not[i] = this.notifs[i];
          // //console.log(this.me[0].company_id, element.company_id, 'Mind me');
          // this.url = element.imagenew;
          // this.employee_number = element.employee_number;
          // this.date = element.time_stamp;
          // this.id = element.id;
        }
      }
    });
  }

  myProf(EmpNum: any) {
    this.loading = true
    this.userserv.getById(EmpNum).subscribe((response: any) => {
      this.me = response;
      this.mytype = this.me[0].user_type
      this.fullname = this.me[0].name
      this.mycomptype = this.me[0].company_id
      this.notifications();
      this.start();
      this.loading = false
      //console.log(this.me[0].user_type, 'My UserType!!!!');
      //console.log(this.me[0].company_id, 'My Company ID!!!!');
    });

  }


  start() {
    this.loading = true;
    this.userserv.getUsers().subscribe((respond: any) => {

      for (let i = 0; i < respond.length; i++) {
        const element = respond[i];
        if (respond[i].company_id == this.mycomptype && respond[i].account_status == true)

          this.users.push(respond[i]);
        this.totUsers = this.users.length
      }



    });
    this.loading = true;
    this.userserv.getEmployed().subscribe((respond: any) => {

      for (let i = 0; i < respond.length; i++) {
        const element = respond[i];
        if (respond[i].user_type == 2 && respond[i].company_id == this.mycomptype && respond[i].account_status == true)
          this.employed.push(respond[i]);


        this.totEmpl = this.employed.length
      }
    });
    this.loading = true;
    this.userserv.getUnemployed().subscribe((respond: any) => {

      for (let i = 0; i < respond.length; i++) {
        const element = respond[i];
        if (respond[i].user_type != 1 && respond[i].company_id == this.mycomptype && respond[i].account_status == true)
          this.unEmployed.push(respond[i]);
        this.totUnEmpl = this.unEmployed.length
      }
    });
    this.loading = true;
    this.userserv.getLooking().subscribe((respond: any) => {

      for (let i = 0; i < respond.length; i++) {


        const element = respond[i];
        console.log(element, "you are working herer");
        if (respond[i].user_type != 1 && respond[i].company_id == this.mycomptype && respond[i].account_status == true)
          this.looking.push(respond[i]);
        this.totLook = this.looking.length

      }
    });

    // this.userserv.getById(this.decodedToken.employee_number).subscribe((data: any) => {
    //   this.users = data;
    //   this.firstname = this.users[0].name[0].toUpperCase()
    //   this.lastname = this.users[0].surname[0].toUpperCase()

    //   if (this.users[0].image) {
    //     this.showInitials = false
    //     this.photoUrl = this.users[0].image
    //   } else {
    //     this.showInitials = true
    //   }
    // });

  }

}
