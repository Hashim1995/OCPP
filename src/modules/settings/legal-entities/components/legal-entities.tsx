import { useState, useEffect } from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Collapse,
  Form,
  Row,
  Space,
  Spin,
  Switch,
  theme,
  Tooltip,
  Typography
} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, UndoOutlined } from '@ant-design/icons';
import { statusOptions } from '@/utils/constants/options';
import { AiOutlinePlus } from 'react-icons/ai';
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
import AppHandledButton from '@/components/display/button/handle-button';
import AppHandledInput from '@/components/forms/input/handled_input';
// import AppHandledDate from '@/components/forms/date/handled-date';
import AppHandledSelect from '@/components/forms/select/handled-select';
import AppHandledTable from '@/components/display/table/table';
import { LegalEntitiesServices } from '@/services/legal-entities-services/legal-entities-service';
// import {
//   inputValidationText,
//   maxLengthCheck,
//   minLengthCheck
// } from '@/utils/constants/validations';
import AppHandledEllipsisText from '@/components/display/ellipsisText/AppHandledEllipsisText';
import { ILegalEntitiesFilter, ILegalEntitiesItem } from '../models';
import AddNewLegalEntityModal from '../modals/add-new-legal-entity-modal';

/**
 * React component for managing legalEntities.
 * @module LegalEntities
 *  * @returns {JSX.Element} LegalEntities component JSX
 */

