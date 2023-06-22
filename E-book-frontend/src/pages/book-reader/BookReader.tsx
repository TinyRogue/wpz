import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { ReactReader } from 'react-reader';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../api/books/getBooks';
import { firebaseAuth } from '../../api/firebase/firebase';
import { IBook } from '../dashboard/Dashboard';

export const BookReader = () => {
  const userId = firebaseAuth.currentUser?.uid;
  const [book, setBook] = useState<IBook | null>(null);
  const [bookUrl, setBookUrl] = useState('');
  const [location, setLocation] = useState<any>();

  const locationChanged = (epubcifi: any) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
  };

  const { id } = useParams();
  const storage = getStorage();

  useEffect(() => {
    const getBooksFoo = async () => {
      if (userId) {
        const response = await getBooks({ userId });

        // TODO: setBooksHere to be checked when data will exist in bucket
        if (response && id) {
          setBook(response.data[+id - 1]);

          const dataBookUrl = await getDownloadURL(ref(storage, response.data[+id - 1].bodyRef));
          setBookUrl(dataBookUrl);
        }
      }
    };

    getBooksFoo();
  }, []);

  return (
    <div className="w-full h-screen">
      {bookUrl && book && (
        <ReactReader location={location} locationChanged={locationChanged} title={book.title} url={bookUrl} />
      )}
    </div>
  );
};
