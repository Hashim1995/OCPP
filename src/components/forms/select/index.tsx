import { Select, ConfigProvider, SelectProps, Empty } from 'antd';
import { t } from 'i18next';
// import { noDataText } from '@/utils/constants/texts';

function AppSelect(props: SelectProps) {
  const filterOption: any = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          description={t('noDataText')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    >
      <Select filterOption={filterOption} {...props} />
    </ConfigProvider>
  );
}

export default AppSelect;
