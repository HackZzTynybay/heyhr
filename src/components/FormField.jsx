
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

const FormField = ({
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
  icon,
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
            className={`w-full ${error ? 'border-red-500' : ''} ${icon ? 'pl-9' : ''}`}
          >
            {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
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
        <div className="relative">
          {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
          <Input
            type="date"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full ${error ? 'border-red-500' : ''} ${icon ? 'pl-9' : ''}`}
          />
        </div>
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
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
        <Input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${error ? 'border-red-500' : ''} ${icon ? 'pl-9' : ''}`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
