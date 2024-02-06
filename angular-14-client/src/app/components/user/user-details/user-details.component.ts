import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: User = {
    name: '',
    email: '',
    password: '',
    isActive: false,
    isBanned: false
  };
  
  user = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.user = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateIsActive(isActive: boolean): void {
    const data = {
      name: this.currentUser.name,
      email: this.currentUser.email,
      password: this.currentUser.password,
      isActive: isActive,
    };

    this.user = '';

    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.isActive = isActive;
          this.user = res.user ? res.user : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateIsBanned(isBanned: boolean): void {
    const data = {
      name: this.currentUser.name,
      email: this.currentUser.email,
      password: this.currentUser.password,
      isBanned: isBanned,
    };

    this.user = '';

    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.isBanned = isBanned;
          this.user = res.user ? res.user : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.user = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.user = res.user ? res.user : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateUserPassword(): void {
    this.user = '';

    this.userService.resetPassword(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.user = res.user ? res.user : 'Password resetted successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

}