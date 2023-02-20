import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  access_token:any;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  Logout(){
    this.auth.doLogout()
    console.log('out');
    
   localStorage.clear()
  }
}
