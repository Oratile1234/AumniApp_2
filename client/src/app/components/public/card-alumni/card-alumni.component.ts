import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../../services/users.service';
import { sum } from 'cypress/types/lodash';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { MessageService } from 'primeng/api';

interface Alumni {
  name: string;
  phone_number: string;
}


@Component({
  selector: 'app-card-alumni',
  templateUrl: './card-alumni.component.html',
  styleUrls: ['./card-alumni.component.scss'],
  providers: [MessageService],
})
export class CardAlumniComponent implements OnInit {


  selectedSkills: any;
  // selectedExpertise: any;
  selectedExpertise: any;
  filterValue = '';

  // Initials profile picture logic
  public photoUrl = '';
  user:any;
  public showInitials = false;
  public showImage = false;
  public initials: string = '';
  public bgColor: string = ''
  public bgColors = ['#EB7181','#468547','#FFD558','#3670B2','#6b5b95','#feb236',
                    '#d64161','#ff7b25','#FFD558','#468547','#3670B2'];
  decodedToken: any;
  public circleColor = ['#EB7181','#468547','#FFD558','#3670B2','#6b5b95','#feb236',
                        '#d64161','#ff7b25','#FFD558','#468547','#3670B2'];

  users: any;
  details: any;
  number: number = 1;
  editProfile: boolean = false;
  val: number[] = [];

  Skills: any;
  Expertise: any;
  projects: any;
  summary: any;
  multiSelect: any;
  emplyee_num: any;
  file: any;
  formData = new FormData
  preview = '';
  notif: any = 0;
  image: any;
  user_id: any;
  rating3: any;
  val2: number = 2;
  mySkills: any;
  myExpertise: any;
  SkillsOut: any;
  now: Date = new Date();
  display: boolean = false;
  num: any = 4;
  numl: any
  myForm!: FormGroup;
  SKillArray: any = new Array();
  SKid: any;

  usersId: any;
  p: number = 1; //pagination
  total: number = 0; //pagination
  // employee_number: any;
  URL: any;
  userProfile: any;
  showProfile: boolean = false;

  searchTerm: string = '';
  alumnis: Alumni[] = [];
  Allalumnis: Alumni[] = [];
  companyServ: any;
  skills: any;

  Summaries: any;
  id: any;
  uSers: any;
  appUrl: any;
  exploreId:any;

  constructor(private userserv: UsersService,
    private auth: AuthService,
    private portfolio: PorfolioService,
    private messageService: MessageService,) {

      // this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
      // this.userserv.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      //   this.users = data;
      //   console.log(this.users);

      // })

    }

