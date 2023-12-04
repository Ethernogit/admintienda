import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

// User interface
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;
  constructor(
    public authService: AuthService,
    private toastr:ToastrService
    ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;

    });
  }
  ngOnInit() {}
}
