import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { firebaseAuth } from '../../api/firebase/firebase';
import { getPhrases } from '../../api/phrases/getPhrases';
import TitleWrapper from '../../components/wrappers/titleWrapper/TitleWrapper';
import { Container, Typography } from '@mui/material';

export interface IPhrase {
  phrase: string;
  translation: string;
  language: string;
}

const Phrases = () => {
  const userId = firebaseAuth.currentUser?.uid;

  const { t } = useTranslation();
  const [phrases, setPhrases] = useState<IPhrase[]>([]);
  const languagesLookup = new Map([
    ['en', 'angielski'],
    ['es', 'hiszpański'],
    ['fr', 'francuski'],
    ['de', 'niemiecki'],
  ]);

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
      <Container>
        {phrases.map((item, idx) => {
          return (
            <div
              key={idx}
              style={{
                borderRadius: 3,
                padding: '0 8px 16px 12px',
                lineHeight: 1.5,
                fontSize: '1.2em',
                borderLeft: '4px solid #333',
                marginBottom: 24,
              }}
            >
              <div>
                <Typography variant="caption">Fraza</Typography>
                <Typography variant="body1">{item.phrase}</Typography>
              </div>
              <div>
                <Typography variant="caption">Tłumaczenie na język {languagesLookup.get(item.language)}</Typography>
                <Typography variant="body1">{item.translation}</Typography>
              </div>
            </div>
          );
        })}
      </Container>
    </TitleWrapper>
  );
};

export default Phrases;
