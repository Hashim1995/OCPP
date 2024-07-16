import AppHandledSelect from '@/components/forms/select/handled-select';
import { ChargePointServices } from '@/services/charge-point-services/charge-point-services';
import {
  inputPlaceholderText,
  selectPlaceholderText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Row, Modal, Col, Form } from 'antd';
import { t } from 'i18next';
import AppHandledButton from '@/components/display/button/handle-button';
import { SetStateAction, Dispatch, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IConnectorType } from '../models';

interface IDefineConnectorTypeProps {
  setShowDefineConnectorTypeModal: Dispatch<SetStateAction<boolean>>;
  showDefineConnectorTypeModal: boolean;
}

function SetConnectorTypeModal({
  showDefineConnectorTypeModal,
  setShowDefineConnectorTypeModal
}: IDefineConnectorTypeProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm();

  const [connectorTypes, setConnectorTypes] = useState<null | IConnectorType[]>(
    null
  );
  const handleClose = () => {
    showCloseConfirmationModal({
      titleText: t('confirmTitle'),
      descriptionText: t('confirmDelete'),
      okText: t('yesTxt'),
      onClose: () => {
        setShowDefineConnectorTypeModal(false);
      }
    });
  };

  const getConnectorTypes = async () => {
    try {
      const res = await ChargePointServices.getInstance().getConnectorTypes();
      setConnectorTypes(res?.Data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = () => {};

  useEffect(() => {
    getConnectorTypes();
  }, []);

  return (
    <Modal
      width={600}
      destroyOnClose
      title={t('setConnectorTypes')}
      open={showDefineConnectorTypeModal}
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
              <AppHandledSelect
                label={t('connectorFirst')}
                name="connectorFirst"
                control={control}
                required={false}
                placeholder={selectPlaceholderText(t('connectorType'))}
                //   formItemProps={{
                //     style: { fontSize: md ? '10px' : '12px', color: 'red' }
                //   }}
                errors={errors}
                selectProps={{
                  allowClear: true,
                  showSearch: true,
                  id: 'connectorFirst',
                  placeholder: selectPlaceholderText(t('connectorType')),
                  className: 'w-full',
                  options: connectorTypes
                    ? connectorTypes.map(connectorType => ({
                        value: connectorType.Id,
                        label: connectorType.Type
                      }))
                    : []
                }}
              />
            </div>
            <div className="pb-10">
              <AppHandledSelect
                label={t('connectorSecond')}
                name="connectorSecond"
                control={control}
                required={false}
                placeholder={inputPlaceholderText(t('connectorType'))}
                errors={errors}
                selectProps={{
                  allowClear: true,
                  showSearch: true,
                  id: 'connectorSecond',
                  placeholder: selectPlaceholderText(t('connectorType')),
                  className: 'w-full',
                  options: connectorTypes
                    ? connectorTypes.map(connectorType => ({
                        value: connectorType.Id,
                        label: connectorType.Type
                      }))
                    : []
                }}
              />
            </div>

            <div className="pb-10">
              <AppHandledSelect
                label={t('connectorThird')}
                name="connectorThird"
                control={control}
                required={false}
                placeholder={inputPlaceholderText(t('connectorType'))}
                //   formItemProps={{
                //     style: { fontSize: md ? '10px' : '12px', color: 'red' }
                //   }}
                errors={errors}
                selectProps={{
                  allowClear: true,
                  showSearch: true,
                  id: 'connectorThird',
                  placeholder: selectPlaceholderText(t('connectorType')),
                  className: 'w-full',
                  options: connectorTypes
                    ? connectorTypes.map(connectorType => ({
                        value: connectorType.Id,
                        label: connectorType.Type
                      }))
                    : []
                }}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
export default SetConnectorTypeModal;
