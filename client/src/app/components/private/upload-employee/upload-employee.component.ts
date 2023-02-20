import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent,ngxLoadingAnimationTypes } from 'ngx-loading';
import { UsersService } from 'src/app/services/users.service';

// import { PreviewComponent } from "../preview/preview.component";

@Component({
  selector: 'app-upload-employee',
  templateUrl: './upload-employee.component.html',
  styleUrls: ['./upload-employee.component.scss'],
  providers: [MessageService],
})

export class UploadEmployeeComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  
  form: FormGroup = new FormGroup({
    employee_no: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    job_title: new FormControl(''),
    employement_status: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl('')
  });

  currentUser = {};
  userToken: any = {};
  submitted = false; //bpplean
  errorMessage: String = ' '; // declaring a string data type assigning to the error message
  isSuccessful!: boolean ;
  isSignUpFailed!: boolean ;
  status : boolean = true;
  decodedToken: any;
  myEmpNum: any;
  me: any;
  mytype: any;

  constructor(
    private formBuilder: FormBuilder,
    private authserv: AuthService,
    private userServ: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.decodedToken = this.authserv.decodeToken(
      localStorage.getItem('access_token')
    );
    this.myEmpNum = this.decodedToken.employee_number;
    this.myProf(this.myEmpNum);
  }

  ngOnInit(): void {
    this.loading = true;
    this.form = this.formBuilder.group({
      employee_no: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
      ],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      job_title: [],
      phone_number: [],
      employement_status: []
    });
    this.loading = false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  myProf(EmpNum: any) {
    this.userServ.getById(EmpNum).subscribe((response: any) => {
      this.me = response;
      this.mytype = this.me[0].user_type
  
      // this.updateNotifsCounter();
      //console.log(this.me[0].user_type, 'My UserType!!!!');
      //console.log(this.me[0].company_id, 'My Company ID!!!!');
    });
  }

  onSubmit(): void {
    this.submitted = true;


    if (this.form.invalid) {
      return;
    }

    let user = {
      employee_number: this.form.value.employee_no,
      name: this.form.value.name,
      surname: this.form.value.surname,
      job_title: this.form.value.job_title,
      email: this.form.value.email,
      phone_number: this.form.value.phone_number,
      employement_status: this.form.value.employement_status,
      password: "Password1",
      user_type: 2,
      account_status: this.status,
      company_id: this.me[0].company_id,
      looking:false,
      // image:"https://res.cloudinary.com/jaykimsly/image/upload/v1665497122/user_profile/6f1fca4f4980a5f08cd45582487ac7f7_hk5ov8.gif"
      image:''

    };
    this.loading = true;
    this.authserv.register(user).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.form.reset();
        this.submitted = false;
        this.loading = false;
        console.log(data)
        this.router.navigate(['/private/users']);
      },
      error: (err) => {
        this.loading = true;
        this.errorMessage = err.error.error;
        // console.log(this.errorMessage)
        this.showErrorDoc(this.errorMessage) 
        this.loading = false; 
        
      },
    });
  }

  showErrorDoc(message:any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
