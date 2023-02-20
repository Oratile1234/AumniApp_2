import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Alumni } from 'src/app/interfaces/alumni';
import { LoaderANDToastersService } from '../../../services/loader-andtoasters.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  providers: [MessageService],
  styleUrls: ['./alumni.component.scss']
})

export class AlumniComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  // Initials profile picture logic
  public photoUrl = '';
  user:any;
  public showInitials = true;
  public bgColor:string = '';
  public divColor:string = '';
  public initials: string = '';
  public circleColor: string[] = ['#367E18','#790252','#645CAA','#AF0171','#645CAA','#A460ED',
                                  '#42855B','#FF4A4A','#A62349','#FFB200','#781C68','#D61C4E','#FF87B2'];
  number:any = 0;
  users: any = {};
  searchTerm: string = '';
  alumnis: Alumni[] = [];
  Allalumnis: Alumni[] = [];
  details: any = {};
  p: number = 1;
  total: number = 0;
  display: any = 6;
  projects: any = {};
  empId: any;
  mySkills: any;
  myExpertise: any;
  val: number[] = [];
  num: any = 4;
  Summaries: any;
  decodedToken: any;
  Expertise: any;
  id: any;
  Skills: any
  myProjects: any;
  beer: any;

  constructor(private userServ: UsersService,
    private portfolio: PorfolioService,
    private auth: AuthService) {

    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    // this.userServ.getById(this.decodedToken.employee_number).subscribe((data: any) => {
    //   this.users = data;
    // })
  }

  form: FormGroup = new FormGroup({
    status: new FormControl(''),
    opt: new FormControl('')
  });

  ngOnInit(): void {
    // this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'));

    this.form.value.opt = 0
    this.FilterButton(this.form.value.opt);
    this.loading = true;



    this.userServ.getUsers().subscribe((respond: any) => {
      this.loading = false;
      this.users = respond;
      console.log(this.users);

      this.circleColor.length = this.users.length

      for (let index = 0; index < respond.length; index++) {

        if(this.users[index].image){
          this.showInitials = false
          this.photoUrl = this.users[index].image
        }else{
          this.showInitials = true
        }
      }

      this.alumnis = this.users;
      this.Allalumnis = this.alumnis;
      this.loading = false;
      console.log(this.users);
    })


    console.log(this.myExpertise);
    console.log(this.mySkills);


    this.fetchInfo();

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

  search(value: string): void {
    this.alumnis = this.Allalumnis.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

  FilterButton(form: any) {
    // console.log(this.form.value.opt)

    if (this.form.value.opt == "2") {
      this.userServ.getLooking().subscribe((data: any) => {
        this.users = data;
      });
    }
    if (this.form.value.opt == "1") {
      this.userServ.getUnemployed().subscribe((data: any) => {
        this.users = data;
        console.log(this.users)
      });
    }
    if (this.form.value.opt == "0") {
      this.userServ.getUsers().subscribe((respond: any) => {
        this.users = respond;
        this.alumnis = this.users;
        this.Allalumnis = this.alumnis;
        console.log(this.alumnis);
      });
    }
  }

  //pagination
  pagination() {
    for (let index = this.p; index < this.users.length; index++) {
      const element = this.users[index];
      this.userServ.getUsers()
        .subscribe((response: any) => {
          this.loading = false;
          this.users[index] = response;
          this.total = response.total;
        });
    }

  }
  pageChangeEvent(event: number) {
    this.loading = false;
    this.p = event;
    this.pagination();
  }

  getUserInfo(index: any) {
    this.details = this.users[index]

    console.log(this.users[index].employee_number, "details")
    this.divColor = this.color(this.users[index].name, index);

      if(this.users.image){
        this.showInitials = false
        this.photoUrl = this.users[index].image
      }else{
        this.showInitials = true
      }



    this.portfolio.getSummary(this.users[index].employee_number).subscribe((response: any) => {
      this.Summaries = response;
      console.log(response[0].summary)
      if (this.Summaries != '') {
        this.number= 1
      } else this.number = 2;
      
    });

    this.portfolio.projects(this.users[index].employee_number).subscribe((response: any) => {
      this.projects = response;
      this.id = response.id
      var tot = response.length;

      for (let i = 0; i < tot; i++) {
        const element = this.projects[i];
        console.log(this.projects[i], "........... my Projects Title");
        console.log(this.projects[i].description, "............. my Projects Description");
      }
    })

    this.portfolio.getMySkills(this.users[index].employee_number).subscribe((response: any) => {
      this.mySkills = response;
      this.id = response.id
      var tot = response.length;

      for (let i = 0; i < tot; i++) {
        const element = this.mySkills[i];
        console.log(element.skill_description, "My Skills");
        this.val[i] = element.ratings
      }

   
    });

    this.portfolio.getMyExpertise(this.users[index].employee_number).subscribe((response: any) => {
      this.myExpertise = response;
      this.id = response.id
      var tot = response.length;

      for (let i = 0; i < tot; i++) {
        const element = this.myExpertise[i];
        console.log(element, "My Expertise see me");
      }
      if (this.myExpertise != '') {
        this.number = 1;
      }else this.number = 2;
    });

  console.log(index + 1, "Current index");
  this.beer = index ;

  }


  public captureScreen() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data!, {
      useCORS: true,
      // foreignObjectRendering: true,
      allowTaint: true
    }).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("Portfolio.pdf"); // Generated PDF
    });
  }

  fetchInfo() {
    this.portfolio.getMySkills(this.users.employee_number).subscribe((response: any) => {
      this.mySkills = response;
      console.log(this.mySkills, "My Skills");

    });
    this.portfolio.getMyExpertise(this.users.id).subscribe((response: any) => {
      this.myExpertise = response;
      console.log(this.myExpertise, "My Expertise");

    });
  }

  getUserExpertise(index: any) {
    this.details = this.myExpertise[index];
  }
  getUserSkills(index: any) {
    this.details = this.mySkills[index];
  }
  getUserSummary(index: any) {
    this.details = this.Summaries[index];
  }
  getUserProjects(index: any) {
    this.details = this.projects[index];
  }
}
