import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject, of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Group } from './group.model';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl + 'groups';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private groups: Group[] = [];
  private groupsUpdated = new Subject<Group[]>();
  private groupCreated = new Subject<boolean>();
  private groupNameListener = new Subject<string>();
  private currentGroup: string = null; // group id

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastr: ToastrService) { }

  public getGroups(fields: string[]) {
    this.http.get<{ message: string, groups}>
      (API_URL + '/userGroups/' + this.authService.getUserId() + '/' + fields.join('-')).subscribe((response) => {
        this.groups = response.groups.map((group) => {
          return {
            ...group,
            id: group._id
          };
        });
        this.groupsUpdated.next(this.groups);
      }, this.handleGetError);
  }

  public getCurrentGroup() {
    return this.currentGroup;
  }

  public unselectGroup() {
    this.currentGroup = null;
    localStorage.removeItem('currentGroup');
    this.groupNameListener.next('');
  }

  public setCurrentGroup(groupId: string) {
    this.currentGroup = groupId;
    localStorage.setItem('currentGroup', groupId);
    this.getCurrentGroupName();
  }

  public getCurrentGroupName() {
    this.checkLocalStorage();
    if (this.currentGroup) {
      this.getGroupById(this.currentGroup, ['name'])
        .subscribe((group: Group) => {
          this.groupNameListener.next(group.name);
        });
    }
  }

  public getCurrentGroupListener() {
    return this.groupNameListener.asObservable();
  }

  public findGroups(search: string) {
    return this.http.get<{
      message: string,
      groups: any }>
      (API_URL + '/find/' + search);
  }

  public getGroupById(id: string, fields: string[]): Observable<Group> {
    return this.http.get<{message: string, group}>(API_URL + '/byId/' + id + '/' + fields.join('-')).pipe(
      map((response) => {
        return {
          ...response.group,
          id: response.group._id
        };
      }));
  }

  public getGroupCreatedListener() {
    return this.groupCreated.asObservable();
  }

  public getGroupUpdateListener() {
    return this.groupsUpdated.asObservable();
  }

  public joinGroup(password: string, encrypted: boolean, groupId: string) {
    const postData: any = {
      userId: this.authService.getUserId(),
      groupId: groupId
    };
    if (!encrypted) {
      postData.password = password;
    } else {
      postData.encryptedPassword = password;
    }

    return this.http.put<{message: string}>(API_URL + '/join/', postData);
  }

  public createGroup(name: string, password: string, slogan: string, description: string) {
    const group: Group = {
      id: null,
      members: [],
      games: [],
      admin: this.authService.getUserName(),
      name: name,
      password: password,
      slogan: slogan === '' ? null : slogan,
      description: description === '' ? null : description
    };
    const postData = {
      ...group,
      userId: this.authService.getUserId(),
    };
    this.http.post<{message: string, groupId: string}>(API_URL + '/add', postData)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.addGroup({
          ...group,
          id: responseData.groupId
        });
      }, this.handleCreateError);
  }

  private checkLocalStorage() {
    if (!this.currentGroup) {
      this.currentGroup = localStorage.getItem('currentGroup');
    }
  }

  private addGroup(group: Group) {
    this.http.post<{message: string}>(API_URL + '/addToUser/', {
      userId: this.authService.getUserId(),
      groupId: group.id
    }).subscribe((response) => {
      console.log(response.message);
      this.groupCreated.next(true);
    }, (error: HttpErrorResponse) => {
      this.handleCreateError(error);
      this.groupCreated.next(false);
    });
  }

  private handleCreateError(error: HttpErrorResponse) {
    const message = 'Unable to add group';
    if (error.status === 401) {
      this.toastr.error(message, 'Unauthorized!');
    } else if (error.status === 500) {
      this.toastr.error(message, 'Something went wrong');
    }
  }

  private handleGetError(error: HttpErrorResponse) {
    const message = 'Unable to get groups';
    if (error.status === 401) {
      this.toastr.error(message, 'Unauthorized!');
    } else if (error.status === 500) {
      this.toastr.error(message, 'Something went wrong');
    }
  }
}
