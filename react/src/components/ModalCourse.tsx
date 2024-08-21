import React from 'react';
import Modal from 'react-modal';  // Ensure you have react-modal installed

interface Course {
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

interface ModalCourseProps {
    isOpen: boolean;
    onRequestClose: () => void;
    request: any;  // Adjust according to your request type
    loading: boolean;
    error: string | null;
    selectedCourses?: Course[];  // Make this optional and default to empty array
}

const ModalCourse: React.FC<ModalCourseProps> = ({
    isOpen,
    onRequestClose,
    request,
    loading,
    error,
    selectedCourses = []  // Default to empty array
}) => {
    // Ensure selectedCourses is always an array
    const coursesArray = Array.isArray(selectedCourses) ? selectedCourses : [];

    // Debugging function to log prop values
    const logProps = () => {
        console.log("ModalCourse Component Props:");
        console.log("isOpen:", isOpen);
        console.log("Loading:", loading);
        console.log("Error:", error);
        console.log("Selected Courses:", coursesArray);
        console.log("Request:", request);
    };

    // Call the logProps function when the component mounts or props change
    React.useEffect(() => {
        logProps();
    }, [isOpen, loading, error, selectedCourses, request]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            role="dialog"
        >
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-4xl">
                <h2 id="modal-title" className="text-sm md:text-lg font-bold mb-4">
                    Thông tin chi tiết hoãn thi <i className='text-red-600'>{request?.student?.student_name || 'N/A'}</i>
                </h2>
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : coursesArray.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="bg-gray-100 border border-gray-300 w-full">
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
                                {coursesArray.map((course, index) => (
                                    <tr className="bg-white" key={course.course_id}>
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

export default ModalCourse;
