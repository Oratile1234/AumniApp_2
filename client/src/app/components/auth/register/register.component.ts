import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
// import { Company } from '../../../modal/company';
import { ShareRegistrationDataService } from '../../../services/share-registration-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name!: string;
  email!: string;
  phone!: string;
  regnum!: string;

  form: FormGroup = new FormGroup({
    company_name: new FormControl(''),
    company_email: new FormControl(''),
    company_reg_no: new FormControl(''),
    company_number: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    firstName: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private shareService: ShareRegistrationDataService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      company_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company_email: ['', Validators.required, Validators.email],
      company_reg_no: ['', Validators.required],
      company_number: ['', Validators.required],
      firstName: ['', Validators.required],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });

    this.shareService.sharedMessage1.subscribe((name) => (this.name = name));
    this.shareService.sharedMessage2.subscribe((email) => (this.email = email));
    this.shareService.sharedMessage3.subscribe((phone) => (this.phone = phone));
    this.shareService.sharedMessage4.subscribe((regnum) => (this.regnum = regnum));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    let data = {
      companyname: this.form.value.company_name,
      companyregistrationno: this.form.value.company_reg_no,
      companyemail: this.form.value.company_email,
      companyphoneno: this.form.value.company_number,
    };
    if (this.form.invalid) {
      return ;
    }

    console.log(JSON.stringify(this.form.value, null, 2));

    if (!this.form.invalid) {
      this.newMessage()
      this.router.navigate(['/auth/step2']);
    }
    console.log(this.submitted);
  }

  newMessage() {
    this.shareService.nextName(this.form.value.company_name);
    this.shareService.nextEmail(this.form.value.company_email);
    this.shareService.nextPhoneNum(this.form.value.company_number);
    this.shareService.nextRegnum(this.form.value.company_reg_no);
  }
}
