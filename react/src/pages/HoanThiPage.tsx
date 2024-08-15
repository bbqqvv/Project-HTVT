// src/pages/VangThiPage.tsx
import React, { useState, useEffect } from 'react';
import ExamTable from '../components/ExamTable';
import ActionPanel from '../components/ActionPanel';
import StatusPanel from '../components/StatusPanel';
import Modal from '../components/Modal';
import TopNotification from '../components/TopNotification';
import BottomNotification from '../components/BottomNotification';
import { useUser } from '../context/UserContext';

interface Course {
  course_id: string;
  [key: string]: any;
}

const HoanThiPage: React.FC = () => {
  const { id: student_id } = useUser(); // Lấy id từ context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  useEffect(() => {
    return () => {
      evidenceUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [evidenceUrls]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpload = (files: File[] | null) => {
    if (files) {
      const fileUrls = files.map(file => URL.createObjectURL(file));
      setEvidenceUrls(fileUrls);
    }
    setIsModalOpen(false);
  };

  const handleImageClick = (url: string) => {
    setSelectedImageUrl(url);
    setIsImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setSelectedImageUrl(null);
  };

  const handleSelectionChange = (selectedItems: Course[]) => {
    setSelectedCourses(selectedItems);
  };

  if (!student_id) {
    return <div>Vui lòng đăng nhập để tiếp tục.</div>;
  }

  return (
    <div className="bg-gray-100">
      <TopNotification />
      <ExamTable
        showCheckboxes={false}
        onSelectionChange={handleSelectionChange}
      />
      <div className="flex gap-4 mb-6">
        <ActionPanel
          onConfirm={handleModalOpen}
          onUpload={handleUpload}
          selectedCourses={selectedCourses}
          request_type="Hoãn thi"
        />
        <StatusPanel
          evidenceUrls={evidenceUrls}
          onImageClick={handleImageClick}
        />
      </div>
      {isModalOpen && (
        <Modal
          onClose={handleModalClose}
          onUpload={handleUpload}
        />
      )}
      {isImageModalOpen && selectedImageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleImageModalClose}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImageUrl}
              alt="Enlarged Evidence"
              className="max-w-full max-h-full"
            />
            <button
              className="mt-4 bg-gray-600 text-white rounded-lg py-2 px-4"
              onClick={handleImageModalClose}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      <BottomNotification />
    </div>
  );
};

export default HoanThiPage;

