import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../store';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit {

  constructor(private store: Store<fromUsers.IUserState>) { }

  FG = new FormGroup({
    userId: new FormControl(101),
    id: new FormControl(2000),
    title: new FormControl('test title'),
    body: new FormControl('test body')
  });

  isLoading: boolean = false;

  ngOnInit() {
  }
  public onSubmit() {
    this.store.dispatch(new fromUsers.PostUser(this.FG.value));

    const users$ = this.store.pipe(select(fromUsers.allUsers));

    users$.subscribe(res => {
      this.isLoading = res.isLoading;
    });
  }

}
