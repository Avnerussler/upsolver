import { ChangeEvent } from 'react';
import './style.css';

interface SearchFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = ({ onChange, value }: SearchFieldProps) => (
  <input className="input-filter" value={value} onChange={onChange} />
);
