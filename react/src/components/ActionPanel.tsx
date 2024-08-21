import React, { useState } from 'react';
import Modal from './Modal'; // Modal used for uploading
import { useUser } from '../context/UserContext';
import ConfirmationModal from './ConfirmationModal';

interface Course {
    course_id: string;
    [key: string]: any;
}

interface ActionPanelProps {
    onConfirm: (student_notes: string, evidenceFiles: File[] | null, selectedCourses: Course[]) => void;
    onUpload: (files: File[] | null) => void;
    selectedCourses: Course[];
    request_type: string;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ onConfirm, onUpload, selectedCourses = [], request_type }) => {
    const { id: student_id } = useUser(); // Get id from context
    const [student_notes, setStudentNotes] = useState<string>('');
    const [evidenceFiles, setEvidenceFiles] = useState<File[] | null>(null);
    const [evidencePreviews, setEvidencePreviews] = useState<string[]>([]);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const generateRequestId = (): string => {
        const currentCount = Number(localStorage.getItem('request_id_count') || '0');
        const newCount = currentCount + 1;
        localStorage.setItem('request_id_count', newCount.toString());
        return `RQ${newCount.toString().padStart(4, '0')}`;
    };

    const handleConfirm = async () => {
        const request_id = generateRequestId();

        if (request_type === 'Vắng thi' && selectedCourses.length === 0) {
            alert('Vui lòng chọn ít nhất một môn học.');
            return;
        }

        if (request_type === 'Hoãn thi' && !evidenceFiles) {
            alert('Bạn cần tải lên ít nhất một tệp minh chứng.');
            return;
        }

        const formData = new FormData();
        formData.append('request_id', request_id);
        formData.append('student_notes', student_notes);
        formData.append('request_type', request_type);
        formData.append('student_id', student_id);

        if (request_type === 'Vắng thi') {
            selectedCourses.forEach((course, index) => {
                formData.append(`selected_courses[${index}][course_id]`, course.course_id);
            });
        } else if (request_type === 'Hoãn thi') {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/student_courses/${student_id}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi lấy danh sách môn học');
                }
                const data = await response.json();
                console.log('Dữ liệu nhận được từ API:', data);

                if (Array.isArray(data)) {
                    data.forEach((course: { course_id: string }, index: number) => {
                        formData.append(`selected_courses[${index}][course_id]`, course.course_id);
                    });
                } else {
                    console.error('Dữ liệu trả về không phải là mảng:', data);
                    alert('Có lỗi xảy ra khi xử lý dữ liệu môn học.');
                    return;
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách môn học:', error);
                alert('Có lỗi xảy ra khi lấy danh sách môn học.');
                return;
            }
        }

        if (evidenceFiles) {
            evidenceFiles.forEach((file, index) => {
                formData.append(`evidence[${index}]`, file);
            });
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/requests', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Phản hồi từ API:', data);

            if (response.ok) {
                alert('Dữ liệu đã được gửi thành công!');
                onConfirm(student_notes, evidenceFiles, selectedCourses);
                setIsConfirmationModalOpen(false);
            } else {
                console.error('Lỗi khi gửi dữ liệu:', data);
                alert('Có lỗi xảy ra khi gửi dữ liệu.');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Lỗi khi gửi dữ liệu:', error.message);
                alert('Có lỗi xảy ra khi gửi dữ liệu.');
            } else {
                console.error('Đã xảy ra lỗi không xác định:', error);
                alert('Có lỗi xảy ra khi gửi dữ liệu.');
            }
        }
    };

    const openConfirmationModal = () => {
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const openUploadModal = () => {
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleFileUpload = (files: File[] | null) => {
        if (files) {
            setEvidenceFiles(files);

            // Create preview URLs for the uploaded files
            const previews = files.map(file => URL.createObjectURL(file));
            setEvidencePreviews(previews);
        } else {
            setEvidenceFiles(null);
            setEvidencePreviews([]);
        }
        onUpload(files);
        closeUploadModal();
    };

    return (
        <div className="flex bg-white shadow-md rounded-lg p-4 w-2/3 space-x-5">
            <div className="flex flex-col gap-4 mb-4 w-2/6">
                <button
                    className="bg-[#36417A] text-white rounded-lg py-2"
                    onClick={openConfirmationModal}
                >
                    Xác nhận
                </button>
                <ConfirmationModal
                    isOpen={isConfirmationModalOpen}
                    onRequestClose={closeConfirmationModal}
                    onConfirm={handleConfirm}
                    message="Bạn có chắc chắn muốn thực hiện hành động này?"
                />
                <button
                    className="bg-[#9FA041] text-white rounded-lg py-2"
                    onClick={openUploadModal}
                >
                    Tải minh chứng
                </button>
            </div>
            <textarea
                className="w-full p-2 border rounded-lg"
                placeholder="Ghi chú của sinh viên nếu có"
                value={student_notes}
                onChange={(e) => setStudentNotes(e.target.value)}
            />
            <div className='w-4/6 flex justify-between'>
                <div className=''>
                    <h3><b>Môn học đã chọn:</b></h3>
                    <ul className='text-red-600'>
                        {selectedCourses.length > 0 ? (
                            selectedCourses.map((course, index) => (
                                <li key={course.course_id}>{course.course_id}</li>
                            ))
                        ) : (
                            <li>Chưa có môn học nào được chọn.</li>
                        )}
                    </ul>
                </div>
                {isUploadModalOpen && (
                    <Modal
                        onClose={closeUploadModal}
                        onUpload={handleFileUpload}
                    />
                )}
                {evidencePreviews.length > 0 && (
                    <div className="w-2/6">
                        <h3><b>Xem trước:</b></h3>
                        <div className="flex flex-wrap gap-2">
                            {evidencePreviews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview-${index}`}
                                    className="w-[60%] object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>y
        </div>
    );
};

export default ActionPanel;
