import { Card } from 'antd';
import { t } from 'i18next';

function Footer() {
  // const { useToken } = theme;
  // const { token } = useToken();
  return (
    <Card
      className="box text-center box-margin-top "
      // style={{ backgroundColor: token.colorPrimary, color: token.colorWhite }}
    >
      {t('footerVersionText')}
    </Card>
  );
}

export default Footer;
