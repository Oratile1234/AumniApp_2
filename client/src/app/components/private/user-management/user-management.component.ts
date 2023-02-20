import { Component, OnInit, ViewChild } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent,ngxLoadingAnimationTypes } from 'ngx-loading';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


interface Alumni {
  name: string;
  phone_number: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [MessageService],
})
export class UserManagementComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  // Initials profile picture logic
  public photoUrl = '';
  user:any;

  public showInitials = false;
  public showImage = false;
  public initials: string = '';
  firstname: string = '';
  lastname: string = '';
  alp = ['A','B',"C","D","F"];
  // public decodedToken: any;
  public colors = ['#3670B2'];

  public bgColor: string = '';
  public circleColor = ['#EB7181','#468547','#FFD558','#3670B2','#6b5b95','#feb236',
                    '#d64161','#ff7b25','#FFD558','#468547','#3670B2'];

  userTerm: string = '';
  users: any;
  status: any;
  stat:any;
  p: number = 1;
  total: number = 0;
  newStatus:boolean = true;
  allUsers:any;

  alumnis: Alumni[] = [];
  Allalumnis: Alumni[] = [];
  searchTerm = '';
  decodedToken: any;

  constructor(private userserv: UsersService,
    private auth: AuthService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute
    )
    {this.form.value.opt = 1}

  form: FormGroup = new FormGroup({
    status: new FormControl(''),
    opt : new FormControl('')
  });

  ngOnInit(): void {


    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    this.loading = true;
    this.form.value.opt = 1
    this.FilterButton(this.form.value.opt);
    // this.pagination();
    // this.getAllUsers()
  }

  getAllUsers(){
    this.userserv.getUsers().subscribe((data) => {
      this.allUsers = data

      for(let i=0; i<this.allUsers.length; i++){

        if(this.allUsers.image !== ''){
          this.showImage = true
          this.showInitials = false
        }else{
          this.showInitials = true
          this.showImage = false
        }
      }

    })
  }

  statusUpdate(status:any,index:any){

   const id = this.users[index].employee_number
   const body = {
    account_status:status
   }
   this.userserv.updateStatus(body,id).subscribe(
    {
      next: (res: any)=>{
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/private/users'], { relativeTo: this.route });
      }
    }
   )
  }

  FilterButton(form:any){

    if (this.form.value.opt == "3") {
      this.userserv.getEmployed().subscribe((data: any) => {
        this.users = data;
        // this.circleColor.length = this.users.length
        // console.log(this.users.length);

        for(let i=0; i<this.users.length; i++){
          this.firstname = this.users[i].name[0].toUpperCase()
          this.lastname = this.users[i].surname[0].toUpperCase()

          if(this.users[i].image){
            this.showInitials = false
            this.photoUrl = this.users[i].image
          }else{
            this.showInitials = true
            // this.color(this.users[i].name[0])
          }
        }

        // for(let i=0; i<this.users.length; i++){
        //   this.firstname = this.users[i].name[0].toUpperCase()
        //   this.lastname = this.users[i].surname[0].toUpperCase()

        //   if(this.users[i].image){
        //     this.showInitials = false
        //     this.photoUrl = this.users[i].image
        //   }else{
        //     this.showInitials = true
        //   }
        // }


        });
      }
      if (this.form.value.opt == "2") {
        this.userserv.getUnemployed().subscribe((data: any) => {
        this.users = data;

        for(let i=0; i<this.users.length; i++){
          this.firstname = this.users[i].name[0].toUpperCase()
          this.lastname = this.users[i].surname[0].toUpperCase()

          if(this.users[i].image){
            this.showInitials = false
            this.photoUrl = this.users[i].image
          }else{
            this.showInitials = true
            // this.color(this.users[i].name[0])
          }
        }


        });
      }
      if (this.form.value.opt == "1") {
        this.userserv.getUsers().subscribe((respond: any) => {
          this.users = respond;

          for(let i=0; i<this.users.length; i++){
            this.firstname = this.users[i].name[0].toUpperCase()
            this.lastname = this.users[i].surname[0].toUpperCase()

            if(this.users[i].image){
              this.showInitials = false
              this.photoUrl = this.users[i].image
            }else{
              this.showInitials = true
            }
          }
          const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
          this.circleColor[0] = this.colors[randomIndex];
this.loading = false
          });
      // });
    }

  }

  color(fname:string, index:any ){

    fname = fname[0].toUpperCase();
    console.log(fname, index)

      if(fname.match(/[A-C]/i)){
        this.circleColor[0]
        this.bgColor = this.circleColor[0]
      }else if(fname.match(/[D-F]/i)){
        this.circleColor[index]
        this.bgColor = this.circleColor[1]
      }else if(fname.match(/[G-I]/i)){
        this.circleColor[2]
        this.bgColor = this.circleColor[2]
      }else if(fname.match(/[J-L]/i)){
        this.circleColor[3]
        this.bgColor = this.circleColor[3]
      }else if(fname.match(/[M-O]/i)){
        this.circleColor[4]
        this.bgColor = this.circleColor[4]
      }else if(fname.match(/[P-R]/i)){
        this.circleColor[5]
        this.bgColor = this.circleColor[5]
      }else if(fname.match(/[S-U]/i)){
        this.circleColor[6]
        this.bgColor = this.circleColor[6]
      }else if(fname.match(/[V-X]/i)){
        this.circleColor[7]
        this.bgColor = this.circleColor[7]
      }else if(fname.match(/[YZ]/i)){
        this.circleColor[8]
        this.bgColor = this.circleColor[8]
      }else if(index > this.circleColor.length){
        this.circleColor[-2]
      }else{
        this.circleColor[-1]
        this.bgColor = this.circleColor[-1]
      }
      return this.bgColor
  }

  pagination() {
    this.userserv.getUsers()
      .subscribe((response: any) => {
        this.loading = false;
        this.users = response;
        this.total = response.total;

        for(let i=0; i<this.users.length; i++){
          this.firstname = this.users[i].name[0].toUpperCase()
          this.lastname = this.users[i].surname[0].toUpperCase()
          for(let j=0; j<this.colors.length; j++){
            this.circleColor[j] = this.colors[j];
          }
          if(this.users[i].image){
            this.showInitials = false
            this.photoUrl = this.users[i].image
          }else{
            this.showInitials = true
            // this.color(this.users[i].name[0])
          }

        }





        // for(let i=0; i<this.users.length; i++){
        //   this.firstname = this.users[i].name[0].toUpperCase()
        //   this.lastname = this.users[i].surname[0].toUpperCase()

        //   if(this.users[i].image){
        //     this.showInitials = false
        //     this.photoUrl = this.users[i].image
        //   }else{
        //     this.showInitials = true
        //     // this.color(this.users[i].name[0])
        //   }

        // }
      });
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.pagination();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed'

    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'You are have deactived the user',
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have activated the user',
    });
  }

  search(value: string): void {
    this.alumnis = this.Allalumnis.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

}
