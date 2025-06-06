import React from 'react';

export default function InputField({ label, name, value, onChange, type = 'text' }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required />
    </div>
  );
}