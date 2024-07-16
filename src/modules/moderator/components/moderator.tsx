import {
  Breadcrumb,
  Card,
  Row,
  Tooltip,
  Form,
  Collapse,
  theme,
  Typography,
  Col,
  Space,
  Spin,
  Dropdown
} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, UndoOutlined, MoreOutlined } from '@ant-design/icons';
import AppHandledButton from '@/components/display/button/handle-button';
import { AiOutlinePlus } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import AppHandledInput from '@/components/forms/input/handled_input';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  convertFormDataToQueryParams,
  inputPlaceholderText
  // showCloseConfirmationModal
} from '@/utils/functions/functions';
import AppEmpty from '@/components/display/empty/app-empty';
import AppPagination from '@/components/display/pagination/pagination';
import { IHTTPSParams } from '@/services/adapter-config/config';
import Table, { ColumnsType } from 'antd/es/table';
import { ModeratorServices } from '@/services/moderator-services/moderator-services';
import { MenuClickEvent } from '@/models/common';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import { IModeratorFilter, IModeratorItem } from '../models';
import AddModeratorModal from '../modals/add-moderator-modal';
import EditModeratorModal from '../modals/edit-moderator-modal';

function Moderator() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IModeratorItem>({
    mode: 'onChange',
    defaultValues: {
      Name: '',
      Surname: '',
      Username: '',
      Email: '',
      CreatedAt: ''
    }
  });
  const { t } = useTranslation();
  const { useToken } = theme;
  const { token } = useToken();
  const { Text } = Typography;

  const [moderatorData, setModeratorData] = useState<IModeratorItem[] | null>(
    null
  );
  const [totalCount, setTotalDataCount] = useState<number>(1);
  const [page, setCurrentPage] = useState<number>(1);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IModeratorItem | null>();
  const [showUpdateModeratorModal, setShowUpdateModeratorModal] =
    useState<boolean>(false);
  const [showAddModeratorModal, setShowAddModeratorModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const items = [
    {
      label: <Typography.Text>{t('editBtn')}</Typography.Text>,
      key: '0'
    }
    // {
    //   label: <Typography.Text>{t('view')}</Typography.Text>,
    //   key: '1'
    // },
    // {
    //   label: <Typography.Text>{t('delete')}</Typography.Text>,
    //   key: '2'
    // }
  ];

  // const handleDelete = async (id: number) => {
  //   try {
  //     setLoading(true);
  //     // const res: IGlobalResponse = await PoolServices.getInstance().deletePool(
  //     //   id
  //     // );
  //     // if (res.IsSuccess) {
  //     //   toast.success(dictionary.az.successTxt);
  //     //   fetchPool();
  //     // } else {
  //     //   toast.error(dictionary.az.errorOccurred);
  //     // }
  //     console.log(id);
  //   } catch (error) {
  //     console.error('error', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleMenuClick = (e: MenuClickEvent, raw: IModeratorItem) => {
    if (e?.key === '0') {
      setSelectedItem(raw);
      setShowUpdateModeratorModal(true);
    }
    // if (e?.key === '2') {
    //   setSelectedItem(raw);
    //   showCloseConfirmationModal({
    //     onClose: () => {
    //       handleDelete(raw.Id);
    //     }
    //   });
    // }
  };

  const columns: ColumnsType<IModeratorItem> = [
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
      title: t('email'),
      dataIndex: 'Email',
      key: 'Email',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('createdAt'),
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date: string) => {
        const formattedDate = dayjs(date)?.format('YYYY-MM-DD HH:mm:ss');
        return <AppHandledEllipsisText record={formattedDate} />;
      }
    },
    {
      title: '',
      align: 'right',
      key: 'actions',
      render: (record: IModeratorItem) => (
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: e => handleMenuClick(e, record)
            }}
            key={record?.Id}
            trigger={['click']}
          >
            <AppHandledButton icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  const onSubmit: SubmitHandler<IModeratorFilter> = async (
    data: IModeratorFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IModeratorFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  const getModerators = async () => {
    setLoading(true);

    try {
      const res = await ModeratorServices.getInstance().getModeratorList([
        ...queryParams,
        { name: 'PageIndex', value: page }
      ]);
      setModeratorData(res?.Data);
      setTotalDataCount(res?.TotalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModerators();
  }, [page, refreshComponent]);

  return (
    <div>
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
                title: t('moderator')
              }
            ]}
          />
          <Tooltip placement="right" title={t('addBtn')}>
            <AppHandledButton
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              loading={loading}
              onClick={() => {
                setShowAddModeratorModal(true);
              }}
              icon={<AiOutlinePlus />}
            />
          </Tooltip>
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
        <Row className="pb-10">
          <Col span={24}>
            <Table
              pagination={false}
              rowKey={'Id'}
              locale={{
                emptyText: <AppEmpty />
              }}
              scroll={{ x: 768 }}
              columns={columns}
              dataSource={moderatorData !== null ? moderatorData : []}
              className="generalTable"
            />
          </Col>
        </Row>
        <Row justify="end" className="generalPagination">
          <Col>
            <AppPagination
              current={page}
              total={totalCount}
              onChange={(z: number) => setCurrentPage(z)}
            />
          </Col>
        </Row>
      </Spin>

      {showAddModeratorModal && (
        <AddModeratorModal
          setShowAddModeratorModal={setShowAddModeratorModal}
          setRefreshComponent={setRefreshComponent}
          showAddModeratorModal={showAddModeratorModal}
        />
      )}

      {showUpdateModeratorModal && selectedItem && (
        <EditModeratorModal
          setShowUpdateModeratorModal={setShowUpdateModeratorModal}
          setRefreshComponent={setRefreshComponent}
          showUpdateModeratorModal={showUpdateModeratorModal}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
}

export default Moderator;
