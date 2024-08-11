import React, { useState } from 'react';
import ExamTable from '../components/ExamTable';
import ActionPanel from '../components/ActionPanel';
import StatusPanel from '../components/StatusPanel';
import Modal from '../components/Modal';
import TopNotification from '../components/TopNotification';
import BottomNotification from '../components/BottomNotification';

interface Course {
  course_id: string;
  [key: string]: any; // Other properties of the course
}

const VangThiPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpload = (file: File | null) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setEvidenceUrl(fileUrl);
    }
    setIsModalOpen(false); // Close modal after upload
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
  };

  const handleSelectionChange = (selectedItems: Course[]) => {
    setSelectedCourses(selectedItems);
  };

  return (
    <div className="bg-gray-100">
      <TopNotification />
      <ExamTable
        showCheckboxes={true}
        onSelectionChange={handleSelectionChange}
      />
      <div className="flex gap-4 mb-6">
        <ActionPanel
          onConfirm={handleModalOpen} // Opens modal to confirm the action
          onUpload={handleUpload} // Handles the file upload
          selectedCourses={selectedCourses} // Pass the selected courses here
          requestType="Vắng thi"
        />
        <StatusPanel
          evidenceUrl={evidenceUrl}
          onImageClick={handleImageClick}
        />
      </div>
      {isModalOpen && (
        <Modal
          onClose={handleModalClose}
          onUpload={handleUpload} // Handles the file upload within the modal
        />
      )}
      {isImageModalOpen && evidenceUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleImageModalClose}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={evidenceUrl}
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

export default VangThiPage;
