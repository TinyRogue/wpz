import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { ReactReader } from 'react-reader';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../api/books/getBooks';
import { firebaseAuth } from '../../api/firebase/firebase';
import { IBook } from '../dashboard/Dashboard';
import { useContextMenu } from '../../hooks/useContextMenu';
import { ContextMenu } from './ContextMenu/ContextMenu';
import { postExplain, postPhrase } from '../../api/phrases/postPhrase';
import { toast } from 'react-toastify';

export const BookReader = () => {
  const userId = firebaseAuth.currentUser?.uid;
  const readerRef = useRef<any>(null);
  const [book, setBook] = useState<IBook | null>(null);
  const [bookUrl, setBookUrl] = useState('');
  const [location, setLocation] = useState<any>();
  const { ref: contextMenuRef, isVisible, setVisibility } = useContextMenu();
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [translation, setTranslation] = useState('');
  const [translateLoading, setTranslateLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleTextSelected = (cfiRange: string) => {
    if (!readerRef.current) return;
    if (readerRef.current) {
      const text = readerRef.current.getRange(cfiRange).toString();
      setCurrentPhrase(text);
      setVisibility(true);
    }
  };

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

  const handleOnChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleTranslate = async () => {
    setTranslateLoading(true);
    try {
      const response = await postPhrase({ userId: userId as string, phrase: currentPhrase, language: language });
      setTranslation(response.data);
    } catch (e: unknown) {
      setTranslation(JSON.stringify(e));
    } finally {
      setTranslateLoading(false);
    }
  };

  const handleExplain = async () => {
    setExplanationLoading(true);
    try {
      const response = await postExplain({ userId: userId as string, phrase: currentPhrase, language });
      setExplanation(response.data);
    } catch (e: unknown) {
      setExplanation(JSON.stringify(e));
    } finally {
      setExplanationLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentPhrase);
    toast.success('Skopiowano frazę do schowka!', { position: 'bottom-right' });
  };

  return (
    <div className="w-full h-screen" ref={contextMenuRef}>
      {isVisible && (
        <ContextMenu
          translateLoading={translateLoading}
          onTranslate={handleTranslate}
          translation={translation}
          explanationLoading={explanationLoading}
          onExplain={handleExplain}
          explanation={explanation}
          onCopy={handleCopy}
          onLanguageChange={handleOnChange}
          onClose={() => {
            setVisibility(false);
            setCurrentPhrase('');
            setTranslation('');
          }}
          languageValue={language}
          x={36}
          y={36}
          phrase={currentPhrase}
        />
      )}
      {bookUrl && book && (
        <ReactReader
          ref={readerRef}
          location={location}
          locationChanged={locationChanged}
          title={book.title}
          url={bookUrl}
          handleTextSelected={cfiRange => handleTextSelected(cfiRange)}
          getRendition={rendition => {
            readerRef.current = rendition;
          }}
        />
      )}
    </div>
  );
};
