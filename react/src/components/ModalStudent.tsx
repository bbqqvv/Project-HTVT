import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface SelectedCourse {
    courseName: string;
    instructor: string;
    credits: number;
    examFormat: string;
    examDate: string;
    examTime: string;
    examRoom: string;
}

interface ModalStudentProps {
    isOpen: boolean;
    onRequestClose: () => void;
    student: { student_id: string } | null;
}

// Set the app element globally
Modal.setAppElement('#root');

const ModalStudent: React.FC<ModalStudentProps> = ({ isOpen, onRequestClose, student }) => {
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && student) {
            const fetchCourses = async () => {
                setLoading(true);
                setError(null); // Reset error state

                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/requests/selected_courses?studentId=${student.student_id}`);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data: SelectedCourse[] = await response.json();
                    console.log('Selected courses data:', data);
                    setSelectedCourses(data);
                } catch (error) {
                    console.error('Error fetching selected courses:', error);
                    setError('Failed to fetch data. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };

            fetchCourses();
        }
    }, [isOpen, student]);

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-4xl">
                <h2 className="text-sm md:text-lg font-bold mb-4">
                    Thông tin chi tiết hoãn thi <i className='text-red-600'>{student?.student_id}</i>
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
                                        <td className="border px-2 py-2 md:px-4">{course.courseName}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.instructor}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.credits}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.examFormat}</td>
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
