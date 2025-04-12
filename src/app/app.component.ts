import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './users.service';
import { UserModel } from './user-model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular';

  users: UserModel[] = [];

  userForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users: UserModel[]) => {
        this.users = users;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    })
  }

  createNewUser(): void {

    if (this.userForm.valid) {
      let data: UserModel = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value
      }

      this.usersService.createNewUser(data).subscribe({
        next: (user: UserModel) => {
          console.log(user);

          this.users.unshift(user);

        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    } else {
      console.error('Formulario invalido');
    }

  }

  updateUser(): void {

    if (this.userForm.valid) {
      let data: UserModel = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value
      }

      this.usersService.updateUserById(5, data).subscribe({
        next: (user: UserModel) => {
          console.log(user);

          let index = this.users.findIndex((user: UserModel) => user.id == 5);

          if (index !== -1) {
            this.users[index] = user;
          }

        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    } else {
      console.error('Formulario invalido');
    }

  }

  deleteUser(): void {

    this.usersService.deleteUserById(5).subscribe({
      next: (user: any) => {
        console.log('Usuario eliminado');
        let index = this.users.findIndex((user: UserModel) => user.id == 5);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })

  }

}
