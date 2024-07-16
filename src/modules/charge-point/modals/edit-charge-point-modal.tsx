import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import { ChargePointServices } from '@/services/charge-point-services/charge-point-services';
import {
  inputPlaceholderText,
  inputValidationText,
  minLengthCheck,
  selectPlaceholderText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Row, Form, Spin, Modal } from 'antd';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AppHandledSelect from '@/components/forms/select/handled-select';
import AppHandledSwitch from '@/components/forms/switch/handled-switch';
import {
  IChargePointItem,
  IConnectorType,
  IPutChargePointFormData
} from '../models';

interface IUpdateChargePointProps {
  showUpdateChargePointModal: boolean;
  setShowUpdateChargePointModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
  selectedItem: IChargePointItem;
  connectorTypes: IConnectorType[] | null;
}

function EditChargePointModal({
  showUpdateChargePointModal,
  setShowUpdateChargePointModal,
  setRefreshComponent,
  selectedItem,
  connectorTypes
}: IUpdateChargePointProps) {
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      Name: selectedItem?.Name,
      Comment: selectedItem?.Comment,
      Longitude: selectedItem?.Coordinates?.Longitude,
      Latitude: selectedItem?.Coordinates?.Latitude,
      HourlyBillingEnabled: selectedItem?.HourlyBillingEnabled,
      ConnectorTypeIds:
        selectedItem?.ConnectorTypes?.map((type: IConnectorType) => type?.Id) ||
        [],
      Address: selectedItem?.Address,
      HourlyPrice: selectedItem?.HourlyPrice,
      Title: selectedItem?.Title,
      Text: selectedItem?.Text
      // ImagePath: selectedItem?.ImagePath
    }
  });

  const onSubmit: SubmitHandler<IPutChargePointFormData> = async (
    data: IPutChargePointFormData
  ) => {
    try {
      const res = await ChargePointServices.getInstance().updateChargePoint(
        selectedItem?.ChargePointId,
        data,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );
      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setShowUpdateChargePointModal(false);
        setRefreshComponent(z => !z);
      }
    } catch (error) {
      console.error(error);
    }
    setShowUpdateChargePointModal(false);
    setSkeleton(false);
  };

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowUpdateChargePointModal(false);
      }
    });
  };

  return (
    <Modal
      width={700}
      style={{ top: 20 }}
      destroyOnClose
      title={t('editChargePoint')}
      open={showUpdateChargePointModal}
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
        {skeleton ? (
          <Form
            onFinish={handleSubmit(onSubmit)}
            id="add-template-modal-form"
            layout="vertical"
            className="editForm"
          >
            <Row>
              <Col span={24}>
                <AppHandledInput
                  label={t('name')}
                  name="Name"
                  inputProps={{
                    id: 'Name'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('name'))
                    },
                    minLength: {
                      value: 3,
                      message: minLengthCheck(t('name'), '3')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('name'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('Comment')}
                  name="Comment"
                  inputProps={{
                    id: 'Comment'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('Comment'))
                    },
                    minLength: {
                      value: 3,
                      message: minLengthCheck(t('Comment'), '5')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('Comment'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('Longitude')}
                  name="Longitude"
                  inputProps={{
                    id: 'Longitude'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('Longitude'))
                    },
                    minLength: {
                      value: 2,
                      message: minLengthCheck(t('Longitude'), '2')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('Longitude'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('Latitude')}
                  name="Latitude"
                  inputProps={{
                    id: 'Latitude'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('Latitude'))
                    },
                    minLength: {
                      value: 2,
                      message: minLengthCheck(t('Latitude'), '2')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('Latitude'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledSelect
                  label={t('connectorType')}
                  name="ConnectorTypeIds"
                  control={control}
                  placeholder={selectPlaceholderText(t('connectorType'))}
                  errors={errors}
                  required
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('connectorType'))
                    }
                  }}
                  selectProps={{
                    mode: 'multiple',
                    showSearch: true,
                    id: 'ConnectorTypeIds',
                    className: 'w-full',
                    options: connectorTypes
                      ? connectorTypes?.map(item => ({
                          value: item?.Id,
                          label: item?.Type
                        }))
                      : [],
                    size: 'large'
                  }}
                  formItemProps={{
                    labelAlign: 'left',
                    labelCol: { span: 8, sm: 12, md: 10, lg: 8 }
                  }}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('Address')}
                  name="Address"
                  inputProps={{
                    id: 'Address'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('Address'))
                    },
                    minLength: {
                      value: 2,
                      message: minLengthCheck(t('Address'), '2')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('Address'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('HourlyPrice')}
                  name="HourlyPrice"
                  inputProps={{
                    id: 'HourlyPrice'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('HourlyPrice'))
                    }
                  }}
                  required
                  control={control}
                  inputType="number"
                  placeholder={inputPlaceholderText(t('HourlyPrice'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('Title')}
                  name="Title"
                  inputProps={{
                    id: 'Title'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('Title'))
                    },
                    minLength: {
                      value: 2,
                      message: minLengthCheck(t('Title'), '2')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('Title'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('Text')}
                  name="Text"
                  inputProps={{
                    id: 'Text'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('Text'))
                    },
                    minLength: {
                      value: 2,
                      message: minLengthCheck(t('Text'), '2')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('Text'))}
                  errors={errors}
                />
              </Col>
              {/* <Col span={24}>
                <AppHandledInput
                  label={t('ImagePath')}
                  name="ImagePath"
                  inputProps={{
                    id: 'ImagePath'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('ImagePath'))
                    },
                    minLength: {
                      value: 2,
                      message: minLengthCheck(t('ImagePath'), '2')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('ImagePath'))}
                  errors={errors}
                />
              </Col> */}
              <Col span={24} style={{ display: 'flex', gap: '8px' }}>
                <AppHandledSwitch
                  label={t('changeHourlyBillingStatus')}
                  name="HourlyBillingEnabled"
                  control={control}
                  errors={errors}
                  formItemProps={{
                    id: 'HourlyBillingEnabled'
                  }}
                />
              </Col>
            </Row>
          </Form>
        ) : (
          <Row className="w-full" justify="center" align="middle">
            <Spin size="large" />
          </Row>
        )}
      </div>
    </Modal>
  );
}

export default EditChargePointModal;
