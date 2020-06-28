import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {reducer} from './store/reducer';
import { UsersService } from './_services/users.services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GetUserComponent } from './get-user/get-user.component';
import { PostUserComponent } from './post-user/post-user.component';


@NgModule({
  declarations: [
    AppComponent,
    GetUserComponent,
    PostUserComponent,
    GetUserComponent,
    PostUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({users: reducer}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 15, // Retains last 15 states
    }),
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
