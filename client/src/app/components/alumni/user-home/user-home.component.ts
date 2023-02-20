import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  users:any
  decodedToken:any
  imageUrl:any
  firstname:string = ''
  lastname:string = ''

  constructor(private userServ: UsersService, private auth: AuthService) { }

  ngOnInit(): void {
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    this.userServ.getById(this.decodedToken.employee_number).subscribe((data) => {
      this.users = data

      if(this.users[0].image !== ''){
        this.imageUrl = this.users[0].image
      }else{
        this.imageUrl = 'https://images.pexels.com/photos/3747142/pexels-photo-3747142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
      


      this.firstname = this.users[0].name
      this.lastname = this.users[0].surname
      console.log(this.users)
    })
  }



}
