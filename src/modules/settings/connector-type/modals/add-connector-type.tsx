import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import { Dispatch, SetStateAction } from 'react';

import {
  inputPlaceholderText,
  inputValidationText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Form, Modal, Row, UploadFile } from 'antd';
import { t } from 'i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AppFileUpload from '@/components/forms/file-upload/file-upload';
import { ConnectorTypeServices } from '@/services/connector-type-services/connector-type-services';
import { toast } from 'react-toastify';
import { IAddConnectorTypeForm } from '../models';

interface IAddConnectorTypeModalProps {
  showAddConnectorTypeModal: boolean;
  setShowAddConnectorTypeModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
}

function AddConnectorTypeModal({
  showAddConnectorTypeModal,
  setShowAddConnectorTypeModal,
  setRefreshComponent
}: IAddConnectorTypeModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<IAddConnectorTypeForm>();

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowAddConnectorTypeModal(false);
      }
    });
  };

  const onSubmit: SubmitHandler<IAddConnectorTypeForm> = async data => {
    try {
      const formData = new FormData();
      formData.append('Type', data?.Type);
      formData.append('ImageFile', data?.ImageFile);
      const res = await ConnectorTypeServices.getInstance().addConnectorTypes(
        formData,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );

      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setShowAddConnectorTypeModal(false);
        setRefreshComponent(z => !z);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      width={700}
      style={{ top: 90 }}
      destroyOnClose
      title={t('AddNewConnectorTypeModal')}
      open={showAddConnectorTypeModal}
      onCancel={handleClose}
      cancelText={t('closeBtn')}
      okText={t('save')}
      className="generalModal"
      footer={[
        <AppHandledButton
          form="add-book-modal-form"
          type="primary"
          key="submit"
          htmlType="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {t('addBtn')}
        </AppHandledButton>
      ]}
    >
      <Form
        id="add-book-modal-form"
        layout="vertical"
        className="addPordductTabOneContainer"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <div className="pb-10">
              <AppHandledInput
                label={t('connectorType')}
                name="Type"
                inputProps={{
                  id: 'Type'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('connectorType'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('connectorType'))}
                errors={errors}
              />
            </div>
            <div>
              <Controller
                name={'ImageFile'}
                control={control}
                render={() => (
                  <AppFileUpload
                    listType="picture-card"
                    accept=".png"
                    length={1}
                    getValues={(e: Array<UploadFile>) => {
                      if (e && e.length > 0) {
                        setValue('ImageFile', e[0]?.originFileObj!);
                      }
                    }}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddConnectorTypeModal;
