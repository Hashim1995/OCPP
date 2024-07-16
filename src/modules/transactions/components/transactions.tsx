import {
  Breadcrumb,
  Card,
  Col,
  Collapse,
  Dropdown,
  Form,
  Row,
  Space,
  Spin,
  theme,
  Tooltip,
  Typography
} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoreOutlined, UndoOutlined } from '@ant-design/icons';
import AppHandledButton from '@/components/display/button/handle-button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Table, { ColumnsType } from 'antd/es/table';
import { IHTTPSParams } from '@/services/adapter-config/config';
import {
  convertFormDataToQueryParams,
  inputPlaceholderText
} from '@/utils/functions/functions';
import i18n, { t } from 'i18next';

// import { AiOutlinePlus } from 'react-icons/ai';
import AppHandledInput from '@/components/forms/input/handled_input';
import AppEmpty from '@/components/display/empty/app-empty';
import { MenuClickEvent } from '@/models/common';
import AppPagination from '@/components/display/pagination/pagination';
import { TransactionServices } from '@/services/transaction-services/transaction-services';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import { ITransactionItem, ITransactionsFilter } from '../models';
import ViewTransactionsModal from '../modals/view-transactions-modal';
// import AddTransactionModal from '../modals/add-transaction-modal';

function Transactions() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ChargePointName: '',
      FounderName: '',
      FounderSurname: '',
      FounderEmail: '',
      FounderAddress: '',
      FounderFin: '',
      LegalEntityName: '',
      LegalEntityAddress: '',
      LegalEntityEmail: ''
    }
  });
  const [transactionsData, setTransactionsData] = useState<
    ITransactionItem[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setCurrentPage] = useState<number>(1);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [totalCount, setTotalDataCount] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<ITransactionItem | null>();
  // const [showAddTransactionModal, setShowAddTransactionModal] =
  //   useState<boolean>(false);
  const [showViewTransactionsModal, setShowViewTransactionsModal] =
    useState<boolean>(false);

  const { useToken } = theme;
  const { token } = useToken();
  const { Text } = Typography;

  const items = [
    {
      label: <Typography.Text>{t('editBtn')}</Typography.Text>,
      key: '0'
    },
    {
      label: <Typography.Text>{t('view')}</Typography.Text>,
      key: '1'
    },
    {
      label: <Typography.Text>{t('delete')}</Typography.Text>,
      key: '2'
    }
  ];

  const handleMenuClick = (e: MenuClickEvent, raw: ITransactionItem) => {
    // if (e?.key === '0') {
    //   setSelectedItem(raw);
    //   //   setShowUpdateModeratorModal(true);
    // }
    if (e?.key === '1') {
      setSelectedItem(raw);
      setShowViewTransactionsModal(true);
    }
  };

  const columns: ColumnsType<ITransactionItem> = [
    {
      title: t('chargePointName'),
      dataIndex: 'ChargePointName',
      key: 'ChargePointName',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: i18n.t('FounderName'),
      dataIndex: 'FounderName',
      key: 'FounderName',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('FounderSurname'),
      dataIndex: 'FounderSurname',
      key: 'FounderSurname',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('FounderFin'),
      dataIndex: 'FounderFin',
      key: 'FounderFin',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityAddress'),
      dataIndex: 'LegalEntityAddress',
      key: 'LegalEntityAddress',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityEmail'),
      dataIndex: 'LegalEntityEmail',
      key: 'LegalEntityEmail',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityCreatedAt'),
      dataIndex: 'LegalEntityCreatedAt',
      key: 'LegalEntityCreatedAt',
      render: (date: string) => {
        const formattedDate = dayjs(date)?.format('YYYY-MM-DD HH:mm:ss');
        return <AppHandledEllipsisText record={formattedDate} />;
      }
    },
    {
      title: t('LegalEntityMobile'),
      dataIndex: 'LegalEntityMobile',
      key: 'LegalEntityMobile',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('LegalEntityVoen'),
      dataIndex: 'LegalEntityVoen',
      key: 'LegalEntityVoen',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: '',
      align: 'right',
      key: 'actions',
      render: (record: any) => (
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

  const onSubmit: SubmitHandler<ITransactionsFilter> = async (
    data: ITransactionsFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<ITransactionsFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  const getTransactions = async () => {
    setLoading(true);

    try {
      const res = await TransactionServices.getInstance().getTransactionsList([
        ...queryParams,
        { name: 'PageIndex', value: page }
      ]);
      setTransactionsData(res?.Data);
      setTotalDataCount(res?.TotalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
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
                title: t('transactions')
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
                setShowAddTransactionModal(true);
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
                      label={t('chargePointName')}
                      name="ChargePointName"
                      inputProps={{
                        id: 'ChargePointName'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('chargePointName'))}
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
                      label={t('FounderName')}
                      name="FounderName"
                      inputProps={{
                        id: 'FounderName'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('FounderName'))}
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
                      label={t('FounderSurname')}
                      name="FounderSurname"
                      inputProps={{
                        id: 'FounderSurname'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('FounderSurname'))}
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
                      label={t('FounderEmail')}
                      name="FounderEmail"
                      inputProps={{
                        id: 'FounderEmail'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('FounderEmail'))}
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
              dataSource={transactionsData !== null ? transactionsData : []}
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
      {showViewTransactionsModal && selectedItem && (
        <ViewTransactionsModal
          setShowViewTransactionsModal={setShowViewTransactionsModal}
          showViewTransactionsModal={showViewTransactionsModal}
          selectedItem={selectedItem}
        />
      )}
      {/* {showAddTransactionModal && (
        <AddTransactionModal
          setShowAddTransactionModal={setShowAddTransactionModal}
          showAddTransactionModal={showAddTransactionModal}
        />
      )} */}
    </div>
  );
}

export default Transactions;
