import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { UsersService } from '../_services/users.services';
import * as fromUsers from './actions';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IUser } from '../_interfaces/users';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UsersService
    ) {

  }

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType(fromUsers.UserActionTypes.GetUsersLoad),
    mergeMap(() =>
      this.userService.getUsers().pipe(
        map((users: IUser[]) => {
          return new fromUsers.GetUserSuccess(users);
        }),
        catchError((error) => of(new fromUsers.GetUserFail(error)))
      )
    )
  );

  @Effect()
  postUsers$: Observable<Action> = this.actions$.pipe(
    ofType(fromUsers.UserActionTypes.PostUser),
    map((action: fromUsers.PostUser) => action.payload),
    mergeMap((user: IUser) =>
      this.userService.postUser(user).pipe(
        map((user: IUser) =>{
          return new fromUsers.PostUserSuccess(user);
        }),
        catchError((error) => of(new fromUsers.PostUserFail(error)))
      )
    )
  );
}
