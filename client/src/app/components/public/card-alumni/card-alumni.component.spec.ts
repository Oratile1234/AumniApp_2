import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlumniComponent } from './card-alumni.component';

describe('CardAlumniComponent', () => {
  let component: CardAlumniComponent;
  let fixture: ComponentFixture<CardAlumniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAlumniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
