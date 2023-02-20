import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent,ngxLoadingAnimationTypes } from 'ngx-loading';
import { UsersService } from 'src/app/services/users.service';


type AOA = any[][];

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  providers: [MessageService],
})
export class PreviewComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  matched: boolean = false;
  submitted = false; //boolean
  errorMessage: String = ' '; // declaring a string data type assigning to the error message
  isSuccessful!: boolean;
  isSignUpFailed!: boolean;
  max = 4;
  min = 1;
  num!:number;
  imageUrl : any;
  me: any;
  decodedToken: any;
  myEmpNum: any;
  mytype: any;

  constructor(
    private authserv: AuthService,
    private router: Router,
    private messageService: MessageService,
    private userServ: UsersService,
    private primengConfig: PrimeNGConfig
  ) {  this.decodedToken = this.authserv.decodeToken(
    localStorage.getItem('access_token')
  );
  this.myEmpNum = this.decodedToken.employee_number;
  this.myProf(this.myEmpNum);}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('data:', this.data);
      this.data.map((res) => {
        if (res[0] === 'no') {
          console.log(res[0]);
          this.showErrorDoc();
        } else {
          console.log(res[0]);
        }
      });
    };
    reader.readAsBinaryString(target.files[0]);
    this.showPrev();
  }

  // export(): void {
  //   /* generate worksheet */
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);
  // }

  validate() {

    for (let i = 1; i < this.data.length; i++) {
      if (
        this.data[0][0] == 'No' &&
        this.data[0][1] == 'Name' &&
        this.data[0][2] == 'Surname' &&
        this.data[0][3] == 'Employee number' &&
        this.data[0][4] == 'Email' &&
        this.data[0][5] == 'Phone number' &&
        this.data[0][6] == 'Employee Stat' &&
        this.data[0][7] == 'Account Stat'
      ) {
        this.matched = true;
        this.submitted = true;
        this.showVerified();
      }
      if (
        this.data[0][0] == " " ||
        this.data[0][1] == " " ||
        this.data[0][2] == " " ||
        this.data[0][3] == " " ||
        this.data[0][4] == " " ||
        this.data[0][5] == " " ||
        this.data[0][6] == " " ||
        this.data[0][7] == " "
      )  {
        this.matched = false;
        this.submitted = false;
      }

      // console.log(this.data[i])
      if (!this.matched) {
        // this.loading = false;
        this.showErrorDoc();
        return;
      }
    }

  }

  onSubmit(): void {
    for (let i = 1; i < this.data.length; i++) {
      if (
        this.data[0][0] == 'No' &&
        this.data[0][1] == 'Name' &&
        this.data[0][2] == 'Surname' &&
        this.data[0][3] == 'Employee number' &&
        this.data[0][4] == 'Email' &&
        this.data[0][5] == 'Phone number' &&
        this.data[0][6] == 'Employee Stat' &&
        this.data[0][7] == 'Account Stat'
      ) {
        this.matched = true;
        this.submitted = true;
      }

      console.log(i + 'I am a test');
      // console.log(this.data[i])
      if (!this.matched) {
        // this.loading = false;
        this.showErrorDoc();
        return   this.clear();
      }

      this.num = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
     switch (this.num) {
       case 1:
        this.imageUrl = '';
         break;
         case 2:
          this.imageUrl = '';
          break;
          case 3:
            this.imageUrl = '';
            break;
            case 4:
              this.imageUrl = '';
              break;
       default: 1
         break;
     }
      let user = {
        image:this.imageUrl,
        employee_number: this.data[i][3],
        name: this.data[i][1],
        surname: this.data[i][2],
        job_title: this.data[i][8],
        email: this.data[i][4],
        phone_number: this.data[i][5],
        employement_status: this.data[i][6],
        account_status: true,
        password: 'Password1',
        user_type: 2,
        looking:false,
        company_id: this.me[0].company_id,
      };
      // this.loading = true;

      this.authserv.register(user).subscribe({
        next: (data) => {

          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.submitted = false;
          // this.loading = false;
          console.log(user);
          this.router.navigate(['/private/users']);
        },
        error: (err) => {
          // this.loading = true;
          this.errorMessage = err.error.error;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.error ,
          });

          // this.loading = false;
        },
      });


    }
    this.showSuccess();
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'The none Existing users were updated',
    });
  }

  showVerified() {
    this.messageService.add({
      severity: 'success',
      summary: 'Verified',
      detail:
        'This verifies that the document you uploaded is part of our template',
    });
  }
  showPrev() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'The Preview of your CSV document has been loaded ...',
    });
  }

  showCancel() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'You can re upload the document or Verify the source info',
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'You are about to upload a new Document',
    });
  }

  showErrorDoc() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'The Document ',
    });
  }

  onConfirm() {
    this.messageService.clear('c');
    this.onSubmit();
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Is the info above correct?',
      detail: 'Confirm to proceed',
    });
    console.log('we are here!!!');
    this.validate();
  }
}
