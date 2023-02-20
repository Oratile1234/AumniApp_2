import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { UsersService } from 'src/app/services/users.service';
import { NgxLoadingComponent,ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  // Initials profile picture logic
  public photoUrl = '';
  users:any;
  public showInitials = true;
  public initials: string = '';
  public circleColor: string = '';
  public colors = ['#367E18','#790252','#645CAA','#AF0171','#645CAA','#A460ED',
                    '#42855B','#FF4A4A','#A62349','#FFB200','#781C68','#D61C4E','#FF87B2'];
  firstname: string = '';
  lastname: string = '';

  decodedToken: any;
  me: any;
  mytype: any;
  notifs: any[] = [];
  updateNotifs: any[] = [];
  myEmpNum: any;

  constructor(private auth: AuthService, private userServ: UsersService, private companyService: CompanyService) {
    this.decodedToken = this.auth.decodeToken(
      localStorage.getItem('access_token')
    );
    this.myEmpNum = this.decodedToken.employee_number;
    this.myProf(this.myEmpNum);
  }

  profile: any;
  fullname: any;
  name: any;
  email: any;
  image: any;
  notifsCounter: any;
  notifsCounted: any;

  ngOnInit(): void {
    this.loading = true;
    this.user();
   this.notifsCounted = 0;
   this.updateNotifsCounter();

   this.userServ.getById(this.decodedToken.employee_number).subscribe((data: any) => {
    this.users = data;
    console.log(this.users);

    this.firstname = this.users[0].name[0].toUpperCase()
    this.lastname = this.users[0].surname[0].toUpperCase()

    if(this.users[0].image){
      this.showInitials = false
      this.photoUrl = this.users[0].image
    }else{
      this.circleColor = this.color(this.users[0].name[0])
      console.log(this.circleColor)
      this.showInitials = true
    }

  });


  }

  color(fname:string){
    fname = fname.toUpperCase();

      if(fname.match(/[A-C]/i)){
        this.circleColor = this.colors[0]
      }else if(fname.match(/[D-F]/i)){
        this.circleColor = this.colors[1]
      }else if(fname.match(/[G-I]/i)){
        this.circleColor = this.colors[2]
      }else if(fname.match(/[J-L]/i)){
        this.circleColor = this.colors[3]
      }else if(fname.match(/[M-O]/i)){
        this.circleColor = this.colors[4]
      }else if(fname.match(/[P-R]/i)){
        this.circleColor = this.colors[5]
      }else if(fname.match(/[S-U]/i)){
        this.circleColor = this.colors[6]
      }else if(fname.match(/[V-X]/i)){
        this.circleColor = this.colors[7]
      }else if(fname.match(/[YZ]/i)){
        this.circleColor = this.colors[8]
      }else{
        this.circleColor = '#F5EDDC'
      }
      return this.circleColor
  }

  private createInitials(): void {
    let initials = "";

    for (let i = 0; i < this.name.length; i++) {
        if (this.firstname.charAt(i) == ''){
            continue;
        }

        if (this.firstname.charAt(i) == this.firstname.charAt(i).toUpperCase()){
            initials += this.firstname.charAt(i);

            if (initials.length == 2){
                break;
            }
        }
    }
    this.initials = initials;
  }

  Logout() {
    this.auth.doLogout()
  }

  user() {
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    this.userServ.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.profile = data[0];
      this.image = data[0].image;
      this.photoUrl = data[0].image;
      this.firstname = data[0].name;
      this.lastname = data[0].surname;
      this.fullname = data[0].name + data[0].surname;
    })

    // return this.auth.getUserProfile().subscribe((respond: any) => {
    //   this.profile = respond
    //   this.name = this.profile.decoded.name
    //   this.email = this.profile.decoded.email
    //   this.fullname =  this.transform(this.name)
    //   this.image = this.profile.image
    ////console.log(this.fullname, "Profile image");
    // })

  }

  transform(value: string): string {
    let first = value.substr(0, 1).toUpperCase();
    return first + value.substr(1);
  }
//   myProf(EmpNum: any) {

//     this.userServ.getById(EmpNum).subscribe((response: any) => {
//       this.me = response;
//       //console.log(this.me[0].company_id, "My Nav Profile!!!!");
//  this.mytype = this.me[0].company_id;
//     })
//   }
  // updateNotifsCounter() {
  //   this.companyService.getNotifs().subscribe((respond: any) => {
  //     // this.notifsCounter = respond;


  //     for (let i = 0; i < respond.length; i++) {
  //       if (this.mytype == respond[i].company_id) {
  //         this.notifsCounter += respond[i].length;
  //         // const element = this.notifs[i];
  //         // this.not = this.notifs[i]
  //         // //console.log(this.me[0].company_id ,element.company_id ,"Mind me");
  //         // this.url = element.imagenew;
  //         // this.employee_number = element.employee_number;
  //         // this.date = element.time_stamp;
  //         // //console.log(this.not,"Notifications inside");
  //         // this.id = element.id;
  //         // //console.log(this.id)
  //         //console.log(this.notifsCounter[i],"Nav info");

  //       }
  //     }
  //   })
  // }

  myProf(EmpNum: any) {
    this.userServ.getById(EmpNum).subscribe((response: any) => {
      this.me = response;
      this.mytype = this.me[0].user_type

      // this.updateNotifsCounter();
      //console.log(this.me[0].user_type, 'My UserType!!!!');
      //console.log(this.me[0].company_id, 'My Company ID!!!!');
    });
  }

  updateNotifsCounter() {

    //console.log(this.mytype, 'My Notifs!!!!');

      this.companyService.getNotifs().subscribe((respond: any) => {
        for (let i = 0; i < respond.length; i++) {
          if (this.me[0].company_id == respond[i].company_id) {

              //console.log(respond[i], 'All admin Notifications');
              this.notifs.push(respond[i]);
              this.updateNotifs.push(respond[i]);
              this.notifsCounter =  this.notifs.length;
              console.log(this.notifsCounter);
              const element = this.notifs[i];
              //console.log("Counter = ",  this.notifsCounter );

              // this.not[i] = this.notifs[i];
              // //console.log(this.me[0].company_id, element.company_id, 'Mind me');
              // this.url = element.imagenew;
              // this.employee_number = element.employee_number;
              // this.date = element.time_stamp;
              // this.id = element.id;
            }
          }
      });
      this.notifsCounted = this.notifsCounter;
      this.loading = false;


  }


}
