import React from 'react';
import { typo } from '@/lib/typography';
import FieldLabel from './FieldLabel';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={htmlFor} className="block">
        <FieldLabel>{label}</FieldLabel>
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className={`mt-1 ${typo.caption}`}>{hint}</p>
      ) : null}
    </div>
  );
}
