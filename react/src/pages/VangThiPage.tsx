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
  course_name: string;
}

const VangThiPage: React.FC = () => {
  const { id: student_id } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const [khaothi_checked, setKhaothiChecked] = useState<boolean>(false);
  const [khoa_checked, setKhoaChecked] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data for student_id:', student_id);

      if (!student_id) {
        console.error('No student_id provided');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/requests');
        const data = await response.json();
        console.log("API Data:", data);

        const studentRequest = data.find((request: any) => request.student_id === student_id);
        console.log("Filtered Request Data:", studentRequest);

        if (studentRequest) {
          setStatus(studentRequest.status === 1);
          setKhaothiChecked(studentRequest.khaothi_checked === 1);
          setKhoaChecked(studentRequest.khoa_checked === 1);

        } else {
          console.log("No request data found for student_id:", student_id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [student_id]);


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

  const handleConfirm = async () => {
    if (!student_id) {
      alert('Vui lòng đăng nhập để tiếp tục.');
      return;
    }

    const formData = new FormData();
    formData.append('request_id', generateRequestId()); // Tạo request_id mới
    formData.append('request_type', 'Vắng thi');
    formData.append('student_id', student_id);

    selectedCourses.forEach((course, index) => {
      formData.append(`selected_courses[${index}][course_id]`, course.course_id);
      formData.append(`selected_courses[${index}][course_name]`, course.course_name);
    });

    if (evidenceUrls.length > 0) {
      evidenceUrls.forEach((url, index) => {
        formData.append(`evidence[${index}]`, url);
      });
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/requests', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Yêu cầu vắng thi đã được gửi thành công!');
        setSelectedCourses([]); // Xóa môn học đã chọn sau khi gửi
        setEvidenceUrls([]); // Xóa các file đã tải lên
      } else {
        console.error('Lỗi khi gửi dữ liệu:', data);
        alert('Có lỗi xảy ra khi gửi yêu cầu.');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Lỗi khi gửi dữ liệu:', error.message);
        alert('Có lỗi xảy ra khi gửi yêu cầu.');
      } else {
        console.error('Đã xảy ra lỗi không xác định:', error);
        alert('Có lỗi xảy ra khi gửi yêu cầu.');
      }
    }
  };

  const generateRequestId = (): string => {
    const currentCount = Number(localStorage.getItem('request_id_count') || '0');
    const newCount = currentCount + 1;
    localStorage.setItem('request_id_count', newCount.toString());
    return `RQ${newCount.toString().padStart(4, '0')}`;
  };

  if (!student_id) {
    return <div>Vui lòng đăng nhập để tiếp tục.</div>;
  }

  return (
    <div className="bg-gray-100">
      <TopNotification />
      <ExamTable
        showCheckboxes={true}
        onSelectionChange={handleSelectionChange}
        student_id={student_id || ''} // Truyền student_id từ state/context
      />

      <div className="flex gap-4 mb-6">
        <ActionPanel
          onConfirm={handleConfirm}
          onUpload={handleUpload}
          selectedCourses={selectedCourses}
          request_type="Vắng thi"
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
      <BottomNotification status={status} khaothiChecked={khaothi_checked} khoaChecked={khoa_checked} />
    </div>
  );
};

export default VangThiPage;
