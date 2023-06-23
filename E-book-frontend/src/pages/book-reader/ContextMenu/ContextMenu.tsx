import React, { FC } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageOption from '../LanguageOption/LanguageOption';

interface ContextMenuProps {
  x: number;
  y: number;
  phrase?: string;
  languageValue: string;
  onChange: (value: any) => void;
}

export const ContextMenu: FC<ContextMenuProps> = ({ x, y, phrase, languageValue, onChange }) => {
  const options = [
    <>
      <TranslateIcon fontSize="small" />
      Przetłumacz
    </>,
    <>
      <ContentCopyIcon fontSize="small" />
      Skopiuj
    </>,
  ];

  return (
    <div
      style={{
        top: y,
        left: x,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0 3px 8px',
        borderRadius: 6,
        minWidth: '300px',
        maxWidth: '550px',
      }}
      className="fixed z-10 bg-white p-2"
    >
      <div className="relative top-0 left-0 z-10 flex flex-row">
        <LanguageOption value={languageValue} onChange={onChange}></LanguageOption>
        {React.Children.toArray(
          options.map(opt => (
            <button className="rounded-full m-1 border-gray-200 border px-3 py-1 hover:bg-red z-20">{opt}</button>
          )),
        )}
      </div>
      <div className="m-3">
        <span>
          <strong>Fraza: </strong>
        </span>
        {phrase}
      </div>
    </div>
  );
};
