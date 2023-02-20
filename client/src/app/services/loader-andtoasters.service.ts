import { Injectable, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';


@Injectable({
  providedIn: 'root'
})
export class LoaderANDToastersService {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  constructor(private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  showErrorDoc(error: any) {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  }
}
