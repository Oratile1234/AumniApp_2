import { Component, OnInit } from '@angular/core';
import { ShareRegistrationDataService } from 'src/app/services/share-registration-data.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {

  adminName!: string;
  admiEmpNum!: string;
  adimEmail!: string;
  adminPassword!: string;

  forms:FormGroup = new FormGroup({
    admin_name: new FormControl(''),
    employee_no: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private router: Router ,private shareService: ShareRegistrationDataService) { }

  ngOnInit(): void {
    this.shareService.sharedMessage10.subscribe(adminName => this.adminName = adminName)
    this.shareService.sharedMessage20.subscribe(admiEmpNum => this.admiEmpNum = admiEmpNum)
    this.shareService.sharedMessage30.subscribe(adimEmail => this.adimEmail = adimEmail)
    this.shareService.sharedMessage40.subscribe(adminPassword => this.adminPassword = adminPassword)
   
    this.forms = this.formBuilder.group({
      admin_name: ['', Validators.required],
      employee_no: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      email: ['', Validators.required],
    }); 
  }


  submitted = false;


  get f(): { [key: string]: AbstractControl } {
    return this.forms.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    let data = {
      adminname: this.forms.value.admin_name,
      employeeno: this.forms.value.employee_no,
      password: this.forms.value.password,
      email: this.forms.value.email
    };
    console.log(data);

    if (this.forms.invalid) {
      return;
    }
    console.log(JSON.stringify(this.forms.value, null, 2));

    if (!this.forms.invalid) {
      this.router.navigate(['/auth/step3']);
    }
    console.log(this.submitted);
  }

  onReset():void{
    this.submitted = false;
    this.forms.reset();

  }
  newMessage() {
    this.shareService.nextAdminName(this.forms.value.admin_name)
    this.shareService.nextAdminEmail(this.forms.value.email)
    this.shareService.nextAdminEmpNum(this.forms.value.employee_no)
    this.shareService.nextPassword(this.forms.value.password)
  }

}
