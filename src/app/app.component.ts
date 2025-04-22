import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './users.service';
import { UserModel } from './user-model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular';

  users: UserModel[] = [];

  // userForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) {
    // this.userForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required]
    // });
  }


  ngOnInit(): void {
    // this.getAllUsers();
  }

  // getAllUsers(): void {
  //   this.usersService.getUsers().subscribe({
  //     next: (users: UserModel[]) => {
  //       this.users = users;
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err.error);
  //     }
  //   })
  // }

  // createNewUser(): void {

  //   if (this.userForm.valid) {
  //     let data: UserModel = {
  //       name: this.userForm.get('name')?.value,
  //       email: this.userForm.get('email')?.value,
  //       password: this.userForm.get('password')?.value
  //     }

  //     this.usersService.createNewUser(data).subscribe({
  //       next: (user: UserModel) => {
  //         console.log(user);

  //         this.users.unshift(user);

  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log(err);
  //       }
  //     })
  //   } else {
  //     console.error('Formulario invalido');
  //   }

  // }

  // updateUser(userId: number): void {

  //   if (this.userForm.valid) {
  //     let data: UserModel = {
  //       name: this.userForm.get('name')?.value,
  //       email: this.userForm.get('email')?.value,
  //       password: this.userForm.get('password')?.value
  //     }

  //     this.usersService.updateUserById(userId, data).subscribe({
  //       next: (user: UserModel) => {
  //         console.log(user);

  //         let index = this.users.findIndex((user: UserModel) => user.id == userId);

  //         if (index !== -1) {
  //           this.users[index] = user;
  //         }

  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log(err);
  //       }
  //     })
  //   } else {
  //     console.error('Formulario invalido');
  //   }

  // }

  // deleteUser(userId: number): void {

  //   this.usersService.deleteUserById(userId).subscribe({
  //     next: (user: any) => {
  //       console.log('Usuario eliminado');
  //       let index = this.users.findIndex((user: UserModel) => user.id == userId);
  //       if (index !== -1) {
  //         this.users.splice(index, 1);
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err);
  //     }
  //   })

  // }

}
