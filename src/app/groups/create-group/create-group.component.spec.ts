import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CreateGroupComponent } from './create-group.component';
import { GroupService } from '../group.service';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';

describe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;
  let groupService: SpyObject<GroupService>;
  let router: SpyObject<Router>;
  let toastr: SpyObject<ToastrService>;
  let groupCreated = new Subject<boolean>();

  beforeEach(async(() => {
    groupService = createSpyObject(['createGroup', 'getGroupCreatedListener']);
    groupService.getGroupCreatedListener.mockReturnValue(groupCreated.asObservable());

    router = createSpyObject(['navigate']);
    toastr = createSpyObject(['error']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
      ],
      declarations: [
        CreateGroupComponent,
        MockLoadingIndicatorComponent
      ],
      providers: [
        { provide: GroupService, useValue: groupService },
        { provide: Router, useValue: router },
        { provide: ToastrService, useValue: toastr }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit behavior', () => {
    test('should show error if group create fails', () => {
      jest.spyOn(toastr, 'error');
      groupCreated.next(false);
      expect(toastr.error).toHaveBeenCalled();
    });

    test('should navigate to /my-groups if group create succeeds', () => {
      jest.spyOn(router, 'navigate');
      groupCreated.next(true);
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/my-groups']);
    });
  });

  describe('onCreateGroup behavior', () => {
    test('should deny empty form', () => {
      jest.spyOn(component, 'onCreateGroup');
      jest.spyOn(groupService, 'createGroup');
      const createGroupButton = fixture.debugElement.query(By.css('button')).nativeElement;
      createGroupButton.click();
      expect(component.onCreateGroup).toHaveBeenCalled();
      expect(groupService.createGroup).not.toHaveBeenCalled();
      expect(component.isLoading).toBeFalsy();
    });

    test('should accept valid form', () => {
      jest.spyOn(groupService, 'createGroup');

      const form = component.form;
      expect(form.invalid).toBeTruthy();
      const nameControl: FormControl = form.controls.groupName;
      nameControl.setValue('newGroup');

      const sloganControl: FormControl = form.controls.slogan;
      sloganControl.setValue('password');

      const descriptionControl: FormControl = form.controls.description;
      descriptionControl.setValue('newGroup');

      const passwordControl: FormControl = form.controls.password;
      passwordControl.setValue('password');

      fixture.detectChanges();
      expect(form.invalid).toBeFalsy();
      component.onCreateGroup();
      expect(groupService.createGroup).toHaveBeenCalled();
      expect(groupService.createGroup)
        .toHaveBeenCalledWith(nameControl.value, passwordControl.value,
                              sloganControl.value, descriptionControl.value);
    });

    test('slogan and description should be optional', () => {
      jest.spyOn(groupService, 'createGroup');
      jest.spyOn(component, 'onCreateGroup');

      const form = component.form;
      expect(form.invalid).toBeTruthy();
      const nameControl: FormControl = form.controls.groupName;
      nameControl.setValue('newGroup');

      const passwordControl: FormControl = form.controls.password;
      passwordControl.setValue('password');

      fixture.detectChanges();
      expect(form.invalid).toBeFalsy();
    });

    test('should limit password inputs minlength=5', () => {
      const form = component.form;
      expect(form.invalid).toBeTruthy();
      const passwordControl: FormControl = form.controls.password;
      expect(passwordControl.invalid).toBeTruthy();
      passwordControl.setValue('1');
      expect(passwordControl.invalid).toBeTruthy();
      passwordControl.setValue('12');
      expect(passwordControl.invalid).toBeTruthy();
      passwordControl.setValue('123');
      expect(passwordControl.invalid).toBeTruthy();
      passwordControl.setValue('1234');
      expect(passwordControl.invalid).toBeTruthy();
      passwordControl.setValue('12345');
      expect(passwordControl.invalid).toBeFalsy();
    });

    test('should limit group names to alphanumeric minlength=4', () => {
      const form = component.form;
      expect(form.invalid).toBeTruthy();
      const nameControl: FormControl = form.controls.groupName;
      expect(nameControl.invalid).toBeTruthy();
      nameControl.setValue('');
      expect(nameControl.invalid).toBeTruthy();
      nameControl.setValue('abc');
      expect(nameControl.invalid).toBeTruthy();
      nameControl.setValue('abcd!');
      expect(nameControl.invalid).toBeTruthy();
      nameControl.setValue('abc123');
      expect(nameControl.invalid).toBeFalsy();
      nameControl.setValue('abc 123');
      expect(nameControl.invalid).toBeFalsy();
    });
  });
});
