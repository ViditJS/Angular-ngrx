import { Component, OnInit } from '@angular/core';
import { IUser } from '../_interfaces/users';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../store';
import { from } from 'rxjs';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  users: IUser[] = [];
  public isLoading: boolean;

  constructor(private store: Store<fromUsers.IUserState>) { }

  ngOnInit() {
    this.store.dispatch(new fromUsers.GetUsersLoad());
    const users$ = this.store.pipe(select(fromUsers.allUsers));

    users$.subscribe(res => {
      this.isLoading = res.isLoading;
      this.users = res.data;
    });
  }

  public getFirstTenUsers(): void {
    const firstTenUsers$ = this.store.pipe(select(fromUsers.firstTenUsers));

    firstTenUsers$.subscribe(res => {
      this.isLoading = res.isLoading;
      this.users = res.data;
    });
  }

}
