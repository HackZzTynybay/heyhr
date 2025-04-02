
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  onSelectChange?: (value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  options,
  onSelectChange,
}) => {
  if (type === 'select' && options) {
    return (
      <div className="mb-4">
        <Label htmlFor={name} className="block mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        <Select value={value} onValueChange={onSelectChange}>
          <SelectTrigger 
            id={name}
            className={`w-full ${error ? 'border-red-500' : ''}`}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
  
  if (type === 'date') {
    return (
      <div className="mb-4">
        <Label htmlFor={name} className="block mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          type="date"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Label htmlFor={name} className="block mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
