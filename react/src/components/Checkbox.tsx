// src/components/Checkbox.tsx

import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
    );
};

export default Checkbox;
