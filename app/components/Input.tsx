import React from 'react';

const InputStyle =
  'text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  ...props
}) => {
  return (
    <div className={`${className} w-full md:w-auto`}>
      <label className={'block mb-2'}>{label}</label>
      <input className={InputStyle} type="text" {...props} />
      {error && <p className={'text-red-500 mt-2'}>{error}</p>}
    </div>
  );
};
