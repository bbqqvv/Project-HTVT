import React, { useState } from 'react';
import Modal from './Modal';
import { useUser } from '../context/UserContext';

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
    const { id: student_id } = useUser(); // Lấy id từ context
    const [student_notes, setStudentNotes] = useState<string>(''); // Đổi studentNotes thành chuỗi
    const [evidenceFiles, setEvidenceFiles] = useState<File[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hàm tạo request_id mới
    const generateRequestId = (): string => {
        const currentCount = Number(localStorage.getItem('request_id_count') || '0');
        const newCount = currentCount + 1;
        localStorage.setItem('request_id_count', newCount.toString());
        return `RQ${newCount.toString().padStart(4, '0')}`;
    };

    const handleConfirm = async () => {
        const request_id = generateRequestId(); // Tạo request_id mới

        console.log('Request ID:', request_id);
        console.log('Loại yêu cầu:', request_type);
        console.log('Ghi chú của sinh viên:', student_notes);
        console.log('Tệp minh chứng:', evidenceFiles);
        console.log('Môn học đã chọn:', selectedCourses);
        console.log('Student ID:', student_id);

        if (!student_id) {
            alert('Student ID không hợp lệ. Vui lòng đăng nhập lại.');
            return;
        }

        const formData = new FormData();
        formData.append('request_id', request_id); // Thêm request_id vào formData
        formData.append('student_notes', student_notes); // Ghi chú của sinh viên là chuỗi đơn
        formData.append('request_type', request_type);
        formData.append('student_id', student_id); // Sử dụng student_id từ context

        if (request_type === 'Vắng thi') {
            // Thêm môn học đã chọn vào formData
            selectedCourses.forEach((course, index) => {
                formData.append(`selected_courses[${index}][course_id]`, course.course_id);
            });
        } else if (request_type === 'Hoãn thi') {
            // Lấy tất cả môn học của sinh viên và thêm vào formData
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/student_courses/${student_id}`);
                if (!response.ok) {
                    throw new Error('Lỗi khi lấy danh sách môn học');
                }
                const data = await response.json();
                console.log('Dữ liệu nhận được từ API:', data); // Thêm log để kiểm tra dữ liệu

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
                onConfirm(student_notes, evidenceFiles, selectedCourses); // Gọi hàm onConfirm để thực hiện hành động sau khi gửi dữ liệu thành công
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


    const handleUpload = () => {
        setIsModalOpen(true);
    };

    const handleFileUpload = (files: File[] | null) => {
        setEvidenceFiles(files);
        onUpload(files);
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
                value={student_notes} // Hiển thị ghi chú của sinh viên
                onChange={(e) => setStudentNotes(e.target.value)} // Cập nhật giá trị ghi chú
            />
            <div className='w-4/6'>
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
