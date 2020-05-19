import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [StorageService],
})
export class LoginComponent implements OnInit {

  public loading: boolean = false;
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: { code: number, message: string } = null;

  constructor(
    private formBuilder: FormBuilder,
    private autService: AuthenticationService,
    private router: Router,
    private storageService: StorageService

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public submitLogin() {
    this.loading = true;
    return this.autService.loginNuevo(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe(data => {
        this.autService.setUser(data.usuario);
        let token = data.token;
        this.autService.setToken(data.token);
        let session = this.autService.getUserAfterLogin(data.usuario, data.token)
        this.storageService.setCurrentSession(session);
        this.router.navigate(['home']);
      },
        error => console.log(error)
      );
  }

}
