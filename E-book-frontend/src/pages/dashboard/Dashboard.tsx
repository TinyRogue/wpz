import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBooks } from '../../api/books/getBooks';
import { firebaseAuth } from '../../api/firebase/firebase';
import TitleWrapper from '../../components/wrappers/titleWrapper/TitleWrapper';
import { BookCard } from './components/BookCard';

export interface IBook {
  title: string;
  bodyRef: string;
  imageRef: string;
}

const Dashboard = () => {
  const userId = firebaseAuth.currentUser?.uid;

  const { t } = useTranslation();
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const getBooksFoo = async () => {
      if (userId) {
        const response = await getBooks({ userId });

        if (response) {
          setBooks(response.data);
        }
      }
    };

    getBooksFoo();
  }, []);

  return (
    <TitleWrapper title={t('dashboard.title')}>
      <div className="relative flex flex-wrap gap-4">
        {books.map((item, idx) => (
          <BookCard key={idx} book={item} id={`${idx + 1}`} />
        ))}
      </div>
    </TitleWrapper>
  );
};

export default Dashboard;
