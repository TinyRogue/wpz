import React, { FC } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TranslateIcon from '@mui/icons-material/Translate';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
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
  onCopy: () => void;
  onTranslate: () => void;
  translation?: string;
  translateLoading?: boolean;
  onExplain: () => void;
  explanation?: string;
  explanationLoading?: boolean;
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
  explanationLoading,
  explanation,
  onExplain,
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
      <div className="relative top-0 left-0 z-10 flex flex-row gap-2" style={{ height: 40 }}>
        <LanguageOption value={languageValue} onChange={onLanguageChange} />
        <Button onClick={onTranslate} className="mx-2 z-20" sx={{ color: '#333333' }}>
          <TranslateIcon fontSize="small" />
          Przetłumacz
        </Button>
        <Button onClick={onExplain} className="mx-2 z-20" sx={{ color: '#333333' }}>
          <QuestionMarkIcon fontSize="small" />
          Wyjaśnij znaczenie
        </Button>
        <Button onClick={onCopy} className="mx-2 z-20" sx={{ color: '#333333' }}>
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
            <strong>Tłumaczenie: </strong>
          </span>
          {translateLoading ? <CircularProgress size={16} /> : <span>{translation}</span>}
        </div>
      )}
      {(explanationLoading || explanation) && (
        <div className="m-3">
          <span>
            <strong>Wyjaśnienie: </strong>
          </span>
          {explanationLoading ? <CircularProgress size={16} /> : <span>{explanation}</span>}
        </div>
      )}
    </div>
  );
};
