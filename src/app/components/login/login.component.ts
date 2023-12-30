import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthService,
  ) { }

  async login() {
    const usernameValue = this.loginForm.get('username')?.value ?? '';
    const passwordValue = this.loginForm.get('password')?.value ?? ' ';

    try {
      const resp:any = await this.auth.loginWithUsernameAndPassword(usernameValue, passwordValue)
      localStorage.setItem('token', resp['token']);
    }
    catch(e){
        console.error('error', e)
    };
  }
}
