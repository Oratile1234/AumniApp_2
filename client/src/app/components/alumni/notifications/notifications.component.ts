import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShareRegistrationDataService } from "../../../services/share-registration-data.service";
import { UsersService } from "../../../services/users.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  answer: any;
  image: any;
  file: any;
  formData = new FormData
  decodedToken: any;
  userNotifs: any[] = [];
  message: any = "pending";

  constructor(private shareService: ShareRegistrationDataService, private userServ: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserNotifs();
  }


  
  getUserNotifs(){
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    console.log(this.decodedToken.employee_number);
    
    this.userServ.getUserNotifs(this.decodedToken.employee_number).subscribe((responses: any) => {
      this.userNotifs = responses;
      console.log(this.userNotifs);

      for(let i=0;i<this.userNotifs.length;i++){
          if (this.userNotifs[i].response == true) {
            this.message = "accepted";
          }else if (this.userNotifs[i].response == false) {
            this.message = "denied";
          }else{
            this.message = "pending";
          }
      }

      })
    }


}
