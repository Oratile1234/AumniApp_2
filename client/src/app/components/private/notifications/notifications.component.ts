import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../../services/users.service';
import { CompanyService } from 'src/app/services/company.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { ShareRegistrationDataService } from '../../../services/share-registration-data.service';
import { DatePipe } from '@angular/common';
import { response } from 'express';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [MessageService],
})
export class NotificationsComponent implements OnInit {
  not: any[] = [];
  notifs: any[] = [];
  users: any;
  alumnis: any[] = [];
  p: number = 1;
  total: number = 0;
  BasicShow: boolean = false;
  file: any;
  formData = new FormData();
  decodedToken: any;
  url: any;
  info: any = {};
  index!: any;
  details: any;
  employee_number: any;
  now: Date = new Date();
  deletedID: any;

  id: any;
  user_id:any;
  datePipeString: string = '';
  date: any;
  me: any;
  myEmpNum: any;
  mytype:any;
  acceptNotif:boolean = false;
  declineNotif:boolean = false;

  // Initials profile picture logic
  public photoUrl = '';
  // users:any;
  public showInitials = true;
  public initials: string = '';
  public circleColor: string = '';
  firstname: string = '';
  lastname: string = '';
  public colors = ['#EB7181','#468547','#FFD558','#3670B2','#6b5b95','#feb236',
                    '#d64161','#ff7b25','#FFD558','#468547','#3670B2'];

  constructor(
    private userService: UsersService,
    private auth: AuthService,
    private datePipe: DatePipe,
    private shareService: ShareRegistrationDataService,
    private companyService: CompanyService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {
    this.decodedToken = this.auth.decodeToken(
      localStorage.getItem('access_token')
    );
    this.myEmpNum = this.decodedToken.employee_number;
    console.log(this.myEmpNum);
    
    this.myProf(this.myEmpNum);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
 
    this.getAllUsers();
    if(this.acceptNotif = true){
      // this.acceptUserNotifs();
      this.acceptNotif = false;
    }

    if(this.declineNotif = true){
      // this.declineNotifs();
      this.declineNotif = false;
    }

    this.userService.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.users = data;
      this.firstname = this.users[0].name[0].toUpperCase()
      this.lastname = this.users[0].surname[0].toUpperCase()
      
      if(this.users[0].image){
        this.showInitials = false
        this.photoUrl = this.users[0].image
      }else{
        this.showInitials = true
      }
  
      const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
      this.circleColor = this.colors[randomIndex];
  
    });
  
  
  }

  showDialog(index: any) {
    this.info = this.notifs[index];
    this.BasicShow = true;
  }

  Approve() {
    console.log(this.url);
    console.log(this.id,"I am the ID");
    this.userService
      .updateProfile(this.url, this.id)
      .subscribe((response: any) => {
        // location.reload();
      
      });
    this.deletedID = this.id;
    this.BasicShow = false;
    this.acceptNotif = true;
    this.showSuccessRequest()
    // deleteNotifs();
  }

  deleteNotifs(user_id: any) {
    this.companyService.deleteNotifs(user_id, true).subscribe((response: any) => {
      console.log(response, "I am delete function", user_id);
      location.reload();
    });
  }

  Decline() {
   console.log(this.user_id);
   
    this.companyService
    // .deleteNotifs(this.employee_number, true)
    // .subscribe((response: any) => {
    //   console.log(response.message, "I am delete function");
    //   location.reload();
    // });
    this.deletedID = this.user_id;
    this.BasicShow = false;
    this.declineNotif = false;
    this.showInfoRequest()

  }

  declineNotifs(text:any){
    const body = text;
    
    this.userService.declineNotifs(this.myEmpNum,body).subscribe((respond:any) => {
      console.log(respond.message);
     
    })
  }

  acceptUserNotifs(text:any){
    const user_id = this.decodedToken.employee_number;
    const body = text ;
    this.userService.acceptUserNotifs(user_id,body).subscribe((response: any) => {
      console.log(response.message);
    })
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((respond: any) => {
      this.users = respond;
      // //console.log( this.users );
    });
  }
  
  myProf(EmpNum: any) {
    this.userService.getById(EmpNum).subscribe((response: any) => {
      this.me = response;
      this.mytype = this.me[0].user_type
  
        this.notifications()
    });
  }

  getAllAlumnis() {
    this.userService.getAlumni().subscribe((response: any) => {
      this.alumnis = response;
    });
  }

  //pagination
  pagination() {
    this.userService.getUsersP(this.p).subscribe((response: any) => {
      this.users = response.data;
      this.total = response.total;
    });
  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.pagination();
  }

  notifications() {
    
    //console.log(this.mytype, 'My Notifs!!!!');

      this.companyService.getNotifs().subscribe((respond: any) => {
        for (let i = 0; i < respond.length; i++) {
          if (this.me[0].company_id == respond[i].company_id) {
          
              //console.log(respond[i], 'All admin Notifications');
              this.notifs.push(respond[i]);
              //console.log(this.notifs);
              const element = this.notifs[i];
              this.not[i] = this.notifs[i];
              // //console.log(this.me[0].company_id, element.company_id, 'Mind me');
              this.url = element.imagenew;
              this.employee_number = element.employee_number;
              this.date = element.time_stamp;
              this.id = element.id;
           
            } 
            console.log(this.notifs);
            
            
          }
      });
   

  }

  userNotifications(){
    
 
      this.companyService.getNotified().subscribe((respond: any) => {
        for (let i = 0; i < respond.length; i++) {
          // if (this.me[0].company_id == respond[i].company_id) {
          
              //console.log(respond[i], 'All user Notifications');
              this.notifs.push(respond[i]);
              //console.log(this.notifs);
              const element = this.notifs[i];
              this.not[i] = this.notifs[i];
              // //console.log(this.me[0].company_id, element.company_id, 'Mind me');
              this.url = element.imagenew;
              this.employee_number = element.employee_number;
              this.date = element.time_stamp;
              this.id = element.id;
            // } 
          }
        });
  }

  showInfoRequest() {
    this.messageService.add({
      severity: 'info',
      summary: 'info',
      detail: 'Profile picture request declined',
    });
  }

  showSuccessRequest() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile picture request approved',
    });
  }

  showSuccess(message: any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

}