function LegalEntities() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILegalEntitiesFilter>({
    mode: 'onChange',
    defaultValues: {
      Name: '',
      Voen: '',
      Address: '',
      Mobile: '',
      Email: ''
    }
  });

  const { t } = useTranslation();

  // State variables
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [legalEntitiesData, setLegalEntitiesData] = useState<
    ILegalEntitiesItem[] | null
  >(null);
  const [showAddNewLegalEntityModal, setShowAddNewLegalEntityModal] =
    useState<boolean>(false);
  // const [formIsRequired, setFormIsRequired] = useState<boolean>(false);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  // const [selectedItem, setSelectedItem] = useState<ILegalEntitiesItem | null>();
  // const [showUpdateLegalEntityModal, setShowUpdateLegalEntityModal] =
  //   useState<boolean>(false);

  const { Text } = Typography;
  const { useToken } = theme;
  const { token } = useToken();

  // const items: MenuProps['items'] = [
  //   {
  //     label: <Typography.Text>{t('editBtn')}</Typography.Text>,
  //     key: '0'
  //   },
  //   {
  //     label: <Typography.Text>{t('delete')}</Typography.Text>,
  //     key: '1'
  //   }
  // ];

  /**
   * Fetches the list of legalEntities from the server.
   * @async
   */
  const fetchLegalEntitiesList = async () => {
    try {
      setLoading(true);
      const res = await LegalEntitiesServices.getInstance().getAllLegalEntities(
        [...queryParams, { name: 'PageIndex', value: page }]
      );

      setLegalEntitiesData(res?.Data);
      setTotalPage(res?.TotalPage);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // /**
  //  * Deletes a book from the server.
  //  * @param {number} id - The ID of the book to be deleted
  //  */
  // const deleteLegalEntity = async (id: number) => {
  //   try {
  //     setLoading(true);
  //     const res = await LegalEntitiesServices.getInstance().deleteLegalEntity(
  //       id
  //     );

  //     toast.success(t('successTxt'));
  //     fetchLegalEntitiesList();
  //     console.log(res);
  //   } catch (error) {
  //     toast.error(t('errorOccurred'));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // /**
  //  * Handles the delete action for a book.
  //  * @param {ILegalEntitiesItem} raw - The book item to be deleted
  //  */
  // const handleDelete = (raw: ILegalEntitiesItem) => {
  //   showDeleConfirmationModal({
  //     titleText: t('confirmTitle'),
  //     descriptionText: t('confirmDelete'),
  //     okText: t('yesTxt'),
  //     onClose: () => {
  //       deleteLegalEntity(raw?.Id);
  //     }
  //   });
  // };

  /**
   * Handles the status change for a book.
   * @param {number} id - The ID of the book whose status is being changed
   */
  const onChangeStatus = async (id: number, newStatus: number) => {
    try {
      setLoading(true);

      const res =
        await LegalEntitiesServices.getInstance().changeLegalEntityStatus(
          id,
          newStatus
        );

      setLoading(false);
      setRefreshComponent(!refreshComponent);
      toast.success(t('statusSuccessMessage'));
      console.log(res);
    } catch (error) {
      // Handle any errors here
      console.error('An error occurred:', error);
      setLoading(false); // Make sure loading state is reset in case of error
    }
  };

  // const handleMenuClick = (e: MenuClickEvent, raw: ILegalEntitiesItem) => {
  //   if (e?.key === '0') {
  //     setSelectedItem(raw);
  //     setShowUpdateLegalEntityModal(true);
  //   }
  //   if (e?.key === '1') {
  //     handleDelete(raw);
  //   }
  // };

  const columns: ColumnsType<ILegalEntitiesItem> = [
    {
      title: t('name'),
      dataIndex: 'Name',
      key: 'Name',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('voen'),
      dataIndex: 'Voen',
      key: 'Voen',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('address'),
      dataIndex: 'Address',
      key: 'Address',
      width: '25%',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('mobile'),
      dataIndex: 'Mobile',
      key: 'Mobile',
      render: record => <AppHandledEllipsisText record={record} />
    },
    {
      title: t('phone'),
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
    },
    {
      title: t('changeStatus'),
      dataIndex: 'StatusId',
      key: 'StatusId',
      render: (StatusId: number, raw: ILegalEntitiesItem) => {
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
    }
    // {
    //   title: '',
    //   key: 'actions',
    //   width: 0,
    //   render: (_, raw: ILegalEntitiesItem) => (
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

  const onSubmit: SubmitHandler<ILegalEntitiesFilter> = async (
    data: ILegalEntitiesFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<ILegalEntitiesFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  // Effect hook to fetch legalEntities list on component mount or when page/refreshComponent changes
  useEffect(() => {
    fetchLegalEntitiesList();
  }, [page, refreshComponent]);

  return (
    <div className="legalEntitiesContainer">
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
                title: t('legalEntities')
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
                setShowAddNewLegalEntityModal(true);
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
                      label={t('voen')}
                      name="Voen"
                      inputProps={{
                        id: 'Voen'
                      }}
                      // rules={{
                      //   minLength: {
                      //     value: formIsRequired ? 10 : 0,
                      //     message: minLengthCheck(
                      //       t("receivingLegalEntityVAT"),
                      //       '10'
                      //     )
                      //   },
                      //   maxLength: {
                      //     value: 10,
                      //     message: maxLengthCheck(
                      //       t("receivingLegalEntityVAT"),
                      //       '10'
                      //     )
                      //   },
                      //   pattern: {
                      //     value: /^\d{10}$/,
                      //     message: dictionary.az.voenRegexChecker
                      //   }
                      // }}
                      control={control}
                      required={false}
                      inputType="text"
                      placeholder={inputPlaceholderText(t('voen'))}
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
                        id: 'Address'
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
                      name="Mobile"
                      inputProps={{
                        id: 'Mobile'
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
                      placeholder={inputPlaceholderText(t('status'))}
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
          data={legalEntitiesData}
          currentPage={page}
          totalPage={totalPage}
          onChangePage={(e: number) => setCurrentPage(e)}
          rowKey="Id"
        />
      </Spin>

      {showAddNewLegalEntityModal && (
        <AddNewLegalEntityModal
          showAddNewLegalEntityModal={showAddNewLegalEntityModal}
          setShowAddNewLegalEntityModal={setShowAddNewLegalEntityModal}
          setRefreshComponent={setRefreshComponent}
        />
      )}

      {/* {selectedItem && showUpdateLegalEntityModal && (
        <EditNewLegalEntitiesModal
          showUpdateLegalEntityModal={showUpdateLegalEntityModal}
          setShowUpdateLegalEntityModal={setShowUpdateLegalEntityModal}
          setRefreshComponent={setRefreshComponent}
          selectedItem={selectedItem}
        />
      )} */}
    </div>
  );
}

export default LegalEntities;
