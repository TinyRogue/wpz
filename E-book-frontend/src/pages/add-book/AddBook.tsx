import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { postBook } from '../../api/books/postBook';
import { firebaseAuth } from '../../api/firebase/firebase';
import { PrimaryButton } from '../../components/common/buttons/PrimaryButton';
import { Input } from '../../components/common/inputs/Input';
import TitleWrapper from '../../components/wrappers/titleWrapper/TitleWrapper';
import { routes } from '../../static/routes';

const AddBook = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<any>(null);
  const [image, setImage] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!firebaseAuth.currentUser?.uid) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userId', firebaseAuth.currentUser!.uid);
      formData.append('title', title);
      formData.append('file', file);
      formData.append('image', image);

      await postBook(formData);

      setTitle('');
      setFile(null);
      setImage(null);

      navigate(routes.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TitleWrapper title={t('addBook.title')}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <label>Title:</label>
          <Input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label>File (EPUB):</label>
          <input
            type="file"
            accept=".epub"
            onChange={e => {
              if (e.target.files) setFile(e.target.files[0]);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Image (PNG):</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={e => {
              if (e.target.files) setImage(e.target.files[0]);
            }}
          />
        </div>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </TitleWrapper>
  );
};

export default AddBook;
