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

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {


  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authserv: AuthService,) {}

  ngOnInit(): void {

    this.submitted = false;
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(6)],],
      confirm: ['',[
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

}
