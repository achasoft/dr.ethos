import {Injectable} from '@angular/core';
import {OperationResult} from '../../library/shared/operation-result';
import {OperationResultStatus} from '../../library/shared/enums';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private readonly client: HttpClient,
    private readonly notificationService: NotificationService,
  ) {}

  async post<T>(
    section: string,
    data?: any,
    handleNoneSuccess?: boolean,
  ): Promise<OperationResult<T>> {
    return new Promise<OperationResult<T>>((resolve) => {
      try {
        const path = environment.api_endpoint + section;
        data = data || {};
        this.client.post(path, data).subscribe(
          (op: OperationResult<T>) => {
            if (op.status !== OperationResultStatus.Success && handleNoneSuccess !== false) {
              this.notificationService.handleRequest(op);
            }
            resolve(op);
          },
          (err: Error) => {
            this.notificationService.error('GENERAL_FAILED');
            resolve(OperationResult.Failed<T>());
          },
        );
      } catch (e) {
        this.notificationService.error('GENERAL_FAILED');
        resolve(OperationResult.Failed<T>(e));
      }
    });
  }

  async mockData<T>(
    section: string,
    data?: any,
  ): Promise<OperationResult<T>> {
    return new Promise<OperationResult<T>>((resolve) => {
      try {
        const path = environment.api_endpoint + section + '.json';
        this.client.get(path).subscribe(
          (op: OperationResult<T>) => {
            resolve(op);
          },
          (err: Error) => {
            this.notificationService.error('GENERAL_FAILED');
            resolve(OperationResult.Failed<T>());
          },
        );
      } catch (e) {
        this.notificationService.error('GENERAL_FAILED');
        resolve(OperationResult.Failed<T>(e));
      }
    });
  }
}
