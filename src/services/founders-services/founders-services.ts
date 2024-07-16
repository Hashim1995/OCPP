/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import {
  IGetFoundersListResponse,
  IPostFounderForm,
  IPostFounderFormResponse
} from '@/modules/settings/founders/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class FoundersServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: FoundersServices | null;

  private constructor() {}

  public static getInstance(): FoundersServices {
    if (!this.instance) {
      FoundersServices.instance = new FoundersServices();
    }
    return FoundersServices.instance!;
  }

  public async getFoundersList(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetFoundersListResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/founders',
      params,
      false,
      onError
    );
    return res;
  }

  public async addFounder(
    body: IPostFounderForm,
    onError?: ErrorCallBack
  ): Promise<IPostFounderFormResponse> {
    const res = await HttpUtil.post(
      '/controlpanel/corporative-register',
      body,
      onError
    );
    return res;
  }
}
