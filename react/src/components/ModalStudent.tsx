import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface SelectedCourse {
    course_id: string;
    subject: string;
    lecturer: string;
    credits: number;
    examDate: string;
    examRoom: string;
    examTime: string;
    examType: string;
    status: string;
}

interface Student {
    student_id: string;
    student_name: string;
    faculty_id: string;
    major: string;
    class_name: string;
    phone_number: string;
    email: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

interface RequestData {
    request_id: string;
    student_id: string;
    request_type: string;
    status: number;
    submission_date: string;
    approved_by: string | null;
    evidence: string[];
    student_notes: string;
    faculty_notes: string;
    exam_department_notes: string;
    selected_courses: SelectedCourse[];
    created_at: string;
    updated_at: string;
    student: Student;
}

interface ModalStudentProps {
    isOpen: boolean;
    onRequestClose: () => void;
    request: RequestData | null;
}

// Set the app element globally
Modal.setAppElement('#root');

const ModalStudent: React.FC<ModalStudentProps> = ({ isOpen, onRequestClose, request }) => {
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && request) {
            const fetchCourses = async () => {
                setLoading(true);
                setError(null); // Reset error state

                try {
                    // Giả sử dữ liệu đã có sẵn từ prop request
                    setSelectedCourses(request.selected_courses);
                } catch (error) {
                    console.error('Error fetching selected courses:', error);
                    setError('Failed to fetch data. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };

            fetchCourses();
        }
    }, [isOpen, request]);

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-4xl">
                <h2 className="text-sm md:text-lg font-bold mb-4">
                    Thông tin chi tiết hoãn thi <i className='text-red-600'>{request?.student.student_name}</i>
                </h2>
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : selectedCourses.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="bg-gray-100 border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border px-2 py-2 md:px-4">Tên lớp học phần</th>
                                    <th className="border px-2 py-2 md:px-4">Giảng viên</th>
                                    <th className="border px-2 py-2 md:px-4">Số TC</th>
                                    <th className="border px-2 py-2 md:px-4">Hình thức thi</th>
                                    <th className="border px-2 py-2 md:px-4">Ngày thi</th>
                                    <th className="border px-2 py-2 md:px-4">Giờ thi</th>
                                    <th className="border px-2 py-2 md:px-4">Phòng thi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedCourses.map((course, index) => (
                                    <tr className="bg-white" key={index}>
                                        <td className="border px-2 py-2 md:px-4">{course.subject}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.lecturer}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.credits}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.examType}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.examDate}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.examTime}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.examRoom}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Không có thông tin lớp học phần.</p>
                )}
                <button
                    onClick={onRequestClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Đóng
                </button>
            </div>
        </Modal>
    );
};

export default ModalStudent;
