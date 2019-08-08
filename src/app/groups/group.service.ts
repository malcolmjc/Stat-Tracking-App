import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject, of, Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Group } from './group.model';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl + 'groups';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private groups: Group[] = [];
  private groupsUpdated = new Subject<Group[]>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getGroups() {
    this.http.get<{ message: string, groups}>(API_URL + '/' + this.authService.getUserId())
      .subscribe((response) => {
        this.groups = response.groups.map((group) => {
          return {
            ...group,
            id: group._id
          };
        });
        this.groupsUpdated.next(this.groups);
      });
  }

  public findGroups(search: string) {
    return this.http.get<{
      message: string,
      groups: any }>
      (API_URL + '/find/' + search);
  }

  public getGroupById(id: string): Observable<Group> {
    const foundGroup = this.groups.find((group) => group.id === id);
    if (!foundGroup) {
      return this.http.get<{message: string, group}>(API_URL + '/byId/' + id).pipe(
        map((response) => {
          return {
            ...response.group,
            id: response.group._id
          };
        }));
    } else {
      return of(foundGroup);
    }
  }

  public getGroupUpdateListener() {
    return this.groupsUpdated.asObservable();
  }

  public joinGroup(password: string, groupId: string) {
    return this.http.put<{message: string}>(API_URL + '/join/', {
      userId: this.authService.getUserId(),
      groupId: groupId,
      password: password
    });
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
    this.groups.push(group);
    this.groupsUpdated.next(this.groups);
    this.http.post<{message: string, groupId: string}>(API_URL + '/add', postData)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.addGroup({
        ...group,
        id: responseData.groupId
      });
    });
  }

  private addGroup(group: Group) {
    this.http.post<{message: string}>(API_URL + '/addToUser/', {
      userId: this.authService.getUserId(),
      groupId: group.id
    }).subscribe((response) => {
        console.log(response.message);
      });
  }
}
