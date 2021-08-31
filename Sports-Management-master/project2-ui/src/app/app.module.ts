import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BookSlotComponent } from './book-slot/book-slot.component';
import { BookedSlotComponent } from './booked-slot/booked-slot.component';
import { BookTimeComponent } from './book-time/book-time.component';
import { BuyFormComponent } from './buy-form/buy-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes : Routes = [
  { path: '', pathMatch: "full", redirectTo: 'login' },
  { path: 'login', component: LoginFormComponent },
  {path: 'my-slots', component: BookedSlotComponent},
  {path: 'book', component: BookComponent},
  { 
    path: 'dashboard', 
    component:  DashboardComponent,
    canActivate:[AuthGuardGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    BookSlotComponent,
    BookedSlotComponent,
    BookTimeComponent,
    BuyFormComponent,
    NavbarComponent,
    HomeComponent,
    BookComponent,
    LoginFormComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
