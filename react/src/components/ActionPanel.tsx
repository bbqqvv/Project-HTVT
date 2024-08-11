import React, { useState } from 'react';
import Modal from './Modal';

interface Course {
    course_id: string;
    // Add other properties if needed
}

interface ActionPanelProps {
    onConfirm: (studentNotes: string, evidenceUrl: string | null, selectedCourses: Course[]) => void;
    onUpload: (file: File | null) => void;
    selectedCourses: Course[];
    requestType: string; // Thêm thuộc tính requestType
}

const ActionPanel: React.FC<ActionPanelProps> = ({ onConfirm, onUpload, selectedCourses = [], requestType }) => {
    const [studentNotes, setStudentNotes] = useState('');
    const [evidenceUrl, setEvidenceUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = async () => {
        console.log('Loại yêu cầu:', requestType); // In loại yêu cầu
        console.log('Ghi chú của sinh viên:', studentNotes);
        console.log('URL minh chứng:', evidenceUrl);
        console.log('Môn học đã chọn:', selectedCourses);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentNotes,
                    evidenceUrl,
                    selectedCourses,
                    requestType, // Thêm requestType vào dữ liệu gửi
                }),
            });

            const data = await response.json();
            console.log('Phản hồi từ API:', data);

            if (response.ok) {
                alert('Dữ liệu đã được gửi thành công!');
                onConfirm(studentNotes, evidenceUrl, selectedCourses);
            } else {
                console.error('Lỗi khi gửi dữ liệu:', data);
                alert('Có lỗi xảy ra khi gửi dữ liệu.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            alert('Có lỗi xảy ra khi gửi dữ liệu.');
        }
    };

    const handleUpload = () => {
        setIsModalOpen(true);
    };

    const handleFileUpload = (file: File | null) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setEvidenceUrl(fileUrl);
            onUpload(file);
        }
        setIsModalOpen(false); // Đóng modal sau khi tải lên
    };

    return (
        <div className="flex bg-white shadow-md rounded-lg p-4 w-2/3 space-x-5">
            <div className="flex flex-col gap-4 mb-4 w-2/6">
                <button
                    className="bg-[#36417A] text-white rounded-lg py-2"
                    onClick={handleConfirm}
                >
                    Xác nhận
                </button>
                <button
                    className="bg-[#9FA041] text-white rounded-lg py-2"
                    onClick={handleUpload}
                >
                    Tải minh chứng
                </button>
            </div>
            <textarea
                className="w-full p-2 border rounded-lg"
                placeholder="Ghi chú của sinh viên nếu có"
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
            />
            <div className=' w-4/6'>
                <h3><b>Môn học đã chọn:</b></h3>
                <ul className='text-red-600'>
                    {selectedCourses.length > 0 ? (
                        selectedCourses.map((course, index) => (
                            <li key={index}>{course.course_id}</li>
                        ))
                    ) : (
                        <li>Chưa có môn học nào được chọn.</li>
                    )}
                </ul>
            </div>
            {isModalOpen && (
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    onUpload={handleFileUpload}
                />
            )}
        </div>
    );
};

export default ActionPanel;
