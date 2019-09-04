import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';

import { NotificationsDisplayComponent } from './notifications-display.component';

describe('NotificationsDisplayComponent', () => {
  let component: NotificationsDisplayComponent;
  let fixture: ComponentFixture<NotificationsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule
      ],
      declarations: [
        NotificationsDisplayComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
