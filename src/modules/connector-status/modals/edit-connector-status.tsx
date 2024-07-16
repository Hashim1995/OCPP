import { Dispatch, SetStateAction } from 'react';
import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import {
  inputPlaceholderText,
  inputValidationText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Row, Form, Modal } from 'antd';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { ConnectorStatusServices } from '@/services/connector-status-services/connector-status-services';
import { toast } from 'react-toastify';
// import { IConnectorTypes } from '@/modules/charge-point/models';
import { IPutConnectorRenameFormData } from '@/modules/settings/connector-type/models';
import { IConnectorStatus } from '../models';

interface IEditConnectorStatusProps {
  showUpdateConnectorStatusModal: boolean;
  setShowUpdateConnectorStatusModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
  selectedItem: IConnectorStatus;
  chargePointId: string;
  // connectorTypes: IConnectorTypes[];
}

function EditConnectorStatusModal({
  showUpdateConnectorStatusModal,
  setShowUpdateConnectorStatusModal,
  setRefreshComponent,
  selectedItem,
  chargePointId // connectorTypes
}: IEditConnectorStatusProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      ConnectorId: selectedItem?.ConnectorId,
      ConnectorName: selectedItem?.ConnectorName,
      ChargePointId: chargePointId
    }
  });
  console.log(selectedItem, 'salammmm');

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowUpdateConnectorStatusModal(false);
      }
    });
  };

  const onSubmit = async (data: IPutConnectorRenameFormData) => {
    try {
      const res =
        await ConnectorStatusServices.getInstance().renameConnectorStatus(data);
      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setShowUpdateConnectorStatusModal(false);
        setRefreshComponent(z => !z);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      width={700}
      destroyOnClose
      title={t('renameConnectorStatus')}
      open={showUpdateConnectorStatusModal}
      onCancel={handleClose}
      cancelText={t('closeBtn')}
      okText={t('save')}
      className="generalModal"
      footer={[
        <AppHandledButton
          form="add-template-modal-form"
          type="primary"
          key="submit"
          htmlType="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {t('save')}
        </AppHandledButton>
      ]}
    >
      <div>
        <Form
          onFinish={handleSubmit(onSubmit)}
          id="add-template-modal-form"
          layout="vertical"
          className="editForm"
        >
          <Row>
            <Col span={24}>
              <AppHandledInput
                label={t('ConnectorName')}
                name="ConnectorName"
                inputProps={{
                  id: 'ConnectorName'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('ConnectorName'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('ConnectorName'))}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <AppHandledInput
                label={t('connectorId')}
                name="ConnectorId"
                inputProps={{
                  id: 'ConnectorId'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('connectorId'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('connectorId'))}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <AppHandledInput
                label={t('ChargePointId')}
                name="ChargePointId"
                inputProps={{
                  id: 'ChargePointId'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('ChargePointId'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('ChargePointId'))}
                errors={errors}
              />
            </Col>

            {/* <Typography.Text>Add Connector type</Typography.Text>
            <Col span={24}>
              <AppHandledInput
                label={t('ChargePointId')}
                name="ChargePointId"
                inputProps={{
                  id: 'ChargePointId'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('ChargePointId'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('ChargePointId'))}
                errors={errors}
              />
            </Col>
            <Col span={24}>
              <AppHandledSelect
                label={t('connectorId')}
                name="ConnectorId"
                control={control}
                placeholder={inputPlaceholderText(t('connectorId'))}
                required
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('connectorId'))
                  }
                }}
                errors={errors}
                selectProps={{
                  allowClear: true,
                  showSearch: true,
                  id: 'ConnectorId',
                  placeholder: selectPlaceholderText(t('ConnectorId')),
                  className: 'w-full',
                  size: 'large',
                  options: selectedItem?.ConnectorStatuses
                    ? selectedItem?.ConnectorStatuses.map(ConnectorStatus => ({
                        value: ConnectorStatus?.ConnectorId,
                        label: ConnectorStatus?.ConnectorId
                      }))
                    : []
                }}
              />
            </Col>
            <Col span={24}>
              <AppHandledSelect
                label={t('connectorTypeId')}
                name="ConnectorTypeId"
                control={control}
                placeholder={inputPlaceholderText(t('connectorTypeId'))}
                required
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('connectorTypeId'))
                  }
                }}
                errors={errors}
                selectProps={{
                  allowClear: true,
                  showSearch: true,
                  id: 'ConnectorTypeId',
                  placeholder: selectPlaceholderText(t('connectorTypeId')),
                  className: 'w-full',
                  size: 'large',
                  options: connectorTypes
                    ? connectorTypes.map(ConnectorStatus => ({
                        value: ConnectorStatus?.Id,
                        label: ConnectorStatus?.Type
                      }))
                    : []
                }}
              />
            </Col> */}
          </Row>
        </Form>
      </div>
    </Modal>
  );
}

export default EditConnectorStatusModal;
