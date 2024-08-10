import React from 'react';
import { useUser } from '../context/UserContext'; // Đảm bảo đường dẫn chính xác

const WelcomeMessage: React.FC = () => {
    const { name } = useUser();

    return (
        <span className="font-semibold text-[0.8rem]">
            Xin chào,<p>{name}</p>
        </span>
    );
};

export default WelcomeMessage;
