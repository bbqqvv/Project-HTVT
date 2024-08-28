import React from 'react';
import Modal from 'react-modal';  // Ensure you have react-modal installed
import { CombinedRequestStudent } from './types';

interface Course {
    course_id: string;
    course_name: string;
    instructor: string;
    credits: number;
    exam_format: string;
    exam_date: string;
    exam_time: string;
    exam_room: string;
}

interface ModalCourseProps {
    isOpen: boolean;
    onRequestClose: () => void;
    request: CombinedRequestStudent;  // Adjust the type to match your request data
    loading: boolean;
    error: string | null;
    selectedCourses: Course[];  // Ensure this is provided
}

export const ModalCourse: React.FC<ModalCourseProps> = ({
    isOpen,
    onRequestClose,
    request,
    loading,
    error,
    selectedCourses
}) => {
    // Convert selected_courses from request to array of course IDs
    let courseIds: string[] = [];
    try {
        courseIds = request.selected_courses ? JSON.parse(request.selected_courses).map((course: { course_id: string }) => course.course_id) : [];
        console.log("Course IDs from request:", courseIds);
    } catch (e) {
        console.error("Error parsing selected_courses:", e);
    }

    // Ensure selectedCourses is an array
    if (!Array.isArray(selectedCourses)) {
        console.error("selectedCourses is not an array:", selectedCourses);
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-8"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                role="dialog"
            >
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-3xl overflow-auto">
                    <p>Không có thông tin lớp học phần.</p>
                    <button
                        onClick={onRequestClose}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Đóng
                    </button>
                </div>
            </Modal>
        );
    }

    // Filter selectedCourses based on courseIds
    const coursesArray = selectedCourses.filter(course =>
        courseIds.includes(course.course_id)
    );

    // Log filtered courses array
    console.log("Filtered Courses Array:", coursesArray);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-8"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            role="dialog"
        >
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-3xl overflow-auto">
                <h2 id="modal-title" className="text-sm md:text-lg font-bold mb-4">
                    Thông tin môn học đã chọn của Sinh Viên <i className='text-red-600'>{request.student?.student_name || 'N/A'}</i>
                </h2>
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : coursesArray.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="bg-gray-100 border border-gray-300 w-full min-w-max">
                            <thead>
                                <tr>
                                    <th className="border px-2 py-2 md:px-4 text-left">Tên lớp học phần</th>
                                    <th className="border px-2 py-2 md:px-4 text-left">Giảng viên</th>
                                    <th className="border px-2 py-2 md:px-4 text-left">Số TC</th>
                                    <th className="border px-2 py-2 md:px-4 text-left">Hình thức thi</th>
                                    <th className="border px-2 py-2 md:px-4 text-left">Ngày thi</th>
                                    <th className="border px-2 py-2 md:px-4 text-left">Giờ thi</th>
                                    <th className="border px-2 py-2 md:px-4 text-left">Phòng thi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursesArray.map((course) => (
                                    <tr className="bg-white" key={course.course_id}>
                                        <td className="border px-2 py-2 md:px-4">{course.course_name}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.instructor}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.credits}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.exam_format}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.exam_date}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.exam_time}</td>
                                        <td className="border px-2 py-2 md:px-4">{course.exam_room}</td>
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
