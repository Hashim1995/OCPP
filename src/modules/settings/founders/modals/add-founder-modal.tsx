import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import { Dispatch, SetStateAction } from 'react';
import {
  inputPlaceholderText,
  inputValidationText,
  minLengthCheck,
  showCloseConfirmationModal
} from '@/utils/functions/functions';
import { Col, Form, Modal, Row } from 'antd';
import { t } from 'i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import AppHandledDate from '@/components/forms/date/handled-date';
import { FoundersServices } from '@/services/founders-services/founders-services';
import { toast } from 'react-toastify';
import AppHandledInputMask from '@/components/forms/input-mask/handled-input-mask';
import { IPostFounderForm } from '../models';
import {
  maxLengthCheck,
  strongPasswordValidationText
} from '../../../../utils/constants/validations';

interface IAddFounderModalProps {
  showAddFounderModal: boolean;
  setShowAddFounderModal: Dispatch<SetStateAction<boolean>>;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
}

function AddFounderModal({
  showAddFounderModal,
  setShowAddFounderModal,
  setRefreshComponent
}: IAddFounderModalProps) {
  const {
    control,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IPostFounderForm>();

  const handleClose = () => {
    showCloseConfirmationModal({
      onClose: () => {
        setShowAddFounderModal(false);
      }
    });
  };
  const onSubmit: SubmitHandler<IPostFounderForm> = async data => {
    try {
      const res = await FoundersServices.getInstance().addFounder(data, e => {
        e.preventDefault = true;
        toast.error(e.message?.Error);
      });

      if (res?.Data) {
        toast.success(res?.Data?.Message);
        setShowAddFounderModal(false);
        setRefreshComponent(z => !z);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      width={700}
      style={{ top: 70 }}
      destroyOnClose
      title={t('AddNewFounder')}
      open={showAddFounderModal}
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
        <Row gutter={24}>
          <Col span={12}>
            <div className="pb-10">
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
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('phone')}
                name="Phone"
                inputProps={{
                  id: 'Phone'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('phone'))
                  },
                  minLength: {
                    value: 9,
                    message: minLengthCheck(t('phone'), '9')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('phone'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
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
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('surname'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('Fin')}
                name="Fin"
                inputProps={{
                  id: 'Fin'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('Fin'))
                  },
                  maxLength: {
                    value: 7,
                    message: maxLengthCheck(t('Fin'), '7')
                  },
                  minLength: {
                    value: 7,
                    message: minLengthCheck(t('Fin'), '7')
                  },
                  validate: {
                    checkOnlyEnglishChars: (value: string) =>
                      /^[a-zA-Z0-9]+$/.test(value) || t('finCodeValidationText')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('Fin'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('address')}
                name="Address"
                inputProps={{
                  id: 'Address'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('address'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('address'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('email')}
                name="Email"
                inputProps={{
                  id: 'Email'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('email'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('email'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('password')}
                name="Password"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('confirmPassword'))
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
                      /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(value) ||
                      strongPasswordValidationText(t('password'))
                  }
                }}
                //   rules={{
                //     required: {
                //       value: true,
                //       message: inputValidationText(dictionary.az.newPassowrd)
                //     },
                // validate: (val: string) => {
                //     if (watch('Password') !== val) {
                //         setError('Password', {
                //             type: 'custom',
                //             message: "Your passwordssssssss do not match",
                //           });
                //         setError('ConfirmPassword', {
                //             type: 'custom',
                //             message: "Your passwordssssssss do not match",
                //           });
                //     //   return "Your passwxords do no match";
                //     }
                //     return undefined;
                //   },
                //   }}
                onChangeApp={() => {
                  if (watch('Password') !== watch('ConfirmationPassword')) {
                    setError('Password', {
                      message: t('passwordsDoNotMatch')
                    });
                    setError('ConfirmationPassword', {
                      message: t('passwordsDoNotMatch')
                    });
                  } else {
                    clearErrors('Password');
                    clearErrors('ConfirmationPassword');
                  }
                }}
                inputProps={{ id: 'Password' }}
                required
                control={control}
                inputType="password"
                placeholder={inputPlaceholderText(t('password'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('confirmPassword')}
                name="ConfirmationPassword"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('confirmPassword'))
                  }
                  // validate: (val: string) => {
                  //     if (watch('Password') !== val) {
                  //         setError('Password', {
                  //             type: 'custom',
                  //             message: "Your passwordssssssss do not match",
                  //           });
                  //         setError('ConfirmPassword', {
                  //             type: 'custom',
                  //             message: "Your passwordsssdddddddfiasyfaiysssss do not match",
                  //           });
                  //     //   return "Your passwxords do no match";
                  //     }
                  //     return undefined;
                  //   },
                }}
                onChangeApp={() => {
                  if (watch('Password') !== watch('ConfirmationPassword')) {
                    setError('Password', {
                      message: t('passwordsDoNotMatch')
                    });
                    setError('ConfirmationPassword', {
                      message: t('passwordsDoNotMatch')
                    });
                  } else {
                    clearErrors('Password');
                    clearErrors('ConfirmationPassword');
                  }
                }}
                inputProps={{ id: 'ConfirmationPassword' }}
                required
                control={control}
                inputType="password"
                placeholder={inputPlaceholderText(t('confirmPassword'))}
                errors={errors}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityVoen')}
                name="LegalEntityVoen"
                inputProps={{
                  id: 'LegalEntityVoen'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityVoen'))
                  },
                  minLength: {
                    value: 10,
                    message: minLengthCheck(t('LegalEntityVoen'), '10')
                  },
                  maxLength: {
                    value: 10,
                    message: maxLengthCheck(t('LegalEntityVoen'), '10')
                  },
                  validate: {
                    voenCheck: (value: string) =>
                      /^\d{10}$/.test(value) || t('voenRegexChecker')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('LegalEntityVoen'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityName')}
                name="LegalEntityName"
                inputProps={{
                  id: 'LegalEntityName'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityName'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('LegalEntityName'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityAddress')}
                name="LegalEntityAddress"
                inputProps={{
                  id: 'LegalEntityAddress'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityAddress'))
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('LegalEntityAddress'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInputMask
                label={t('LegalEntityMobile')}
                name="LegalEntityMobile"
                control={control}
                mask="\+\9\9\4 99-999-99-99"
                maskChar={null}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityMobile'))
                  },
                  pattern: {
                    value: /^\+994\d{9}$/,
                    message: t('fillCorrectMobileNumber')
                  }
                }}
                required
                placeholder={inputPlaceholderText(t('LegalEntityMobile'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityPhone')}
                name="LegalEntityPhone"
                inputProps={{
                  id: 'LegalEntityPhone'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityPhone'))
                  },
                  minLength: {
                    value: 9,
                    message: minLengthCheck(t('LegalEntityPhone'), '9')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('LegalEntityPhone'))}
                errors={errors}
              />
            </div>

            <div className="pb-10">
              <AppHandledInput
                label={t('LegalEntityEmail')}
                name="LegalEntityEmail"
                inputProps={{
                  id: 'LegalEntityEmail'
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityEmail'))
                  },
                  validate: {
                    checkOnlyEnglishChars: (value: string) =>
                      /^[\w\\.-]+@[\w\\.-]+\.\w+$/.test(value) ||
                      t('enterCorrectEmail')
                  }
                }}
                required
                control={control}
                inputType="text"
                placeholder={inputPlaceholderText(t('LegalEntityEmail'))}
                errors={errors}
              />
            </div>
            <div className="pb-10">
              <AppHandledDate
                label={t('LegalEntityCreatedAt')}
                name="LegalEntityCreatedAt"
                dateProps={{
                  id: 'LegalEntityCreatedAt',
                  style: { width: '100%' }
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('LegalEntityCreatedAt'))
                  }
                }}
                required
                placeholder={t('LegalEntityCreatedAt')}
                control={control}
                errors={errors}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddFounderModal;
