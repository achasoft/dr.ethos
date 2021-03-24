import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IdentityService} from '../../../services/auth/identity.service';
import {OperationResultStatus} from '../../../library/shared/enums';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string | null;
  waiting: boolean;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(
    private readonly identityService: IdentityService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    if (!this.form.valid) { return; }
    this.waiting = true;
    const op = await this.identityService.login(this.form.value);
    this.waiting = false;

    if (op.status !== OperationResultStatus.Success) {
      // TODO: show appropriate error message
      return;
    }

    await this.identityService.loadProfile();
    this.router.navigateByUrl('/');
  }

}
