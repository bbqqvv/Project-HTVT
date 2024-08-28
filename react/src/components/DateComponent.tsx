import React from 'react';

const DateComponent: React.FC<{ dateString: string }> = ({ dateString }) => {
    // Tạo đối tượng Date từ chuỗi ngày giờ
    const date = new Date(dateString);

    // Định dạng ngày tháng theo dd/mm/yy
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear().toString().slice(-2); // Lấy hai chữ số cuối của năm

    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div>
            {formattedDate}
        </div>
    );
};

export default DateComponent;
