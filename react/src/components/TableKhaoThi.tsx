// components/TableKhaoThi.tsx
import React from 'react';

export interface Student {
    id: number;
    studentId: string;
    name: string;
    requestType: string;
    submissionDate: string;
    certificate: string;
    studentNotes: string;
    departmentName: string; // Thêm thông tin khoa duyệt
    status: string;
}

interface TableKhaoThiProps {
    students: Student[];
    onStudentClick: (student: Student) => void;
    onStatusChange: (id: number, value: string) => void;
    onNotesChange: (id: number, field: 'studentNotes' | 'departmentNotes', value: string) => void;
    onConfirm: (id: number) => void;
}

const TableKhaoThi: React.FC<TableKhaoThiProps> = ({ students, onStudentClick, onStatusChange, onNotesChange, onConfirm }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 mt-2">
                <thead>
                    <tr>
                        <th className="border px-2 py-2 md:px-4">STT</th>
                        <th className="border px-2 py-2 md:px-4">Mã sinh viên</th>
                        <th className="border px-2 py-2 md:px-4">Tên sinh viên</th>
                        <th className="border px-2 py-2 md:px-4">Loại yêu cầu</th>
                        <th className="border px-2 py-2 md:px-4">Ngày nộp</th>
                        <th className="border px-2 py-2 md:px-4">Minh chứng</th>
                        <th className="border px-2 py-2 md:px-4">Khoa Duyệt</th> {/* Thêm cột Khoa Duyệt */}
                        <th className="border px-2 py-2 md:px-4">Ghi chú SV</th>
                        <th className="border px-2 py-2 md:px-4">Ghi chú Khảo Thí</th>
                        <th className="border px-2 py-2 md:px-4">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-100 text-xs md:text-sm">
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {index + 1}
                            </td>
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {student.studentId}
                            </td>
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {student.name}
                            </td>
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {student.requestType}
                            </td>
                            <td className="border px-2 py-2 md:px-4" onClick={() => onStudentClick(student)}>
                                {student.submissionDate}
                            </td>
                            <td className="border px-2 py-2 md:px-4">{student.certificate}</td>
                            <td className="border px-2 py-2 md:px-4">{student.departmentName}</td> {/* Thêm cột Khoa Duyệt */}
                            <td className="border px-2 py-2 md:px-4">
                                <textarea
                                    className="border rounded p-1 w-full text-xs md:text-sm"
                                    value={student.studentNotes}
                                    onChange={(e) => onNotesChange(student.id, 'studentNotes', e.target.value)}
                                />
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <textarea
                                    placeholder='Khoa ghi chú tại đây'
                                    className="border rounded p-1 w-full text-xs md:text-sm"
                                    value={""}
                                    onChange={(e) => onNotesChange(student.id, 'departmentNotes', e.target.value)}
                                />
                            </td>
                            <td className="border px-2 py-2 md:px-4">
                                <select
                                    className="border rounded p-1 text-xs md:text-sm"
                                    value={student.status}
                                    onChange={(e) => onStatusChange(student.id, e.target.value)}
                                >
                                    <option value="Xét duyệt">Xét duyệt</option>
                                    <option value="Từ chối">Từ chối</option>
                                    <option value="Chưa xử lý">Chưa xử lý</option>
                                </select>
                                <button
                                    onClick={() => onConfirm(student.id)}
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

export default TableKhaoThi;
