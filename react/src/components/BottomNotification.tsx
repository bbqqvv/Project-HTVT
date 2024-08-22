import React, { useState, useEffect } from 'react';

interface BottomNotificationProps {
  status: boolean;
  khaothiChecked: boolean;
  khoaChecked: boolean;
}

const BottomNotification: React.FC<BottomNotificationProps> = ({ status, khaothiChecked, khoaChecked }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Define the hardcoded download URL
  const downloadUrl = 'https://drive.google.com/drive/folders/11amHDoO814BmkkUjrw0R7DOknfxToYHK?usp=sharing';

  // Set countdown timer if the request is approved
  useEffect(() => {
    if (status && khaothiChecked && khoaChecked) {
      const endTime = new Date().getTime() + 42 * 60 * 60 * 1000; // 42 hours from now

      const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
          setTimeLeft(0);
          clearInterval(timer);
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft(hours * 3600 + minutes * 60 + seconds); // Total seconds
        }
      };

      const timer = setInterval(updateTimer, 1000);

      // Clean up interval on component unmount
      return () => clearInterval(timer);
    } else {
      setTimeLeft(0); // Reset timer if not applicable
    }
  }, [status, khaothiChecked, khoaChecked]);

  // Convert total seconds to HH:MM:SS format
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours}h ${minutes}m ${sec}s`;
  };

  let notificationMessage;
  let bgColor;
  let textColor;

  if (status && khaothiChecked) {
    notificationMessage = "Đơn của bạn đã được duyệt vui lòng tải biểu mẫu xác nhận gửi về phòng Khảo Thí trong vòng 42 giờ";
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
  } else if (status && khoaChecked && !khaothiChecked) {

    notificationMessage = "*Yêu cầu của bạn đang được xử lý. Vui lòng kiểm tra sau.";
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
  } else if (!status && !khaothiChecked) {
    notificationMessage = "*Lưu ý những sinh viên chưa hoàn thành học phí vui lòng nộp học phí để có thể gửi xét duyệt Hoãn thi và Vắng thi.";
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
  }
  return (
    <div className='bg-white h-[12rem] p-4 rounded-xl'>
      <div className={`w-full p-4 ${bgColor} ${textColor} border border-current rounded-lg shadow-lg`} style={{ zIndex: 1000 }}>
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            <i className={`fas ${status && khaothiChecked ? 'fa-check-circle' : (status ? 'fa-hourglass-half' : 'fa-exclamation-circle')} fa-2x`}></i>
          </div>
          <div className="flex-1 ml-3">
            <p className="text-lg font-semibold">
              {notificationMessage}
            </p>
            {status && khaothiChecked && (
              <p className="mt-2 text-lg font-medium">
                Thời gian còn lại: {formatTime(timeLeft)}
              </p>
            )}
          </div>
        </div>
        {status && khaothiChecked && (
          <div className='mt-4'>
            <a href={downloadUrl} className='text-white bg-[#36417A] no-underline hover:bg-blue-600 font-semibold rounded-sm py-2 px-4 inline-block'>
              Tải biểu mẫu về
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNotification;
