import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../static/routes';
import { IBook } from '../Dashboard';

interface BookCardProps {
  book: IBook;
  id: string;
}

export const BookCard = ({ book, id }: BookCardProps) => {
  const navigate = useNavigate();

  const storage = getStorage();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const getBookAndTitle = async () => {
      const dataImageUrl = await getDownloadURL(ref(storage, book.imageRef));

      setImageUrl(dataImageUrl);
    };

    getBookAndTitle();
  });

  return (
    <div
      className="flex flex-col items-center justify-center w-auto p-4 rounded-md cursor-pointer hover:bg-gray-300"
      onClick={() => {
        navigate(paths.book(id));
      }}
    >
      {imageUrl && (
        <>
          <h2 className="pb-4 text-xl font-medium">{book.title}</h2>
          <img src={imageUrl} />
        </>
      )}
    </div>
  );
};
