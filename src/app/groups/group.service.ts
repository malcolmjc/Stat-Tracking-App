import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject, of, Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Group } from './group.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [];
  private groupsUpdated = new Subject<Group[]>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getGroups() {
    this.http.get<{ message: string, groups}>('http://localhost:3001/api/groups/' + this.authService.getUserId())
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
      ('http://localhost:3001/api/groups/find/' + search);
  }

  public getGroupById(id: string): Observable<Group> {
    const foundGroup = this.groups.find((group) => group.id === id);
    if (!foundGroup) {
      return this.http.get<{message: string, group}>('http://localhost:3001/api/groups/byId/' + id).pipe(
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
    return this.http.put<{message: string}>('http://localhost:3001/api/groups/join/', {
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
    this.http.post<{message: string, groupId: string}>('http://localhost:3001/api/groups/add', postData)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.addGroup({
        ...group,
        id: responseData.groupId
      });
    });
  }

  private addGroup(group: Group) {
    this.http.post<{message: string}>('http://localhost:3001/api/groups/addToUser/', {
      userId: this.authService.getUserId(),
      groupId: group.id
    }).subscribe((response) => {
        console.log(response.message);
      });
  }
}
