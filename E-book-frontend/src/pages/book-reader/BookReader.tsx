import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { ReactReader } from 'react-reader';
import { useParams } from 'react-router-dom';
import { getBooks } from '../../api/books/getBooks';
import { firebaseAuth } from '../../api/firebase/firebase';
import { IBook } from '../dashboard/Dashboard';
import { useContextMenu } from '../../hooks/useContextMenu';
import { ContextMenu } from './ContextMenu/ContextMenu';

export const BookReader = () => {
  const userId = firebaseAuth.currentUser?.uid;
  const readerRef = useRef<any>(null);
  const [book, setBook] = useState<IBook | null>(null);
  const [bookUrl, setBookUrl] = useState('');
  const [location, setLocation] = useState<any>();
  const { ref: contextMenuRef, position, isVisible, setVisibility } = useContextMenu();
  const [currentPhrase, setCurrentPhrase] = useState('');
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

  return (
    <div className="w-full h-screen" ref={contextMenuRef}>
      {isVisible && (
        <ContextMenu
          languageValue={language}
          onChange={handleOnChange}
          x={position.x}
          y={position.y}
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