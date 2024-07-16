import AppHandledInput from '@/components/forms/input/handled_input';
import {
  inputPlaceholderText,
  inputValidationText,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Modal, Form, Row, Spin } from 'antd';
import { t } from 'i18next';
import AppHandledButton from '@/components/display/button/handle-button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ModeratorServices } from '@/services/moderator-services/moderator-services';
import { toast } from 'react-toastify';
import { strongPasswordValidationText } from '@/utils/constants/validations';
import { IChangePassword } from '../models';

function ChangePasswordModal({
  showChangePasswordModal,
  setShowChangePasswordModal
}: any) {
  const [skeleton] = useState<boolean>(true);
  // const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowChangePasswordModal(false);
      }
    });
  };
  const {
    handleSubmit,
    control,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      CurrentPassword: '',
      NewPassword: '',
      ConfirmationPassword: ''
    }
  });

  const onSubmit: SubmitHandler<IChangePassword> = async (
    data: IChangePassword
  ) => {
    try {
      const res = await ModeratorServices.getInstance().changePassword(
        data,
        e => {
          e.preventDefault = true;
          toast.error(e.message?.Error);
        }
      );

      toast.success(res?.Data?.Message);
      setShowChangePasswordModal(false);
    } catch (error) {
      console.error(error);
      Promise.reject();
    }
  };
  return (
    <Modal
      width={700}
      destroyOnClose
      title={t('changePassword')}
      open={showChangePasswordModal}
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
          >
            <Row>
              <Col span={24}>
                <AppHandledInput
                  label={t('currentPassword')}
                  name="CurrentPassword"
                  inputProps={{
                    id: 'CurrentPassword'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('currentPassword'))
                    }
                  }}
                  required
                  control={control}
                  inputType="password"
                  placeholder={inputPlaceholderText(t('currentPassword'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('newPassword')}
                  name="NewPassword"
                  inputProps={{
                    id: 'NewPassword'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('newPassword'))
                    },
                    minLength: {
                      value: 8,
                      message: strongPasswordValidationText(t('password'))
                    },
                    validate: {
                      RequireDigit: value =>
                        /[0-9]/.test(value) ||
                        strongPasswordValidationText(t('password')),
                      RequireLowercase: value =>
                        /[a-z]/.test(value) ||
                        strongPasswordValidationText(t('password')),
                      RequireUppercase: value =>
                        /[A-Z]/.test(value) ||
                        strongPasswordValidationText(t('password')),
                      RequireSpecialCharacter: value =>
                        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value) ||
                        strongPasswordValidationText(t('password'))
                    }
                  }}
                  onChangeApp={() => {
                    if (
                      watch('NewPassword') !== watch('ConfirmationPassword')
                    ) {
                      setError('NewPassword', {
                        message: t('passwordsDoNotMatch')
                      });
                      setError('ConfirmationPassword', {
                        message: t('passwordsDoNotMatch')
                      });
                    } else {
                      clearErrors('NewPassword');
                      clearErrors('ConfirmationPassword');
                    }
                  }}
                  required
                  control={control}
                  inputType="password"
                  placeholder={inputPlaceholderText(t('newPassword'))}
                  errors={errors}
                />
              </Col>
              <Col span={24}>
                <AppHandledInput
                  label={t('confirmPassword')}
                  name="ConfirmationPassword"
                  inputProps={{
                    id: 'ConfirmationPassword'
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('confirmPassword'))
                    }
                  }}
                  onChangeApp={() => {
                    if (
                      watch('NewPassword') !== watch('ConfirmationPassword')
                    ) {
                      setError('NewPassword', {
                        message: t('passwordsDoNotMatch')
                      });
                      setError('ConfirmationPassword', {
                        message: t('passwordsDoNotMatch')
                      });
                    } else {
                      clearErrors('NewPassword');
                      clearErrors('ConfirmationPassword');
                    }
                  }}
                  required
                  control={control}
                  inputType="password"
                  placeholder={inputPlaceholderText(t('confirmPassword'))}
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

export default ChangePasswordModal;
