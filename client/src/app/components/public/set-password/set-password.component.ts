import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { pass } from "../../../interfaces/auth";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirm: new FormControl(''),
  });
  submitted = false;
  employee_number:any;
  decodedToken:any

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authserv: AuthService,) { }

  ngOnInit(): void {

    this.decodedToken = this.authserv.decodeToken(localStorage.getItem('access_token'))
    this.submitted = false;
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)],],
      confirm: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
      ],
      ],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted=true
    let pass = {
      password: this.form.value.password,
      confirm: this.form.value.confirm,
    }
    if (this.form.value.password === this.form.value.confirm) {

      this.authserv.resetNew(pass,this.decodedToken.employee_number).subscribe((data:any) => {
        // console.log(data.password,"1 data");
        // console.log(pass.password,"1 user");
        data.password = pass.password
        // console.log(data.password,"2 data");
        // console.log(pass.password,"2 user");
        // this.loading = false;
        this.router.navigate(['/alumni/home']);

      })
    }else{
      console.error("Password don't match");

    }
  }
}
