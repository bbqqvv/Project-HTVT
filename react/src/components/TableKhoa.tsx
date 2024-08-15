import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';

interface Student {
    request_id: string;
    student_id: string;
    request_type: string;
    status: number;
    submission_date: string;
    approved_by: string | null;
    evidence: string;
    student_notes: string;
    faculty_notes: string;
    exam_department_notes: string;
    selected_courses: [];
    created_at: string;
    updated_at: string;
    is_confirmed: boolean;  // Trạng thái đã được xác nhận
    is_updated: boolean;    // Trạng thái đã được cập nhật
}

interface TableStudentProps {
    students: Student[];
    onStudentClick: (student: Student) => void;
    onStatusChange: (id: string, value: string) => void;
    onNotesChange: (id: string, field: 'student_notes' | 'faculty_notes' | 'exam_department_notes', value: string) => void;
    onConfirm: (id: string) => void;
}

const TableKhoa: React.FC<TableStudentProps> = ({ students, onStudentClick, onStatusChange, onNotesChange, onConfirm }) => {
    const [data, setData] = useState<Student[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchStudents = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/requests');
            const responseData = await response.json();

            if (Array.isArray(responseData)) {
                setData(responseData);
            } else {
                console.error('Dữ liệu không phải là một mảng:', responseData);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleConfirm = async (id: string) => {
        try {
            const student = data.find((s) => s.request_id === id);
            if (!student || student.is_confirmed) return;

            const updatedStudent = {
                ...student,
                is_confirmed: true,
                is_updated: true, // Đánh dấu đã được cập nhật
                selected_courses: Array.isArray(student.selected_courses) ? student.selected_courses : [],
            };

            const response = await fetch(`http://127.0.0.1:8000/api/requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });

            if (response.ok) {
                // Cập nhật trạng thái của student trong data
                setData((prevData) =>
                    prevData.map((s) => (s.request_id === id ? { ...s, is_confirmed: true, is_updated: true } : s))
                );
                setSuccessMessage('Xác nhận thành công!');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                const errorData = await response.json();
                console.error('Lỗi khi xác nhận:', errorData);
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error('Lỗi khi xác nhận:', error);
        }
    };


    const openModal = (image: string) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };

    const handleStatusChange = (id: string, value: string) => {
        const updatedData = data.map((student) =>
            student.request_id === id && !student.is_updated ? { ...student, status: parseInt(value) } : student
        );
        setData(updatedData);
    };

    const handleNotesChange = (id: string, field: 'student_notes' | 'faculty_notes' | 'exam_department_notes', value: string) => {
        const updatedData = data.map((student) =>
            student.request_id === id && !student.is_updated ? { ...student, [field]: value } : student
        );
        setData(updatedData);
    };

    return (
        <div className="overflow-x-auto">
            {successMessage && (
                <div className="bg-green-500 text-white p-2 mb-2 rounded">
                    {successMessage}
                </div>
            )}
            <table className="min-w-full bg-white border border-gray-300 mt-2 text-xs md:text-sm">
                <thead>
                    <tr>
                        <th className="border px-2 py-2 md:px-4">Mã sinh viên</th>
                        <th className="border px-2 py-2 md:px-4">Tên sinh viên</th>
                        <th className="border px-2 py-2 md:px-4">Loại yêu cầu</th>
                        <th className="border px-2 py-2 md:px-4">Ngày nộp</th>
                        <th className="border px-2 py-2 md:px-4">Minh chứng</th>
                        <th className="border px-2 py-2 md:px-4">Ghi chú SV</th>
                        <th className="border px-2 py-2 md:px-4">Ghi chú KHOA</th>
                        <th className="border px-2 py-2 md:px-4">Trạng thái</th>
                        <th className="border px-2 py-2 md:px-4">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <tr
                            key={student.request_id}
                            className={`hover:bg-gray-100 ${student.is_confirmed ? 'bg-gray-200' : ''}`}
                        >
                            <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => onStudentClick(student)}>
                                {student.student_id}
                            </td>
                            <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => onStudentClick(student)}>
                                {student.student_id}
                            </td>
                            <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => onStudentClick(student)}>
                                {student.request_type}
                            </td>
                            <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => onStudentClick(student)}>
                                {new Date(student.submission_date).toLocaleDateString()}
                            </td>
                            <td className="px-2 py-2 md:px-4 flex justify-center items-center space-x-2">
                                {JSON.parse(student.evidence).map((image: string, index: number) => (
                                    <img
                                        key={index}
                                        src={`http://127.0.0.1:8000${image.replace(/\\/g, '')}`}
                                        alt={`evidence-${index}`}
                                        className="w-12 h-12 cursor-pointer object-cover rounded"
                                        onClick={() => openModal(`http://127.0.0.1:8000${image.replace(/\\/g, '')}`)}
                                    />
                                ))}
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <textarea
                                    className="border rounded p-1 w-full text-xs md:text-sm"
                                    value={student.student_notes || ""}
                                    readOnly
                                />
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <input
                                    className="border rounded p-1 w-full text-xs md:text-sm"
                                    value={student.faculty_notes || ""}
                                    onChange={(e) => handleNotesChange(student.request_id, 'faculty_notes', e.target.value)}
                                    disabled={student.is_updated}
                                />
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <select
                                    className="border rounded p-1 w-full text-xs md:text-sm"
                                    value={student.status.toString()}
                                    onChange={(e) => handleStatusChange(student.request_id, e.target.value)}
                                    disabled={student.is_updated}
                                >
                                    <option value="1">Xét duyệt</option>
                                    <option value="0">Từ chối</option>
                                </select>
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <button
                                    onClick={() => handleConfirm(student.request_id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                                    disabled={student.is_confirmed}
                                >
                                    Xác nhận
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
                <button onClick={closeModal} className="absolute top-2 right-2 text-xl">×</button>
                {selectedImage && <img src={selectedImage} alt="Evidence" className="w-full h-full object-contain" />}
            </Modal>
        </div>
    );
};

export default TableKhoa;
