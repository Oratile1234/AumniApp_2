import { identifierName } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  form: FormGroup = new FormGroup({
    employee: new FormControl(''),
    password: new FormControl(''),
  });

  currentUser = {};
  userToken: any = {};
  submitted = false; //bpplean
  errorMessage: String = ' '; // declaring a string data type assigning to the error message
  decodedToken: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authserv: AuthService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    // this.loginForm = this.fb.group({})
    this.primengConfig.ripple = true;
    this.submitted = false;
    this.form = this.formBuilder.group({
      employee: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
      ],
      password: [
        '',
        [
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

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    let user = {
      employee_number: this.form.value.employee,
      password: this.form.value.password,
    };


    this.authserv.login(user).subscribe({
      next: (data) => {

        // this.userToken = data
        // localStorage.setItem('access_token', this.userToken.token)

        this.userToken = data
        console.log(this.userToken.arrData[0].user_type);

        localStorage.setItem('access_token', this.userToken.token)
        this.decodedToken = this.authserv.decodeToken(localStorage.getItem('access_token'))
        // this.loading = false;

        if (this.form.value.password != "Password1") {

          if (this.userToken.arrData[0].user_type == 1) {
            this.loading = false;
            this.router.navigate(['/private']);
          } else if (this.userToken.arrData[0].user_type == 2) {
            this.loading = false;
            this.router.navigate(['/alumni/home']);
          }
        } else {
          this.loading = false;
          this.router.navigate(['public/setpassword']);
        }

      },
      error: (err) => {
        // this.submitted = true;
        this.loading = false;
        this.errorMessage = err.error.error;

        if (err.error.error == undefined || err.error.error == "") {
          this.errorMessage = "Please Check with our HELP_LINE, If the Server is not Down";
        }
        console.log(this.errorMessage);
        return this.showErrorDoc(this.errorMessage);
      },
    });


  }

  showErrorDoc(error: any) {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  }
}
