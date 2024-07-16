import { useState, useEffect } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Collapse,
  Dropdown,
  Form,
  MenuProps,
  Row,
  Space,
  Spin,
  Switch,
  theme,
  Tooltip,
  Typography
} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, UndoOutlined, MoreOutlined } from '@ant-design/icons';
import { statusOptions } from '@/utils/constants/options';
import {
  convertFormDataToQueryParams,
  inputPlaceholderText,
  selectPlaceholderText
  // showDeleConfirmationModal
} from '@/utils/functions/functions';
import { ColumnsType } from 'antd/es/table';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IHTTPSParams } from '@/services/adapter-config/config';
import dayjs from 'dayjs';
import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import AppHandledTable from '@/components/display/table/table';
import { MenuClickEvent } from '@/models/common';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import { MobileAppUsersServices } from '../../../../services/mobile-app-users-services/mobile-app-users-services';
import { IMobileAppUsersFilter, IMobileAppUsersItem } from '../models';
import ViewMobileAppUserModal from '../modals/view-mobile-app-user-modal';

function MobileAppUsers() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IMobileAppUsersFilter>({
    mode: 'onChange',
    defaultValues: {
      Name: '',
      Voen: '',
      Mobile: '',
      Address: '',
      Phone: ''
    }
  });

  const { t } = useTranslation();

  // State variables
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [mobileAppUsersData, setMobileAppUsersData] = useState<
    IMobileAppUsersItem[] | null
  >(null);
  // const [formIsRequired, setFormIsRequired] = useState<boolean>(false);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    useState<IMobileAppUsersItem | null>();
  // const [showAddMobileAppUserModal, setShowAddMobileAppUserModal] =
  //   useState<boolean>(false);
  const [showViewMobileAppUserModal, setShowViewMobileAppUserModal] =
    useState<boolean>(false);
  // const [showEditMobileAppUserModal, setShowEditMobileAppUserModal] =
  //   useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);

  const { Text } = Typography;
  const { useToken } = theme;
  const { token } = useToken();

  const items: MenuProps['items'] = [
    // {
    //   label: <Typography.Text>{t('editBtn')}</Typography.Text>,
    //   key: '0'
    // },
    {
      label: <Typography.Text>{t('view')}</Typography.Text>,
      key: '1'
    }
    // {
    //   label: <Typography.Text>{t('delete')}</Typography.Text>,
    //   key: '2'
    // }
  ];

  const fetchMobileAppUsersList = async () => {
    try {
      setLoading(true);
      const res =
        await MobileAppUsersServices.getInstance().getAllMobileAppUsers([
          ...queryParams,
          { name: 'PageIndex', value: page }
        ]);

      setMobileAppUsersData(res?.Data);
      setTotalPage(res?.TotalPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const deleteMobileAppUser = async (id: number) => {
  //   try {
  //     setLoading(true);
  //     const res =
  //       await MobileAppUsersServices.getInstance().deleteMobileAppUser(id);

  //     toast.success(t('successTxt'));
  //     fetchMobileAppUsersList();
  //     console.log(res);
  //   } catch (error) {
  //     toast.error(t('errorOccurred'));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDelete = (raw: IMobileAppUsersItem) => {
  //   showDeleConfirmationModal({
  //     titleText: t('confirmTitle'),
  //     descriptionText: t('confirmDelete'),
  //     okText: t('yesTxt'),
  //     onClose: () => {
  //       deleteMobileAppUser(raw?.Id);
  //     }
  //   });
  // };

  const onChangeStatus = async (id: number, newStatus: number) => {
    try {
      setLoading(true);

      const res =
        await MobileAppUsersServices.getInstance().MobileAppUserChangeStatus(
          id,
          newStatus,
          e => {
            e.preventDefault = true;
            toast.error(e.message?.Error);
          }
        );

      if (res) {
        toast.success(res?.Data?.Message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error(t('failedToUpdateStatus'));
    } finally {
      setLoading(false);
      setRefreshComponent(z => !z);
    }
  };

  const handleMenuClick = (e: MenuClickEvent, raw: any) => {
    // if (e?.key === '0') {
    //   setShowEditMobileAppUserModal(true);
    //   setSelectedItem(raw);
    // }
    if (e?.key === '1') {
      setSelectedItem(raw);
      setShowViewMobileAppUserModal(true);
    }
    // if (e?.key === '2') {
    //   handleDelete(raw);
    // }
  };

  const columns: ColumnsType<IMobileAppUsersItem> = [
    {
      title: t('name'),
      dataIndex: 'Name',
      key: 'Name',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('surname'),
      dataIndex: 'Surname',
      key: 'Surname',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('username'),
      dataIndex: 'Username',
      key: 'Username',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('mobile'),
      dataIndex: 'MobileNumber',
      key: 'MobileNumber',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('email'),
      dataIndex: 'Email',
      key: 'Email',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('BirthDate'),
      dataIndex: 'Birthdate',
      key: 'Birthdate',
      render: (date: string) => {
        const formattedDate = dayjs(date)?.format('DD-MM-YYYY');
        return <AppHandledEllipsisText record={formattedDate} />;
      }
    },
    {
      title: t('createdAt'),
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date: string) => {
        const formattedDate = dayjs(date)?.format('DD-MM-YYYY HH:mm:ss');
        return <AppHandledEllipsisText record={formattedDate} />;
      }
    },
    {
      title: t('status'),
      dataIndex: 'Status',
      key: 'Status',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('changeStatus'),
      dataIndex: 'StatusId',
      key: 'StatusId',
      render: (StatusId: number, raw: IMobileAppUsersItem) => {
        const handleStatusChange = () => {
          const newStatus = StatusId === 2 ? 3 : 2;
          onChangeStatus(raw?.Id, newStatus);
        };

        return (
          <Tooltip
            placement="top"
            title={raw.StatusId === 1 ? '' : t('changeStatus')}
          >
            <Switch
              checked={StatusId === 2}
              loading={loading}
              onChange={handleStatusChange}
              disabled={raw?.StatusId === 1}
            />
          </Tooltip>
        );
      }
    },
    {
      title: '',
      key: 'actions',
      width: 0,
      render: (_, raw: IMobileAppUsersItem) => (
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: e => handleMenuClick(e, raw)
            }}
            key={raw?.Id}
            trigger={['click']}
          >
            <AppHandledButton icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  const onSubmit: SubmitHandler<IMobileAppUsersFilter> = async (
    data: IMobileAppUsersFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IMobileAppUsersFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  useEffect(() => {
    fetchMobileAppUsersList();
  }, [page, refreshComponent]);

  return (
    <div className="mobileAppUsersContainer">
      <Card size="small" className="box box-margin-y">
        <Row justify="space-between" align="middle">
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
                title: t('MobileAppUsers')
              }
            ]}
          />
          {/* <Tooltip placement="right" title={t('addBtn')}>
            <AppHandledButton
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              loading={loading}
              onClick={() => {
                setShowAddMobileAppUserModal(true);
              }}
              icon={<AiOutlinePlus />}
            />
          </Tooltip> */}
        </Row>
      </Card>

      <Card size="small" className="box box-margin-y ">
        <div className="generalFilter">
          <Collapse
            expandIconPosition="end"
            ghost
            style={{
              padding: '0'
            }}
            defaultActiveKey="1"
            size="small"
          >
            <Collapse.Panel
              key={1}
              className="p-0"
              header={<Text type="secondary">{t('filter')}</Text>}
            >
              <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <Row gutter={16}>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('name')}
                      name="Name"
                      inputProps={{
                        id: 'Name'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('name'))}
                      errors={errors}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('surname')}
                      name="Surname"
                      inputProps={{
                        id: 'Surname'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('surname'))}
                      errors={errors}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('username')}
                      name="Username"
                      inputProps={{
                        id: 'Username'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('username'))}
                      errors={errors}
                    />
                  </Col>

                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('mobile')}
                      name="MobileNumber"
                      inputProps={{
                        id: 'MobileNumber'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('mobile'))}
                      errors={errors}
                    />
                  </Col>

                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledInput
                      label={t('email')}
                      name="Email"
                      inputProps={{
                        id: 'Email'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('email'))}
                      errors={errors}
                    />
                  </Col>

                  <Col
                    className="gutter-row"
                    style={{ marginBottom: token.marginSM }}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <AppHandledSelect
                      label={t('status')}
                      required={false}
                      name="StatusId"
                      control={control}
                      placeholder={selectPlaceholderText(t('status'))}
                      errors={errors}
                      selectProps={{
                        allowClear: true,
                        showSearch: true,
                        id: 'StatusId',
                        placeholder: selectPlaceholderText(t('status')),
                        className: 'w-full',
                        options: statusOptions
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="end">
                  <div style={{ textAlign: 'right' }}>
                    <Space size="small">
                      <Tooltip title={t('resetTxt')}>
                        <AppHandledButton
                          onClick={() => {
                            reset();
                            setCurrentPage(1);
                            setQueryParams([]);
                            setRefreshComponent(r => !r);
                          }}
                          type="dashed"
                          icon={<UndoOutlined rev={undefined} />}
                        />
                      </Tooltip>
                      <AppHandledButton type="primary" htmlType="submit">
                        {t('searchTxt')}
                      </AppHandledButton>
                    </Space>
                  </div>
                </Row>
              </Form>
            </Collapse.Panel>
          </Collapse>
        </div>
      </Card>

      <Spin size="large" spinning={loading}>
        <AppHandledTable
          columns={columns}
          data={mobileAppUsersData}
          currentPage={page}
          totalPage={totalPage}
          onChangePage={(e: number) => setCurrentPage(e)}
          rowKey="Id"
        />
      </Spin>

      {/* {showAddMobileAppUserModal && (
        <AddMobileAppUserModal
          showAddMobileAppUserModal={showAddMobileAppUserModal}
          setShowAddMobileAppUserModal={setShowAddMobileAppUserModal}
        />
      )} */}

      {showViewMobileAppUserModal && selectedItem && (
        <ViewMobileAppUserModal
          showViewMobileAppUserModal={showViewMobileAppUserModal}
          setShowViewMobileAppUserModal={setShowViewMobileAppUserModal}
          selectedItem={selectedItem}
        />
      )}

      {/* {showEditMobileAppUserModal && selectedItem && (
        <EditMobileAppUserModal
          selectedItem={selectedItem}
          showEditMobileAppUserModal={showEditMobileAppUserModal}
          setShowEditMobileAppUserModal={setShowEditMobileAppUserModal}
        />
      )} */}
    </div>
  );
}

export default MobileAppUsers;
