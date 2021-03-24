import { Injectable } from '@angular/core';
import { OperationResultStatus } from '../../library/shared/enums';
import { StringDictionary } from '../../library/shared/dictionary';
import { TranslateService } from './translate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationResult } from '../../library/shared/operation-result';

const CONFIG = {
  verticalPosition: 'top',
  horizontalPosition: 'center',
  duration: 7000,
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly translate: TranslateService,
    private readonly snackBar: MatSnackBar,
  ) {}

  handleRequest(op: OperationResult<any>): void {
    switch (op.status) {
      case OperationResultStatus.Pending:
        this.error('GENERAL_PENDING');
        break;
      case OperationResultStatus.Success:
        this.success('GENERAL_SUCCESS');
        break;
      case OperationResultStatus.NotFound:
        this.error('GENERAL_NOTFOUND');
        break;
      case OperationResultStatus.Duplicate:
        this.error('GENERAL_DUPLICATE');
        break;
      case OperationResultStatus.Rejected:
        this.error('GENERAL_REJECTED');
        break;
      case OperationResultStatus.Validation:
        this.error('GENERAL_VALIDATION');
        break;
      case OperationResultStatus.Failed:
        this.error('GENERAL_FAILED');
        break;
      case OperationResultStatus.Captcha:
        this.error('GENERAL_CAPTCHA');
        break;
      case OperationResultStatus.UnAuthorized:
        this.error('GENERAL_UNAUTHORIZED');
        window.localStorage.clear();
        window.location.reload();
        break;
    }
  }

  clear(): void {
    this.snackBar.dismiss();
  }

  clean(input: string, replace: StringDictionary<string> = null): string {
    if (input) {
      input = this.translate.fromKey(input);
    }
    if (replace !== null) {
      replace.Keys().forEach((k) => {
        const value = replace.Item(k);
        k = k.replace('{', '\\{').replace('}', '\\}');
        input = input.replace(new RegExp(k, 'g'), value);
      });
    }
    return input;
  }

  error(
    message: string,
    replace: StringDictionary<string> = null,
    options: any = null,
  ): void {
    const params = { ...CONFIG, panelClass: 'error-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  info(
    message: string,
    replace: StringDictionary<string> = null,
    options: any = null,
  ): void {
    const params = { ...CONFIG, panelClass: 'info-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  success(
    message: string,
    replace: StringDictionary<string> = null,
    options: any = null,
  ): void {
    const params = { ...CONFIG, panelClass: 'success-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  warning(
    message: string,
    replace: StringDictionary<string> = null,
    options: any = null,
  ): void {
    const params = { ...CONFIG, panelClass: 'warning-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }
}
