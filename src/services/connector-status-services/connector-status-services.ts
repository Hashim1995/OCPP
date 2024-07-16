/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import {
  IConnectorStatusResponse,
  IPutConnectorStatusFormData,
  IPutConnectorStatusResponse
} from '@/modules/connector-status/models';
import {
  IPutConnectorRenameFormData,
  IPutRenameConnectorStatusResponse
} from '@/modules/settings/connector-type/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class ConnectorStatusServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: ConnectorStatusServices | null;

  private constructor() {}

  public static getInstance(): ConnectorStatusServices {
    if (!this.instance) {
      ConnectorStatusServices.instance = new ConnectorStatusServices();
    }
    return ConnectorStatusServices.instance!;
  }

  public async getConnectorStatus(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IConnectorStatusResponse> {
    const res = await HttpUtil.get(
      '/controlpanel/connector-status',
      params,
      false,
      onError
    );
    return res;
  }

  public async updateConnectorStatus(
    ChargePointId: string,
    body: IPutConnectorStatusFormData,
    onError?: ErrorCallBack
  ): Promise<IPutConnectorStatusResponse> {
    const res = await HttpUtil.put(
      `/controlpanel/connector-status/${ChargePointId}`,
      body,
      onError
    );
    return res;
  }

  public async renameConnectorStatus(
    body: IPutConnectorRenameFormData,
    onError?: ErrorCallBack
  ): Promise<IPutRenameConnectorStatusResponse> {
    const res = await HttpUtil.patch(
      `/controlpanel/rename-connector-status`,
      body,
      onError
    );
    return res;
  }
}
