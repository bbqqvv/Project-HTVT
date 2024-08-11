// StatusButton.tsx
import React from 'react';

interface StatusButtonProps {
  label: string;
}

const StatusButton: React.FC<StatusButtonProps> = ({ label }) => {
  return (
    <button className="bg-[#3c9d97] text-white rounded-full py-1 px-2 hover:bg-[#2a7d76] transition-colors">
      {label}
    </button>
  );
};

export default StatusButton;
