import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { firebaseAuth } from '../../api/firebase/firebase';
import { getPhrases } from '../../api/phrases/getPhrases';
import TitleWrapper from '../../components/wrappers/titleWrapper/TitleWrapper';

export interface IPhrase {
  phrase: string;
}

const Phrases = () => {
  const userId = firebaseAuth.currentUser?.uid;

  const { t } = useTranslation();
  const [phrases, setPhrases] = useState<IPhrase[]>([]);

  useEffect(() => {
    const getPhrasesFoo = async () => {
      if (userId) {
        const response = await getPhrases({ userId });

        // TODO: setPhrases Here to be checked when data will exist in bucket
        console.log(response?.data);
        if (response) {
          setPhrases(response.data);
        }
      }
    };

    getPhrasesFoo();
  }, []);

  return (
    <TitleWrapper title={t('phrases.title')}>
      <div>
        {phrases.map((item, idx) => (
          <p key={idx}>{item.phrase}</p>
        ))}
      </div>
    </TitleWrapper>
  );
};

export default Phrases;
