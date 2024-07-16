import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/auth/auth_slice';
import { Breadcrumb, Card, Row, Col, Space, Form, Skeleton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  inputValidationText,
  minLengthCheck
} from '@/utils/constants/validations';
import { toast } from 'react-toastify';
import AppHandledInput from '@/components/forms/input/handled_input';
import { inputPlaceholderText } from '@/utils/functions/functions';
import { IPutModeratorFormData } from '@/modules/moderator/models';
import { ModeratorServices } from '@/services/moderator-services/moderator-services';
import AppHandledButton from '@/components/display/button/handle-button';
import {
  AuthService,
  IAuthResponse
} from '@/services/auth-services/auth-services';
import { RootState } from '@/redux/store';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { IPersonalData } from '../models';

function PersonalCabinet() {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IPersonalData>({
    mode: 'onChange',
    defaultValues: {
      Name: '',
      Surname: '',
      Username: '',
      Email: '',
      RoleName: '',
      CreatedAt: ''
    }
  });
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [skeleton, setSkeleton] = useState<boolean>(false);
  const [isFormSubmiting, setIsFormSubmitting] = useState<boolean>(false);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);

  const getUserData = async () => {
    setSkeleton(true);
    const res: IAuthResponse = await AuthService.getInstance().getUserData();
    dispatch(setUser(res?.Data));
    setValue('Name', res?.Data?.Name ?? '');
    setValue('Surname', res?.Data?.Surname ?? '');
    setValue('Username', res?.Data?.Username ?? '');
    setValue('Email', res?.Data?.Email ?? '');
    setValue('RoleName', res?.Data?.RoleName ?? null);
    setValue(
      'CreatedAt',
      dayjs(res?.Data?.CreatedAt)?.format('YYYY-MM-DD HH:mm:ss') ?? null
    );
    setSkeleton(false);
  };

  const onSubmit = async (data: IPutModeratorFormData) => {
    try {
      setIsFormSubmitting(true);
      const res = await ModeratorServices.getInstance().updateModeratorData(
        user?.Id,
        data
      );

      if (res) {
        toast.success(res?.Data?.Message);
        setRefreshComponent(z => !z);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Error occurred while submitting the form.');
    } finally {
      setIsFormSubmitting(false);
      setSkeleton(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [refreshComponent]);

  return (
    <div>
      <Card size="small" className="box box-margin-y">
        <Row justify="space-between">
          <Space>
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to="/home">
                      <HomeOutlined rev={undefined} />
                    </Link>
                  )
                },
                {
                  title: t('personalCabinet')
                }
              ]}
            />
          </Space>
          <Space>
            <AppHandledButton
              form="personal-form"
              htmlType="submit"
              loading={isFormSubmiting}
              disabled={isFormSubmiting}
              onClick={handleSubmit(onSubmit)}
              type="primary"
            >
              <Space>{t('save')}</Space>
            </AppHandledButton>
          </Space>
        </Row>
      </Card>
      <Card>
        {!skeleton ? (
          <Form id="personal-form" layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Row gutter={24}>
                  <Col span={24}>
                    <AppHandledInput
                      label={t('name')}
                      name="Name"
                      formItemProps={{
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
                        },

                        validate: {
                          checkOnlyEnglishChars: (value: string) =>
                            /^[a-zA-Z0-9]+$/.test(value) ||
                            'Name field should contain only english characters.'
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
                          message: minLengthCheck(t('surname'), '4')
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
              </Col>

              <Col span={12}>
                <Row gutter={24}>
                  <Col span={24}>
                    <AppHandledInput
                      label={t('email')}
                      name="Email"
                      inputProps={{
                        id: 'Email',
                        disabled: true
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('email'))
                        },
                        validate: {
                          checkOnlyEnglishChars: (value: string) =>
                            /^[\w\\.-]+@[\w\\.-]+\.\w+$/.test(value) ||
                            t('enterValidEmailAddressErrorMessage')
                        }
                      }}
                      required
                      control={control}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('email'))}
                      errors={errors}
                    />
                  </Col>
                  <Col span={24}>
                    <AppHandledInput
                      label={t('rolename')}
                      name="RoleName"
                      inputProps={{
                        id: 'RoleName',
                        disabled: true
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('rolename'))
                        },
                        minLength: {
                          value: 3,
                          message: minLengthCheck(t('rolename'), '3')
                        }
                      }}
                      required
                      control={control}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('rolename'))}
                      errors={errors}
                    />
                  </Col>
                  <Col span={24}>
                    <AppHandledInput
                      label={t('createdAt')}
                      name="CreatedAt"
                      inputProps={{
                        id: 'CreatedAt',
                        disabled: true
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('createdAt'))
                        },
                        minLength: {
                          value: 3,
                          message: minLengthCheck(t('createdAt'), '3')
                        }
                      }}
                      required
                      control={control}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('createdAt'))}
                      errors={errors}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        ) : (
          <Row gutter={24}>
            <Col span={12}>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Skeleton.Input block active={skeleton} />
                </Col>
                <Col span={24}>
                  <Skeleton.Input block active={skeleton} />
                </Col>
                <Col span={24}>
                  <Skeleton.Input block active={skeleton} />
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Skeleton.Input block active={skeleton} />
                </Col>
                <Col span={24}>
                  <Skeleton.Input block active={skeleton} />
                </Col>
                <Col span={24}>
                  <Skeleton.Input block active={skeleton} />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
}

export default PersonalCabinet;
