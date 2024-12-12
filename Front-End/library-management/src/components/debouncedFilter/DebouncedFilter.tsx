import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
interface Props {
  label: string;
  placeholder?: string;
  focused?: boolean;
  onChange: (value: string) => void;
}
const DebouncedFilter = ({
  label,
  focused = false,
  placeholder = '',
  onChange,
}: Props) => {
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const timing = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);
    return () => clearTimeout(timing);
  }, [value]);
  useEffect(() => {
    onChange(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  return (
    <TextField
      id='search'
      label={label}
      placeholder={placeholder}
      variant='filled'
      fullWidth
      focused={focused}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default DebouncedFilter;
