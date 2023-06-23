import React, { FC } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageOption from '../LanguageOption/LanguageOption';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface ContextMenuProps {
  x: number;
  y: number;
  phrase?: string;
  languageValue: string;
  onLanguageChange: (value: any) => void;
  onClose: () => void;
  onTranslate: () => void;
  onCopy: () => void;
  translation?: string;
  translateLoading?: boolean;
}

export const ContextMenu: FC<ContextMenuProps> = ({
  x,
  y,
  phrase,
  languageValue,
  onLanguageChange,
  onClose,
  onTranslate,
  onCopy,
  translation,
  translateLoading,
}) => {
  return (
    <div
      style={{
        top: y,
        right: x,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0 3px 8px',
        borderRadius: 6,
        maxWidth: 700,
      }}
      className="fixed z-10 bg-white p-2"
    >
      <div className="relative top-0 left-0 z-10 flex flex-row" style={{ height: 40 }}>
        <LanguageOption value={languageValue} onChange={onLanguageChange} />
        <Button onClick={onTranslate} className="mx-2 z-20">
          <TranslateIcon fontSize="small" />
          Przetłumacz
        </Button>
        <Button onClick={onCopy} className="mx-2 z-20">
          <ContentCopyIcon fontSize="small" />
          Skopiuj
        </Button>
        <IconButton onClick={onClose} style={{ marginLeft: 'auto' }}>
          <Close />
        </IconButton>
      </div>
      <div className="m-3">
        <span>
          <strong>Fraza: </strong>
        </span>
        {phrase}
      </div>
      {(translateLoading || translation) && (
        <div className="m-3">
          <span>
            <strong>Tłumaczenie i wyjaśnienie: </strong>
          </span>
          {translateLoading ? <CircularProgress size={16} /> : <span>{translation}</span>}
        </div>
      )}
    </div>
  );
};
