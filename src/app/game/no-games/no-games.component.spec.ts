import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule, MatCardModule } from '@angular/material';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { GroupService } from 'src/app/groups/group.service';
import { NoGamesComponent } from './no-games.component';

describe('NoGamesComponent', () => {
  let component: NoGamesComponent;
  let fixture: ComponentFixture<NoGamesComponent>;
  let groupService: SpyObject<GroupService>;

  beforeEach(async(() => {
    groupService = createSpyObject(['getCurrentGroup']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
      ],
      declarations: [ NoGamesComponent ],
      providers: [
        { provide: GroupService, useValue: groupService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
