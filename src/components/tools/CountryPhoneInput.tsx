'use client';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CountryPhoneInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  required?: boolean;
}

export default function CountryPhoneInput({ value, onChange, required }: CountryPhoneInputProps) {
  return (
    <div className="phone-input-wrapper">
      <PhoneInput
        defaultCountry="AU"
        value={value}
        onChange={onChange}
        required={required}
        className="flex items-center w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-kinetic-teal focus-within:border-transparent"
        numberInputProps={{
          className:
            'flex-1 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none rounded-r-lg',
          placeholder: 'Phone number',
        }}
      />
    </div>
  );
}
