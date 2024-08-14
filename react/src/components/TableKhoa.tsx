import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    selected_courses: string;
    created_at: string;
    updated_at: string;
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

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/requests');

                // Kiểm tra kiểu dữ liệu trả về từ API
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Dữ liệu không phải là một mảng:', response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 mt-2">
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <tr key={student.request_id} className="hover:bg-gray-100 text-xs md:text-sm">
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {student.student_id}
                            </td>
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {/* Replace with student's name if available */}
                                {student.student_id}
                            </td>
                            <td className="border px-2 py-2 md:px-4 cursor-pointer" onClick={() => onStudentClick(student)}>
                                {student.request_type}
                            </td>
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {new Date(student.submission_date).toLocaleDateString()}
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                {/* You can display the evidence in some format */}
                                {student.evidence}
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <textarea
                                    className="border rounded p-1 w-full text-xs md:text-sm"
                                    value={student.student_notes}
                                    readOnly
                                />
                            </td>

                            <td className="border px-2 py-2 md:px-4">
                                <textarea
                                    className="border rounded p-1 w-full text-xs md:text-sm"
                                    value={student.faculty_notes}
                                    onChange={(e) => onNotesChange(student.request_id, 'faculty_notes', e.target.value)}
                                />
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <select
                                    className="border rounded p-1 text-xs md:text-sm"
                                    value={student.status || "Xét duyệt"}
                                    onChange={(e) => onStatusChange(student.request_id, e.target.value)}
                                >
                                    <option value="1">Xét duyệt</option>
                                    <option value="0">Từ chối</option>
                                </select>
                                <button
                                    onClick={() => onConfirm(student.request_id)}
                                    className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                                >
                                    Xác nhận
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableKhoa;
