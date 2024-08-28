import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext'; // Ensure the path is correct
import ImageModal from './ImageModal'; // Ensure the path is correct

interface Status {
  id: string;
  status: boolean;
  khoa_checked: boolean;
  khaothi_checked: boolean;
  khoa_bg_color: string;
  khaothi_bg_color: string;
  faculty_note: string; // Add faculty_note field
  evidence: string; // Store evidence as a string
}

interface StatusPanelProps {
  evidenceUrls: string[];
  onImageClick: (url: string) => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ onImageClick }) => {

  const { id: student_id } = useUser(); // Get student_id from UserContext
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const fetchStatuses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/requests');
      const data = await response.json();

      if (Array.isArray(data)) {
        const filteredData = data.filter((request: any) => request.student_id === student_id);

        const updatedStatuses = filteredData.map((request: any) => {
          let khoaColor = '#a9aaaa'; // Default color for Khoa
          let khaothiColor = '#a9aaaa'; // Default color for Khảo Thí

          if (request.status) {
            if (request.khoa_checked === 1 && request.khaothi_checked === 0) {
              khoaColor = '#3C9D97'; // Color when Khoa is checked
            } else if (request.khoa_checked === 1 && request.khaothi_checked === 1) {
              khaothiColor = '#3C9D97'; // Color when Khảo Thí is checked
              khoaColor = '#3C9D97'; // Color when Khoa is checked
            }
          }

          return {
            id: request.request_id,
            status: request.status === 1,
            khoa_checked: request.khoa_checked === 1,
            khaothi_checked: request.khaothi_checked === 1,
            khoa_bg_color: khoaColor,
            khaothi_bg_color: khaothiColor,
            faculty_note: request.faculty_notes,
            evidence: request.evidence // Store evidence as a string
          };
        });

        setStatuses(updatedStatuses);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  useEffect(() => {
    if (student_id) {
      fetchStatuses();
    }
  }, [student_id]);

  const handleImageClick = (url: string) => {
    setSelectedImageUrl(url);
    setIsImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setSelectedImageUrl(null);
  };
  return (
    <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='md:w-2/3'>
          <h3 className="text-lg font-bold mb-4">Xét duyệt</h3>
          <div className='flex flex-col space-y-2'>
            {statuses.map((status, index) => (
              <div
                key={index}
                className='font-semibold text-white flex items-center rounded-full p-2 w-[6rem]'
                style={{ backgroundColor: status.khoa_bg_color }}
              >
                <span className='flex-1'>{status.khoa_checked ? 'Khoa' : 'Khoa'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1-1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
            ))}
          </div>

          <div className='flex flex-col space-y-2 mt-2'>
            {statuses.map((status, index) => (
              <div
                key={index}
                className='font-semibold text-white flex items-center rounded-full p-2 w-[9rem]'
                style={{ backgroundColor: status.khaothi_bg_color }}
              >
                <span className='flex-1'>{status.khaothi_checked ? 'P.Khảo Thí' : 'P.Khảo Thí'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1-1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
        
        <div className='md:w-2/4'>
          <h3 className="text-lg font-bold mb-4">Minh chứng đã tải lên</h3>
          <div className="border px-2 py-2 md:px-4 flex flex-wrap gap-2">
            {statuses.flatMap((status) =>
              JSON.parse(status.evidence).map((image: string, index: number) => (
                
                <img
                  key={index}
                  src={`http://127.0.0.1:8000${image.replace(/\\/g, '')}`}
                  alt={`evidence-${index}`}
                  className="w-[50%] cursor-pointer object-cover rounded"
                  onClick={() => handleImageClick(`http://127.0.0.1:8000${image.replace(/\\/g, '')}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <hr className='my-4' />
      <div className='text-[1rem] text-white font-semibold bg-black'>
        Ghi chú Khoa: {statuses.length > 0 && statuses[0].faculty_note}
      </div>


      <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={selectedImageUrl}
        onClose={handleImageModalClose}
      />

    </div>
  );
};

export default StatusPanel;
