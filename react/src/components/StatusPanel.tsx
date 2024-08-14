import React from 'react';

interface StatusPanelProps {
  evidenceUrls: string[];
  onImageClick: (url: string) => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ evidenceUrls, onImageClick }) => {
  return (
    <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Minh chứng đã tải lên</h3>
      <ul>
        {evidenceUrls.length > 0 ? (
          evidenceUrls.map((url, index) => (
            <li key={index} className="mb-2">
              <img
                src={url}
                alt={`Evidence ${index + 1}`}
                className="cursor-pointer w-full h-auto"
                onClick={() => onImageClick(url)} // Gọi hàm với url cụ thể
              />
            </li>
          ))
        ) : (
          <li>Chưa có minh chứng nào được tải lên.</li>
        )}
      </ul>
    </div>
  );
};

export default StatusPanel;
