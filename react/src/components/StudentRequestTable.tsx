import React, { useState } from 'react';
import { CombinedRequestStudent } from './types'; // Adjust the path as per your project structure
import { Course } from './course'; // Adjust the path as per your project structure
import { ModalCourse } from './ModalCourse';
import ImageModal from './ImageModal'; // Import ImageModal
import DateComponent from './DateComponent'; // Đảm bảo đường dẫn đúng
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

interface StudentTableProps {
    students: CombinedRequestStudent[];
    onStudentClick: (id: string) => void;
    onStatusChange: (id: string, value: string) => void;
    onCheckedChange: (id: string, value: boolean) => void;
    onNotesChange: (id: string, field: keyof CombinedRequestStudent, value: string) => void;
    onConfirm: (id: string) => void;
    searchTerm: string;
    sortConfig: { key: keyof CombinedRequestStudent; direction: 'ascending' | 'descending' } | null;
    handleSort: (key: keyof CombinedRequestStudent) => void;
    filteredData: CombinedRequestStudent[];
    openModal: (image: string) => void;
    reviewerNotesHeader: string;
}

const StudentRequestTable: React.FC<StudentTableProps> = ({
    onStatusChange,
    onCheckedChange,
    onNotesChange,
    onConfirm,
    sortConfig,
    handleSort,
    filteredData,
    openModal,
    reviewerNotesHeader,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<CombinedRequestStudent | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]); // Update type to Course[]
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

    // State for ImageModal
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const handleConfirm = () => {
        if (selectedRequestId) {
            onConfirm(selectedRequestId);
            setIsModalOpen(false);
            toast.success('Yêu cầu đã được xác nhận!');
        }
    };
    const fetchCourseDetails = async (courseIds: string[]): Promise<Course[]> => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseIds }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', response.status, errorText);
                throw new Error('Failed to fetch course details');
            }

            const result = await response.json();

            if (result.data && Array.isArray(result.data)) {
                return result.data; // Return the array from the `data` field
            } else {
                console.error('Unexpected response data format:', result);
                throw new Error('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            setError('Failed to fetch course details');
            return [];
        }
    };



    const handleCellClick = async (student: CombinedRequestStudent) => {
        console.log('Selected Student:', student);
        setSelectedRequest(student);

        const parsedCourses = student.selected_courses ? JSON.parse(student.selected_courses) : [];
        const courseIds = parsedCourses.map((course: { course_id: string }) => course.course_id);

        try {
            setLoading(true); // Show loading state
            const courseDetails = await fetchCourseDetails(courseIds);

            // Log the courseDetails to verify its structure
            console.log('Course Details:', courseDetails);

            // Check if courseDetails is an array and set it accordingly
            if (Array.isArray(courseDetails)) {
                setSelectedCourses(courseDetails);
            } else {
                console.error('Unexpected courseDetails format:', courseDetails);
                setError('Unexpected format for course details');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            setError('Failed to fetch course details');
        } finally {
            setLoading(false); // Hide loading state
        }

        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const openImageModal = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImageUrl(null);
    };

    return (
        <>
            <div className="overflow-x-auto">

                <table className="min-w-full bg-white border border-gray-300 mt-2 text-xs md:text-sm">
                    <thead>
                        <tr>
                            <th className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleSort('student_id')}>
                                Mã sinh viên {sortConfig?.key === 'student_id' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                            </th>
                            <th className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleSort('student_id')}>
                                Tên sinh viên {sortConfig?.key === 'student_id' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                            </th>
                            <th className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleSort('request_type')}>
                                Loại yêu cầu {sortConfig?.key === 'request_type' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                            </th>
                            <th className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleSort('submission_date')}>
                                Ngày nộp {sortConfig?.key === 'submission_date' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                            </th>
                            <th className="border px-2 py-2 md:px-4">Minh chứng</th>
                            <th className="border px-2 py-2 md:px-4">Ghi chú SV</th>
                            <th className="border px-2 py-2 md:px-4">{reviewerNotesHeader}</th>
                            <th className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleSort('status')}>
                                Trạng thái {sortConfig?.key === 'status' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                            </th>
                            <th className="border px-2 py-2 md:px-4">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((student) => (
                            <tr
                                key={student.request_id}
                                className={`hover:bg-gray-100 ${student.khoa_checked ? 'bg-gray-200' : ''}`} // Updated class based on checked status
                            >
                                <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleCellClick(student)}>
                                    {student.student_id}
                                </td>
                                <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleCellClick(student)}>
                                    {student.student?.student_name || 'Không có tên'}
                                </td>
                                <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleCellClick(student)}>
                                    {student.request_type}
                                </td>
                                <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => handleCellClick(student)}>
                                    <DateComponent dateString={student.submission_date} />
                                </td>
                                <td className="border px-2 py-2 md:px-4 flex justify-center items-center space-x-2">
                                    {JSON.parse(student.evidence).map((image: string, index: number) => {
                                        // Check if URL starts with http or https, otherwise add local prefix
                                        const imageUrl = image.startsWith('http') ? image : `http://127.0.0.1:8000${image.replace(/\\/g, '')}`;
                                        return (
                                            <img
                                                key={index}
                                                src={imageUrl}
                                                alt={`evidence-${index}`}
                                                className="w-12 h-12 cursor-pointer object-cover rounded"
                                                onClick={() => openImageModal(imageUrl)}
                                            />
                                        );
                                    })}
                                </td>
                                <td className="border px-2 py-2 md:px-4">
                                    <textarea
                                        className="border rounded p-1 w-full text-xs md:text-sm"
                                        value={student.student_notes || ''}
                                        readOnly
                                    />
                                </td>
                                <td className="border px-2 py-2 md:px-4">
                                    <input
                                        className="border rounded p-1 w-full text-xs md:text-sm"
                                        value={student.faculty_notes || ''}
                                        onChange={(e) => onNotesChange(student.request_id, 'faculty_notes', e.target.value)}
                                        disabled={student.is_updated}
                                    />
                                </td>
                                <td className="border px-2 py-2 md:px-4">
                                    <select
                                        className="border rounded p-1 w-full text-xs md:text-sm"
                                        value={student.status.toString()}
                                        onChange={(e) => onStatusChange(student.request_id, e.target.value)}
                                        disabled={student.is_updated}
                                    >
                                        <option value="1">Xét duyệt</option>
                                        <option value="0">Từ chối</option>
                                    </select>
                                </td>
                                <td className="border px-2 py-2 md:px-4">
                                    <button
                                        onClick={() => {
                                            setSelectedRequestId(student.request_id);
                                            setIsModalOpen(true);
                                            onCheckedChange(student.request_id, true);
                                        }}
                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                                        disabled={student.khoa_checked} // Disable if already checked
                                    >
                                        Xác nhận
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Course Details */}
            {isModalOpen && selectedRequest && (
                <ModalCourse
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    request={selectedRequest}
                    loading={loading}
                    error={error}
                    selectedCourses={selectedCourses} />
            )}
            <ConfirmationModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                message="Bạn có chắc chắn muốn xác nhận yêu cầu này không?"
            />
            {/* Modal for Image Preview */}
            {isImageModalOpen && selectedImageUrl && (
                <ImageModal
                    isOpen={isImageModalOpen}
                    imageUrl={selectedImageUrl}
                    onClose={closeImageModal}
                />
            )}
        </>
    );
};

export default StudentRequestTable;
