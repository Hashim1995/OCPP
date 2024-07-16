import { IHTTPSParams } from '@/services/adapter-config/config';
import {
  Row,
  Spin,
  Col,
  Typography,
  theme,
  Dropdown,
  Space,
  Card,
  Breadcrumb,
  Tooltip,
  Collapse,
  Form
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MoreOutlined, HomeOutlined, UndoOutlined } from '@ant-design/icons';
import AppHandledButton from '@/components/display/button/handle-button';
import {
  convertFormDataToQueryParams,
  inputPlaceholderText
} from '@/utils/functions/functions';
import { Link } from 'react-router-dom';
import AppHandledInput from '@/components/forms/input/handled_input';
import AppEmpty from '@/components/display/empty/app-empty';
import AppPagination from '@/components/display/pagination/pagination';
import { t } from 'i18next';
import dayjs from 'dayjs';
// import { MenuClickEvent } from '@/models/common';
import { ChargePointConfigServices } from '@/services/charge-point-configuration-services/charge-point-configuration-services';
import { MenuClickEvent } from '@/models/common';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import {
  IChargePointItemConfig,
  IChargePointItemConfigurationFilter
} from '../models';
import ViewChargePointConfigurationModal from '../modals/view-charge-point-configurations-modal';

function ChargePointConfigs() {
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [totalCount, setTotalDataCount] = useState<number>(1);
  const [page, setCurrentPage] = useState<number>(1);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    useState<IChargePointItemConfig | null>(null);
  const [
    showViewChargePointItemConfigurationsModal,
    setShowViewChargePointItemConfigurationsModal
  ] = useState<boolean>(false);
  const [chargePointItemConfigurations, setChargePointItemsConfigurations] =
    useState<IChargePointItemConfig[] | null>(null);

  const { useToken } = theme;
  const { token } = useToken();
  const { Text } = Typography;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const items = [
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

  const handleMenuClick = (e: MenuClickEvent, raw: IChargePointItemConfig) => {
    if (e?.key === '1') {
      setSelectedItem(raw);
      setShowViewChargePointItemConfigurationsModal(true);
      console.log(e);
      console.log(raw);
    }
  };

  const columns: ColumnsType<IChargePointItemConfig> = [
    {
      title: t('ChargePointId'),
      dataIndex: 'ChargePointId',
      key: 'ChargePointId',
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
      title: t('createdAt'),
      dataIndex: 'UpdatedAt',
      key: 'UpdatedAt',
      render: (date: string) => {
        const formattedDate = dayjs(date)?.format('YYYY-MM-DD HH:mm:ss');
        return <AppHandledEllipsisText record={formattedDate} />;
      }
    },

    {
      title: '',
      align: 'right',
      key: 'actions',
      render: (record: IChargePointItemConfig) => (
        <Space>
          <Dropdown
            menu={{
              items,
              onClick: e => handleMenuClick(e, record)
            }}
            key={record?.ChargePointId}
            trigger={['click']}
          >
            <AppHandledButton icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  const getChargePointConfigurations = async () => {
    setLoading(true);
    try {
      const res =
        await ChargePointConfigServices.getInstance().getChargePointSystemInformation(
          [...queryParams, { name: 'PageIndex', value: page }]
        );
      setChargePointItemsConfigurations(res?.Data);
      setTotalDataCount(res?.TotalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IChargePointItemConfigurationFilter> = async (
    data: IChargePointItemConfigurationFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IChargePointItemConfigurationFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  useEffect(() => {
    getChargePointConfigurations();
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
                title: t('chargePointConfigs')
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
                // setShowAddConnectorStatusModal(true);
                console.log('lol');
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
                      label={t('LegalEntityName')}
                      name="LegalEntityName"
                      inputProps={{
                        id: 'LegalEntityName'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('LegalEntityName'))}
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
                      label={t('voen')}
                      name="VOEN"
                      inputProps={{
                        id: 'VOEN'
                      }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('voen'))}
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
              dataSource={
                chargePointItemConfigurations !== null
                  ? chargePointItemConfigurations
                  : []
              }
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

      {selectedItem && showViewChargePointItemConfigurationsModal && (
        <ViewChargePointConfigurationModal
          showViewChargePointItemConfigurationsModal={
            showViewChargePointItemConfigurationsModal
          }
          setShowViewChargePointItemConfigurationsModal={
            setShowViewChargePointItemConfigurationsModal
          }
          selectedItem={selectedItem}
        />
      )}
      {/* {showAddConnectorStatusModal && (
        <AddConnectorStatus
          showAddConnectorStatusModal={showAddConnectorStatusModal}
          setShowAddConnectorStatusModal={setShowAddConnectorStatusModal}
        />
      )} */}

      {/* {selectedItem && showUpdateConnectorStatusModal && (
        <EditConnectorStatusModal
          showUpdateConnectorStatusModal={showUpdateConnectorStatusModal}
          setShowUpdateConnectorStatusModal={setShowUpdateConnectorStatusModal}
          setRefreshComponent={setRefreshComponent}
          selectedItem={selectedItem}
        />
      )} */}
    </div>
  );
}

export default ChargePointConfigs;
