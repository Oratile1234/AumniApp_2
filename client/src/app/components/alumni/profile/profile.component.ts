import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { skill } from "../../../interfaces/portfolio";
import { response } from 'express';
import { any, resolve } from 'cypress/types/bluebird';
// import {MultiSelectFilterOptions} from 'primeng/multiselect';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ShareRegistrationDataService } from '../../../services/share-registration-data.service';
import { MessageService } from 'primeng/api';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from 'src/app/services/auth.service';
import { sum } from 'cypress/types/lodash';
import { environment } from "../../../../environments/environment";
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { contains } from 'jquery';
import { CompanyService } from 'src/app/services/company.service';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  //drop down variables
  selectedSkills: any;
  // selectedExpertise: any;
  selectedExpertise: any;
  filterValue = '';
  public form: FormGroup;

  // Initials profile picture logic
  public photoUrl = '';
  public showInitials = true;
  public initials: string = '';
  public circleColor: string = '';
  firstname: string = '';
  lastname: string = '';
  public colors: string[] = ['#367E18', '#790252', '#645CAA', '#AF0171', '#645CAA', '#A460ED',
    '#42855B', '#FF4A4A', '#A62349', '#FFB200', '#781C68', '#D61C4E', '#FF87B2'];

  users: any;
  details: any;
  number: number = 1;
  editProfile: boolean = false;
  Skills: any;
  Expertise: any;
  projects: any;
  Summaries: any;
  multiSelect: any;
  emplyee_num: any;
  file: any;
  formData = new FormData
  preview = '';
  notif: any = 0;
  test: any[] = [];
  image: any;
  user_id: any;
  decodedToken: any;
  rating: any = 0;
  mySkills: any;
  rating3: any;
  myCompId: any;
  id: any;
  val2: number = 2;
  val: number[] = [];
  myExpertise: any;
  SkillsOut: any;
  now: Date = new Date();
  display: boolean = false;
  num: any = 4;
  numl: any
  myForm!: FormGroup;
  SKillArray: any = new Array();
  SKid: any;
  cards: any[] = ["Hello"];
  counter = 1;
  text = "Hello";
  myId: any;
  appUrl: any;
  errorMessage: any;
  row: any;

  constructor(
    private shareService: ShareRegistrationDataService,
    private auth: AuthService,
    private messageService: MessageService,
    private userServ: UsersService,
    private companyService: CompanyService,
    private portfolio: PorfolioService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.rating3 = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })


    this.form = new FormGroup({
      rating: new FormControl,
      description: new FormControl,
      skillDescription: new FormControl
    })


    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    this.userServ.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.users = data;
    })
    this.shareService.sharedMessageImage.subscribe((image) => (this.file = image));


  }


  ngOnInit(): void {

    this.appUrl = "https://whimsical-cendol-dcf7d0.netlify.app"
    this.myForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      summary: new FormControl(''),
      skillDescription: new FormControl('')
    });
    console.log(this.number);

    this.portfolio.getSkills().subscribe((response: any) => {
      this.Skills = response;

      if (this.Skills != " ") {
      }
    });

    this.portfolio.getSummary(this.decodedToken.employee_number).subscribe((response: any) => {
      this.Summaries = response;
      //console.log(this.Summaries,"summary is me!!!")
    });

    this.portfolio.projects(this.decodedToken.employee_number).subscribe((response: any) => {
      this.projects = response;
      //console.log(this.projects,"projectys is me!!!")
    })

    this.portfolio.getMySkills(this.decodedToken.employee_number).subscribe((response: any) => {
      this.mySkills = response;
      this.id = response.id
      var tot = response.length;


      for (let i = 0; i < tot; i++) {
        const element = this.mySkills[i];
        console.log(element, "My Skills");
        this.val[i] = element.ratings
      }

      if (this.Skills.length < 3) {
        this.row = this.Skills.length;
      }

      if (this.mySkills != " ") {
        // this.number = 1;
      }
    });

    this.portfolio.getMyExpertise(this.decodedToken.employee_number).subscribe((response: any) => {
      this.myExpertise = response;
      // console.log(this.myExpertise,"My Expertise");
      if (this.myExpertise != " ") {
        // this.number = 1;
      }
    });

    this.userServ.getById(this.decodedToken.employee_number).subscribe((data: any) => {
      this.users = data;
      console.log(this.users);

      this.myCompId = this.users[0].company_id
      // console.log(this.myCompId, "My company ID")
      this.firstname = this.users[0].name[0].toUpperCase()
      this.lastname = this.users[0].surname[0].toUpperCase()

      if (this.users[0].image) {
        this.showInitials = false
        this.photoUrl = this.users[0].image
      } else {
        this.showInitials = true
        this.color(this.users[0].name);
        console.log(this.circleColor);
      }

    });

    // populate expertise
    this.portfolio.getExpertise().subscribe((response: any) => {
      this.Expertise = response;
      //console.log(this.Expertise);
    });

  }

  updateCompanyID(employee_no: any) {
    this.companyService.addCompanyID(this.decodedToken.employee_number, true).subscribe((data: any) => {
      console.log(data.message);
    })
  }

  color(fname: string) {

    fname = fname[0].toUpperCase();
    console.log(fname)

    if (fname.match(/[A-C]/i)) {
      this.circleColor = this.colors[0]
    } else if (fname.match(/[D-F]/i)) {
      this.circleColor = this.colors[1]
    } else if (fname.match(/[G-I]/i)) {
      this.circleColor = this.colors[2]
    } else if (fname.match(/[J-L]/i)) {
      this.circleColor = this.colors[3]
    } else if (fname.match(/[M-O]/i)) {
      this.circleColor = this.colors[4]
    } else if (fname.match(/[P-R]/i)) {
      this.circleColor = this.colors[5]
    } else if (fname.match(/[S-U]/i)) {
      this.circleColor = this.colors[6]
    } else if (fname.match(/[V-X]/i)) {
      this.circleColor = this.colors[7]
    } else if (fname.match(/[YZ]/i)) {
      this.circleColor = this.colors[8]
    } else {
      this.circleColor = this.circleColor[this.circleColor.length]
    }

  }

  onSubmit() {
    this.addExpertise();
    this.addSkills();
    this.addProject();
    this.addSummary();

    this.showSuccess('You have successfully updated your Portfolio')
    console.log(this.Skills);
    console.log(this.number);
    this.SkillsOut = this.selectedSkills;
    console.log(this.now.toLocaleString("af-ZA"));
    this.portfolioComplete();
    // location.reload();
  }

  showDialog() {
    this.display = true;
  }

  getUserInfo(index: any) {
    this.details = this.users[index];
    console.log(this.users[index]);
  }

  getUserSkills(index: any) {
    this.details = this.mySkills;
    console.log(this.mySkills[index]);
  }

  getUserExpertise(index: any) {
    this.details = this.myExpertise[index];
    console.log(this.myExpertise[index]);
  }

  edit() {
    this.number = 0;
  }

  portfolioComplete() {
    this.number = 1;
  }


  //add to my skills
  addSkills() {

    this.SKillArray.forEach((element: any) => {
      let skill = {
        skill_id: element.skill_id,
        skill_description: element.skill_description,
        ratings: element.rating,
      }
      for (let index = 0; index < this.mySkills.length; index++) {


        if (element.skill_description == this.mySkills[index].skill_description) {
          this.portfolio.updateRatings(skill, this.decodedToken.employee_number).subscribe((response: any) => {
            console.log("you are there", response == skill);
            console.log(response, " compare ", skill);
            console.log(this.selectedSkills);

            response.push(skill)

          });
        }
      }

      this.portfolio.addSkills(skill, this.decodedToken.employee_number).subscribe((response: any) => {
        this.selectedSkills = response;
        response.push(skill)
        response.ratings = this.form.value.rating
        console.log(response, "Mind me ");
      })



    });
    // console.log(this.selectedSkills[i])
  }

  // Add to my expertise
  addExpertise() {
    console.log(this.selectedExpertise, "welele");

    if (this.selectedExpertise != undefined) {


      for (let i = 0; i < this.selectedExpertise.length; i++) {
        let expertise = {
          expertise_id: this.selectedExpertise[i].id,
          description: this.selectedExpertise[i].description,
        }
        this.portfolio.addExpertise(expertise, this.decodedToken.employee_number).subscribe({
          next: (response) => {
            this.selectedExpertise = response;
            response = expertise
            // response.ratings = this.form.value.rating
            console.log(response);

          },
          error: (err) => {
            // this.submitted = true;
            // this.loading = false;
            this.errorMessage = err.error.error;

            if (err.error.error == undefined || err.error.error == "") {
              this.errorMessage = "Please Check with our HELP_LINE, If the Server is not Down";
            }
            console.log(this.errorMessage);
            return this.showErrorDoc(this.errorMessage);
          },
        })

      }
    }
  }

  showErrorDoc(error: any) {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  }

  addProject() {
    if (this.myForm.value.title != '' && this.myForm.value.description != '') {


      let projects = {
        title: this.myForm.value.title,
        description: this.myForm.value.description,
      };

      console.log(" addpro will Run");
      this.portfolio.addProject(projects, this.decodedToken.employee_number).subscribe({
        next: (response) => {
          response = projects;
          console.log(response, "projectssssssssssssssssssssss");
        }
      })
      console.log(projects);
    }
  }

  addSummary() {
    let summary = {
      summary: this.myForm.value.summary,
    };
    //  console.log(this.Summaries , "sfdghjk");

    if (this.Summaries == "") {
      console.log(" addSummary will Run");
      this.portfolio.addSummary(summary, this.decodedToken.employee_number).subscribe({
        next: (response) => {
          response = summary;
          console.log(response, "add Ran");
        }
      })
    } else if (this.myForm.value.summary != "") {
      console.log(" Sum will Run");
      this.portfolio.sum(summary, this.decodedToken.employee_number).subscribe({
        next: (response) => {
          response = summary;
          console.log(response, "sum Ran");
        }
      })
    }

  }

  handleFileInput(event: any) {
    const image = (event.target as any).files[0];
    this.file = image
  }


  updateProfile() {
    this.formData.append('image', this.file)
    // this.image = this.file;
    console.log(this.file, "file");
    console.log(this.formData, "formdata");
    console.log(this.image, "image");
    this.userServ.updateProfile(this.formData, this.decodedToken.employee_number).subscribe({
      next: data => {
        console.log("picture uploaded");
        this.updateCompanyID(this.decodedToken.employee_number);
        location.reload();
      }
    })
  }


  saveProfile() {

    this.formData.append('image', this.file)
    this.image = this.file;
    // console.log(this.file, "file");
    // console.log(this.formData, "formdata");
    // console.log(this.image, "image");
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    // console.log('token ',this.decodedToken.employee_number);
    // this.userServ.updateProfile(this.formData, this.decodedToken.employee_number).subscribe({
    //   next: data => {
    //     console.log("picture uploaded");
    //     location.reload();
    //   }
    // })
    if (this.file != " ") {
      this.userServ.insertProfile(this.formData, this.decodedToken.employee_number).subscribe({
        next: data => {
          console.log(data);

          this.showSuccess('You have successfully uploaded an image')
          // this.showSuccess()
          console.log("picture saved on notification");
          location.reload();
        }
      }
      )
    }
    else {
      this.showWarn()
    }
  }


  Update() {
    this.SkillsOut = this.selectedSkills;
  }

  call() {
    this.showSuccess("You have successfully copied the link");
  }
  //======================= ALERTS START =====================//
  showSuccess(message: any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Please select an image to upload',
    });
  }
  //======================= ALERTS END =====================//

  plusSkill(skillId: any) {
    let data = {
      skill_description: this.form.value.skillDescription,
      rating: this.form.value.rating,
      skill_id: this.SKid

    }
    console.log('skill data ', data);
    this.SKillArray.push(data)
    console.log(this.SKillArray, "Skill Array data");
    this.counter++;
    this.cards.length = this.counter;

  }

  select(event: any) {
    let data = event.target.value
    console.log(data);
    this.Skills.forEach((element: any) => {
      if (element.description == data) {
        this.SKid = element.id
      }
    });

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

  /* To copy any Text */
  copyText(val: string) {
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
  showNotLooking() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'You have changed your status to NOT LOOKING',
    });
  }

  deleted(id: any, title: any) {
    console.log("I am deleted with ID", this.projects.id, id, " TITLE", this.projects.title, title);
    this.portfolio.deleteProject(id).subscribe({
      next: (response) => {
        response = this.projects;
        console.log(response, "I am working")
        this.showSuccess("I am deleted with ID" + id + " TITLE" + title);
        location.reload();
      }
    })
  }
  showLooking() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have changed your status to LOOKING',
    });
  }

  statusUpdate(status: any) {

    const id = this.decodedToken.employee_number
    const body = {
      looking: status
    }
    this.userServ.updateLookingStatus(body, id).subscribe(
      {
        next: (res: any) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/alumni/profile'], { relativeTo: this.route });
        }
      }
    )
  }


}
