import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from '../auth/auth.service';
import { GroupService } from './group.service';
import { ToastrService } from 'ngx-toastr';

describe('GroupService', () => {
  let toastr: SpyObject<ToastrService>;
  let authService: SpyObject<AuthService>;

  beforeEach(async(() => {
    toastr = createSpyObject(['error', 'success']);
    authService = createSpyObject(['getUserId', 'getUserName']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ToastrService, useValue: toastr },
        GroupService
      ]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: GroupService = TestBed.get(GroupService);
    expect(service).toBeTruthy();
  });
});
