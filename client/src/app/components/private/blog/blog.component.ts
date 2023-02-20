import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent,ngxLoadingAnimationTypes } from 'ngx-loading';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',  
  providers: [MessageService],
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  constructor() { }

  ngOnInit(): void {
    
  }

}
