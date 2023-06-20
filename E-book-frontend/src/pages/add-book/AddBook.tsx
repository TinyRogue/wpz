import { useTranslation } from 'react-i18next';
import TitleWrapper from '../../components/wrappers/titleWrapper/TitleWrapper';

const AddBook = () => {
  const { t } = useTranslation();

  return (
    <TitleWrapper title={t('addBook.title')}>
      <form>form here</form>
    </TitleWrapper>
  );
};

export default AddBook;
