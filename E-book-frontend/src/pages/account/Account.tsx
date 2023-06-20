import { useTranslation } from 'react-i18next';
import TitleWrapper from '../../components/wrappers/titleWrapper/TitleWrapper';

const Account = () => {
  const { t } = useTranslation();

  return (
    <TitleWrapper title={t('account.title')}>
      <p>test</p>
    </TitleWrapper>
  );
};

export default Account;