  ngOnInit(): void {

    this.appUrl = "https://whimsical-cendol-dcf7d0.netlify.app"
    this.getUsersP();



    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))

    this.portfolio.getSkills().subscribe((response: any) => {
      this.Skills = response;

      if (this.Skills != " ") {
      }
    });

    this.portfolio.getSummary(this.decodedToken.employee_number).subscribe((response: any) => {
      this.Summaries = response;
      console.log(response)
    });

    this.portfolio.projects(this.decodedToken.employee_number).subscribe((response: any) => {
      this.projects = response;
    })

    this.portfolio.getMySkills(this.decodedToken.employee_number).subscribe((response: any) => {
      this.mySkills = response;
      this.id = response.id
      var tot = response.length;


      for (let i = 0; i < tot; i++) {
        const element = this.mySkills[i];
        console.log(element.ratings, "My Skills");
        this.val[i] = element.ratings
      }

      if (this.mySkills != " ") {
        // this.number = 1;
      }
    });

    this.portfolio.getMyExpertise(this.decodedToken.employee_number).subscribe((response: any) => {
      this.myExpertise = response;
      console.log(this.myExpertise, "My Expertise");
      if (this.myExpertise != " ") {
        // this.number = 1;
      }
    });

    this.userserv.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.users = data;
    });

    // populate expertise
    this.portfolio.getExpertise().subscribe((response: any) => {
      this.Expertise = response;
      console.log(this.Expertise);
    });
  }

  getUsersP() {
    this.userserv.getUsers()
      .subscribe((response: any) => {
        this.uSers = response;
        console.log(this.uSers);

        this.total = response.total;

        for(let i=0; i<this.uSers.length; i++){

          if(this.uSers.image !== ''){
            this.showImage = true
            this.showInitials = false
          }else{
            this.showInitials = true
            this.showImage = false
          }
        }
      });
  }


  pageChangeEvent(event: number) {
    this.p = event;
    this.getUsersP();
  }

  //modal to share to display


  search(value: string): void {
    this.alumnis = this.Allalumnis.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }


  showDialog() {
    this.details = true;

  }

  hideDialog() {
    this.showProfile = false;
  }

  getUser() {
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    this.userserv.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.users = data;
      console.log(this.users);

    })
  }

  getUserInfo(index: any) {
    this.exploreId = index
    this.userProfile = this.uSers[index];
    console.log(this.uSers[index])
    this.emplyee_num = this.uSers[index].employee_number
    console.log(this.emplyee_num)
    this.showProfile = true;
    console.log(index);
    this.details = this.uSers[index]
    console.log(this.details.name);
    this.photoUrl = this.uSers[index].image

      if(this.uSers[index].image){
        this.showInitials = false
        
      }else{
        this.showInitials = true
      }



    console.log(this.uSers[index].employee_number, "details")
    this.bgColor = this.circleColor[index]
    console.log(this.uSers[index].name);
    console.log(this.bgColor);
    console.log(this.uSers);
    
    
    


    this.portfolio.getSummary(this.uSers[index].employee_number).subscribe((response: any) => {
      this.Summaries = response;
      console.log(response[0].summary)
    });

    this.portfolio.projects(this.uSers[index].employee_number).subscribe((response: any) => {
      this.projects = response;
      this.id = response.id
      var tot = response.length;

      for (let i = 0; i < tot; i++) {
        const element = this.projects[i];
        console.log(this.projects[i], "........... my Projects Title");
        console.log(this.projects[i].description, "............. my Projects Description");
      }
    })

    this.portfolio.getMySkills(this.uSers[index].employee_number).subscribe((response: any) => {
      this.mySkills = response;
      this.id = response.id
      var tot = response.length;

      for (let i = 0; i < tot; i++) {
        const element = this.mySkills[i];
        console.log(element.skill_description, "My Skills");
        this.val[i] = element.ratings
      }

      if (this.mySkills != " ") {
        // this.number = 1;
      }
    });

    this.portfolio.getMyExpertise(this.uSers[index].employee_number).subscribe((response: any) => {
      this.myExpertise = response;
      this.id = response.id
      var tot = response.length;

      for (let i = 0; i < tot; i++) {
        const element = this.myExpertise[i];
        console.log(element, "My Expertise see me");
      }
      if (this.myExpertise != " ") {
        // this.number = 1;
      }
    });

  }

  color(fname:string){

    fname = fname[0].toUpperCase();
    console.log(fname);
    

      if(fname.match(/[A-C]/i)){
        this.circleColor[0]
        this.bgColor = this.circleColor[0]
      }else if(fname.match(/[D-F]/i)){
        this.circleColor[1]
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
      }else if(this.circleColor.length - 1){
        this.circleColor[-2]
      }else{
        this.circleColor[-1]
        this.bgColor = this.circleColor[-1]
      }
      return this.bgColor
  }



  call(){
    this.showSuccess("You have successfully copied the link");
  }


  getUserExpertise(index: any) {
    this.details = this.myExpertise[index];
    console.log( this.details );

  }

  getUserSkills(index: any) {
    this.details = this.mySkills[index];
    console.log(this.details)
  }
  getUserSummary(index: any) {
    this.details = this.Summaries[index];
    console.log( this.details );
  }
  getUserProjects(index: any) {
    this.details = this.projects[index];
    console.log( this.details );
  }


  showSuccess(message: any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }


  /* To copy any Text */
copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

