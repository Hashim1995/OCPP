/* eslint-disable no-useless-constructor */
import { IGetTransactionsListResponse } from '@/modules/transactions/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class TransactionServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: TransactionServices | null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  public static getInstance(): TransactionServices {
    if (!this.instance) {
      TransactionServices.instance = new TransactionServices();
    }
    return TransactionServices.instance!;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getTransactionsList(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetTransactionsListResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/transactions',
      params,
      false,
      onError
    );
    return res;
  }
}
