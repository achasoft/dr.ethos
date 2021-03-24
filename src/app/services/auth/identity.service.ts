import { Injectable } from '@angular/core';
import {IdentityViewModel, ProfileViewModel} from '../../view-models/auth/identity-view-model';
import {OperationResultStatus} from '../../library/shared/enums';
import {OperationResult} from '../../library/shared/operation-result';
import {HttpService} from '../shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private readonly STORAGE_KEY = 'ETHOS_IDENTITY';
  identity: IdentityViewModel;
  profile: ProfileViewModel;

  constructor(private readonly httpService: HttpService) {
    const auth = localStorage.getItem(this.STORAGE_KEY);
    this.identity = JSON.parse(auth || '{}');
  }

  async install(): Promise<OperationResult<boolean>>  {
    // TODO: inform server that a pwa installation has occurred
    return Promise.resolve(OperationResult.Success(true));
  }

  async login(model: any): Promise<OperationResult<IdentityViewModel>> {
    const op = await this.httpService.mockPost<IdentityViewModel>(
        '/login',
        model,
    );
    if (op.status === OperationResultStatus.Success) {
      this.identity = op.data;
      if (localStorage) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(op.data));
      }
    }
    return op;
  }

  async loadProfile(): Promise<OperationResult<ProfileViewModel>> {
    if (!this.identity.token) {
      return Promise.resolve(OperationResult.Success(null));
    }
    const op = await this.httpService.mockPost<ProfileViewModel>('/profile');
    if (op.status === OperationResultStatus.Success) {
      this.profile = op.data;
    }
    return op;
  }

  newToken(newToken: string): void {
    const auth = JSON.stringify({ token: newToken });
    localStorage.setItem(this.STORAGE_KEY, auth);
    this.identity.token = newToken;
    console.log('TOKEN_UPDATED');
  }

  logout(): void {
    if (localStorage) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.identity = { token: null, username: null, userId: null };
  }
}
