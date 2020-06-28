import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../_interfaces/users';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class UsersService {

 constructor(private http: HttpClient) { }

 public getUsers(): Observable<IUser[]> {
   return this.http.get<IUser[]>('http://localhost:3000/posts');
 }

 public postUser(userData): Observable<IUser> {
   return this.http.post<IUser>('http://localhost:3000/posts', userData);
 }
}
