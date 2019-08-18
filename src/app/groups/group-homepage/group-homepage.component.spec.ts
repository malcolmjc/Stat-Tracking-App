import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material';

import { GroupHomepageComponent } from './group-homepage.component';
import { MockGroupListComponent } from '../group-list/group-list.component.mock';

describe('GroupHomepageComponent', () => {
  let component: GroupHomepageComponent;
  let fixture: ComponentFixture<GroupHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
      ],
      declarations: [
        GroupHomepageComponent,
        MockGroupListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
