import React, { FC } from 'react';
import { MenuItem, Select } from '@mui/material';

interface LanguageSelectProps {
  languages?: { value: string; label: string }[];
  value: any;
  onChange: (value: any) => void;
}

const LanguageSelect: FC<LanguageSelectProps> = ({ languages, onChange, value }) => {
  const langs = languages ?? [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  return (
    <Select value={value} defaultValue={langs[0]} onChange={onChange}>
      {langs.map(language => (
        <MenuItem key={language.value} value={language.value}>
          {language.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelect;
