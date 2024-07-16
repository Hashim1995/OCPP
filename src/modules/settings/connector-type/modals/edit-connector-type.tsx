import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Col, Row, Form, Modal, UploadFile, Image } from 'antd';
import { t } from 'i18next';
import {
  inputPlaceholderText,
  inputValidationText,
  maxLengthCheck,
  selectPlaceholderText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import AppHandledButton from '@/components/display/button/handle-button';
import { ConnectorTypeServices } from '@/services/connector-type-services/connector-type-services';
import { toast } from 'react-toastify';
import AppFileUpload from '@/components/forms/file-upload/file-upload';
import AppHandledInput from '@/components/forms/input/handled_input';
import { minLengthCheck } from '@/utils/constants/validations';
import { IConnectorType, IPatchConnectorTypeFormData } from '../models';

interface IEditConnectorTypeModalProps {
  selectedItem: IConnectorType;
  setShowEditConnectorTypeModal: Dispatch<SetStateAction<boolean>>;
  showEditConnectorTypeModal: boolean;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
}

function EditConnectorTypeModal({
  selectedItem,
  setShowEditConnectorTypeModal,
  setRefreshComponent,
  showEditConnectorTypeModal
}: IEditConnectorTypeModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    // watch,
    formState: { isSubmitting, errors }
  } = useForm<IPatchConnectorTypeFormData>({
    defaultValues: {
      ImageFile: null,
      Type: selectedItem?.Type
    }
  });

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => setShowEditConnectorTypeModal(false)
    });
  };

  const onSubmit = async (data: IPatchConnectorTypeFormData) => {
    try {
      const formData = new FormData();
      selectedItem?.Id && formData.append('Id', selectedItem?.Id.toString());
      data?.Type && formData.append('Type', data.Type);
      data?.ImageFile && formData.append('ImageFile', data.ImageFile);

      const res = await ConnectorTypeServices.getInstance().updateConnectorType(
        formData,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );

      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setShowEditConnectorTypeModal(false);
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
      title={t('editConnectorType')}
      open={showEditConnectorTypeModal}
      onCancel={handleClose}
      cancelText={t('closeBtn')}
      okText={t('save')}
      className="generalModal"
      footer={[
        <AppHandledButton
          form="edit-connector-type-modal-form"
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
      <Form
        onFinish={handleSubmit(onSubmit)}
        id="edit-connector-type-modal-form"
        layout="vertical"
        className="editForm"
      >
        <Row gutter={16}>
          <Col span={24}>
            <AppHandledInput
              label={t('Type')}
              name="Type"
              control={control}
              placeholder={inputPlaceholderText(t('Type'))}
              required
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(t('Type'))
                },
                minLength: {
                  value: 3,
                  message: minLengthCheck(t('Type'), '3')
                },
                maxLength: {
                  value: 10,
                  message: maxLengthCheck(t('Type'), '10')
                }
              }}
              errors={errors}
              inputProps={{
                allowClear: true,
                id: 'Type',
                placeholder: selectPlaceholderText(t('Type')),
                className: 'w-full',
                size: 'large'
              }}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="ImageFile"
              control={control}
              render={({ field }) => (
                <AppFileUpload
                  listType="picture-card"
                  accept=".png"
                  length={1}
                  getValues={(files: UploadFile[]) => {
                    if (files && files.length > 0) {
                      setValue('ImageFile', files[0].originFileObj!);
                      field.onChange(files[0].originFileObj!);
                    }
                  }}
                />
              )}
            />
          </Col>
          {selectedItem?.ImagePath && (
            <Col span={24}>
              <Image
                width={200}
                src={`https://dev.optima.az:8320/${selectedItem.ImagePath}`}
                alt={selectedItem.Type}
              />
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
}

export default EditConnectorTypeModal;
