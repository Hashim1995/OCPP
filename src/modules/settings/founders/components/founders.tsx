import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Tooltip,
  Form,
  Typography,
  theme,
  Collapse,
  Space,
  Spin
} from 'antd';
import { HomeOutlined, UndoOutlined } from '@ant-design/icons';
import AppHandledButton from '@/components/display/button/handle-button';
// import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import AppHandledInput from '@/components/forms/input/handled_input';
import {
  convertFormDataToQueryParams,
  inputPlaceholderText
} from '@/utils/functions/functions';
import { useEffect, useState } from 'react';
import { IHTTPSParams } from '@/services/adapter-config/config';
import { ColumnsType } from 'antd/es/table';
import { AiOutlinePlus } from 'react-icons/ai';
import { FoundersServices } from '@/services/founders-services/founders-services';
import AppHandledTable from '@/components/display/table/table';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import { IFounderFilter, IFoundersItem } from '../models';
import AddFounderModal from '../modals/add-founder-modal';

function Founders() {
  const { t } = useTranslation();
  const [foundersData, setFoundersData] = useState<IFoundersItem[] | null>(
    null
  );
  const [page, setCurrentPage] = useState<number>(1);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [showAddFounderModal, setShowAddFounderModal] =
    useState<boolean>(false);
  // const [skeleton, setSkeleton] = useState<boolean>(false);
  const { Text } = Typography;

  const { useToken } = theme;
  const { token } = useToken();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFoundersItem>({
    mode: 'onChange',
    defaultValues: {
      Name: '',
      Surname: '',
      Fin: '',
      Phone: '',
      Address: '',
      Email: '',
      StatusName: '',
      StatusId: null,
      CreatedAt: ''
    }
  });

  const columns: ColumnsType<IFoundersItem> = [
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
      title: t('finCode'),
      dataIndex: 'Fin',
      key: 'Fin',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('mobile'),
      dataIndex: 'Phone',
      key: 'Phone',
      render: (record: string) => (
        <Typography.Paragraph
          style={{ margin: 0 }}
          ellipsis={{ rows: 1, tooltip: record }}
        >
          {`${record}`}
        </Typography.Paragraph>
      )
    },
    {
      title: t('address'),
      dataIndex: 'Address',
      key: 'Address',
      width: '25%',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('email'),
      dataIndex: 'Email',
      key: 'Email',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('status'),
      dataIndex: 'StatusName',
      key: 'StatusName',
      render: record => <AppHandledEllipsisText record={record} />
    }
    // {
    //   title: t('status'),
    //   dataIndex: 'StatusId',
    //   key: 'StatusId',
    //   render: (record: boolean, raw: IFoundersItem) => (
    //     <Tooltip placement="top" title="Statusu dəyiş">
    //       <Switch checked={record} onChange={() => onChangeStatus(raw?.Id)} />
    //     </Tooltip>
    //   )
    // },
    // {
    //   title: '',
    //   key: 'actions',
    //   width: 0,
    //   render: (_, raw: IFoundersItem) => (
    //     <Space>
    //       <Dropdown
    //         menu={{
    //           items,
    //           onClick: e => handleMenuClick(e, raw)
    //         }}
    //         key={raw?.Id}
    //         trigger={['click']}
    //       >
    //         <AppHandledButton icon={<MoreOutlined />} />
    //       </Dropdown>
    //     </Space>
    //   )
    // }
  ];

  const onSubmit: SubmitHandler<IFounderFilter> = async (
    data: IFounderFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IFounderFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  const getFounders = async () => {
    try {
      setLoading(true);
      const res = await FoundersServices.getInstance().getFoundersList([
        ...queryParams,
        { name: 'PageIndex', value: page }
      ]);

      setFoundersData(res?.Data);
      setTotalPage(res?.TotalPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFounders();
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
                title: t('settings')
              },
              {
                title: t('founders')
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
              //   loading={loading}
              onClick={() => {
                setShowAddFounderModal(true);
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
                        id: 'name'
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
                        id: 'surname'
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
                      label={t('email')}
                      name="Email"
                      inputProps={{
                        id: 'email'
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
                    <AppHandledInput
                      label={t('address')}
                      name="Address"
                      inputProps={{
                        id: 'address'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('address'))}
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
                      name="Phone"
                      inputProps={{
                        id: 'phone'
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
                      label={t('finCode')}
                      name="Fin"
                      inputProps={{
                        id: 'fin'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('finCode'))}
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
        <AppHandledTable
          columns={columns}
          data={foundersData}
          currentPage={page}
          totalPage={totalPage}
          onChangePage={(e: number) => setCurrentPage(e)}
          rowKey="Id"
        />
      </Spin>

      {showAddFounderModal && (
        <AddFounderModal
          showAddFounderModal={showAddFounderModal}
          setShowAddFounderModal={setShowAddFounderModal}
          setRefreshComponent={setRefreshComponent}
        />
      )}
    </div>
  );
}

export default Founders;
