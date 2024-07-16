import { Empty, EmptyProps } from 'antd';
import { t } from 'i18next';
// import { noDataText } from "@/utils/constants/texts";

function AppEmpty(props: EmptyProps) {
  return (
    <Empty
      description={props?.description || t('empty')}
      image={props?.image || Empty.PRESENTED_IMAGE_SIMPLE}
      {...props}
    />
  );
}

export default AppEmpty;
