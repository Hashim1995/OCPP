import {
  IAddConnectorTypeResponse,
  IConnectorTypeResponse,
  IPatchConnectorTypeResponse
} from '../../modules/settings/connector-type/models/index';
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class ConnectorTypeServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: ConnectorTypeServices | null;

  private constructor() {}

  public static getInstance(): ConnectorTypeServices {
    if (!this.instance) {
      ConnectorTypeServices.instance = new ConnectorTypeServices();
    }
    return ConnectorTypeServices.instance!;
  }

  public async getConnectorTypes(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IConnectorTypeResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/connector-type',
      params,
      false,
      onError
    );
    return res;
  }

  public async addConnectorTypes(
    body: FormData,
    onError?: ErrorCallBack
  ): Promise<IAddConnectorTypeResponse> {
    const res = await HttpUtil.post(
      '/controlpanel/connector-type',
      body,
      onError
    );
    return res;
  }

  public async updateConnectorType(
    body: FormData,
    onError?: ErrorCallBack
  ): Promise<IPatchConnectorTypeResponse> {
    const res = await HttpUtil.patch(
      `/controlpanel/connector-type`,
      body,
      onError
    );
    return res;
  }
}
