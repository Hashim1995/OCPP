import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import { ModeratorServices } from '@/services/moderator-services/moderator-services';
import {
  inputPlaceholderText,
  inputValidationText,
  minLengthCheck,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Form, Modal, Row, Spin } from 'antd';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IModeratorItem, IPutModeratorFormData } from '../models';
/*
 * Renders a modal for adding a new book.
 *
 * @prop {boolean} showUpdateModeratorModal - Flag indicating whether the modal is visible.
 * @prop {Dispatch<SetStateAction<boolean>>} setShowUpdateModeratorModal - Callback function to control the modal's visibility.
 * @prop {Dispatch<SetStateAction<boolean>>} setRefreshComponent - Callback function to trigger a component refresh after adding a book.
 *
 * @returns {JSX.Element} The rendered add book modal component.
 */
interface IEditTemplateProps {
  showUpdateModeratorModal: boolean;
  setShowUpdateModeratorModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
  selectedItem: IModeratorItem;
}

function EditModeratorModal({
  setShowUpdateModeratorModal,
  setRefreshComponent,
  showUpdateModeratorModal,
  selectedItem
}: IEditTemplateProps) {
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowUpdateModeratorModal(false);
      }
    });
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      Name: selectedItem?.Name,
      Surname: selectedItem?.Surname,
      Username: selectedItem?.Username
    }
  });

  const onSubmit = async (data: IPutModeratorFormData) => {
    try {
      const res = await ModeratorServices.getInstance().updateModeratorData(
        selectedItem?.Id,
        data,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );
      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setShowUpdateModeratorModal(false);
        setRefreshComponent(z => !z);
      }
    } catch (error) {
      console.error(error);
    }
    setShowUpdateModeratorModal(false);
    setSkeleton(false);
  };

  return (
    <Modal
      width={700}
      destroyOnClose
      title={t('editModerator')}
      open={showUpdateModeratorModal}
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
                  label={t('surname')}
                  name="Surname"
                  inputProps={{
                    id: 'Surname'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('surname'))
                    },
                    minLength: {
                      value: 4,
                      message: minLengthCheck(t('username'), '4')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('surname'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('username')}
                  name="Username"
                  inputProps={{
                    id: 'Username'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('username'))
                    },
                    minLength: {
                      value: 5,
                      message: minLengthCheck(t('username'), '5')
                    }
                  }}
                  required
                  control={control}
                  inputType="text"
                  placeholder={inputPlaceholderText(t('username'))}
                  errors={errors}
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

export default EditModeratorModal;
