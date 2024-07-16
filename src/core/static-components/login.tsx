import { useState } from 'react';
import { Col, Form, Row, Space, theme } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import AppHandledInput from '@/components/forms/input/handled_input';
import {
  inputValidationText,
  inputPlaceholderText
} from '@/utils/functions/functions';
import { ILogin } from '@/models/user';
import { ReactComponent as Logo } from '@/assets/images/iiko.svg';
import { AuthService } from '@/services/auth-services/auth-services';
import { ReactComponent as Illustration } from '@/assets/images/charge.svg';
import AppHandledButton from '@/components/display/button/handle-button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>({
    mode: 'onChange',
    defaultValues: {
      Email: '',
      Password: ''
    }
  });
  const navigate = useNavigate();
  const { useToken } = theme;
  const { token } = useToken();
  const darkMode = useReadLocalStorage('darkTheme');

  const [isFormSubmiting, setIsFormSubmiting] = useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const [userToken, setUserToken] = useLocalStorage<any>('userToken', null);
  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setIsFormSubmiting(true);

    try {
      const payload = {
        Email: data?.Email,
        Password: data?.Password
      };

      const res = await AuthService.getInstance().login(payload, e => {
        e.preventDefault = true;
        toast.error(e.message?.Error);
      });
      setUserToken({ token: res?.Data?.Token });
      navigate('/home');
    } catch (err) {
      toast.error(`${t('errorOccurred')}`);
    } finally {
      setIsFormSubmiting(false);
    }
  };

  return (
    <Row style={{ backgroundColor: darkMode ? '#000' : '#fff' }}>
      <Col span={12}>
        <Row className="h-screen" align={'middle'} justify={'center'}>
          <Col span={12}>
            <Row className="w-full" align="middle" justify="center">
              <Col span={15}>
                <Logo
                  className="w-full"
                  style={{
                    height: 'fit-content',
                    marginBottom: 40
                  }}
                />
              </Col>
              <Col span={24}>
                <Form
                  layout="vertical"
                  onFinish={handleSubmit(onSubmit)}
                  id="login-form"
                >
                  <Space className="w-full" direction="vertical">
                    <AppHandledInput
                      label={t('email')}
                      name="Email"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('email'))
                        },
                        validate: {
                          checkOnlyEnglishChars: (value: string) =>
                            /^[\w\\.-]+@[\w\\.-]+\.\w+$/.test(value) ||
                            `${t('enterValidEmailAddressErrorMessage')}`
                        }
                      }}
                      required
                      control={control}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('email'))}
                      errors={errors}
                    />
                    <AppHandledInput
                      label={t('password')}
                      name="Password"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('password'))
                        }
                      }}
                      required
                      control={control}
                      inputType="password"
                      placeholder={inputPlaceholderText(t('password'))}
                      errors={errors}
                    />

                    <AppHandledButton
                      block
                      loading={isFormSubmiting}
                      type="primary"
                      htmlType="submit"
                    >
                      {t('login')}
                    </AppHandledButton>
                  </Space>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row
          className="w-full h-full"
          justify="center"
          align="middle"
          style={{ backgroundColor: token.colorPrimary }}
        >
          <Col span={18}>
            <Illustration className="w-full" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Login;
