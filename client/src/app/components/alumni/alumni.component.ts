import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss'],

})
export class AlumniComponent implements OnInit {
  notifsCounter: any;
  decodedToken: any;
  userNotifs: any;

  // Initials profile picture logic
  public photoUrl = '';
  users:any;
  public showInitials = true;
  public initials: string = '';
  public circleColor: string = '';
  public Color: string = '';
  firstname: string = '';
  lastname: string = '';
  public colors: string[] = ['#367E18','#790252','#645CAA','#AF0171','#645CAA','#A460ED',
                                  '#42855B','#FF4A4A','#A62349','#FFB200','#781C68','#D61C4E','#FF87B2'];

  constructor(private userService: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.updateNotifsCounter();

    this.userService.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.users = data;
      console.log(this.users);

      this.firstname = this.users[0].name[0].toUpperCase()
      this.lastname = this.users[0].surname[0].toUpperCase()

      if(this.users[0].image){
        this.showInitials = false
        this.photoUrl = this.users[0].image
      }else{
        this.color(this.users[0].name)
        console.log(this.circleColor)
        this.showInitials = true
      }
    });

  }

  color(fname:string){

    fname = fname[0].toUpperCase();
    console.log(fname)

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
        this.circleColor = this.circleColor[this.circleColor.length]
      }

  }



  user() {
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    this.userService.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.photoUrl = data[0].image;
      if(this.photoUrl.length === 0){
        this.showInitials = false;
        this.firstname = data[0].name[0].toUpperCase();
        this.lastname = data[0].surname[0].toUpperCase();
        console.log(this.firstname[0].toUpperCase());
        console.log(this.lastname[0].toUpperCase());
      }

      console.log(this.photoUrl);

    })
  }

  updateNotifsCounter(){
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'));
    const user_id = this.decodedToken.employee_number;
    console.log(this.decodedToken.employee_number);

    this.userService.getUserNotifs(user_id).subscribe((response) => {
      this.userNotifs = response;

      if(this.userNotifs.length == 0){
        this.notifsCounter = 0;
      }else if(this.userNotifs.length > 0){
        this.notifsCounter = this.userNotifs.length;
      }

      console.log(this.notifsCounter);
    })
  }

}
