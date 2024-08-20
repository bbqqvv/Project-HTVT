import React from 'react';
import { CombinedRequestStudent } from './types';  // Adjust the path according to your project structure

interface StudentTableProps {
    students: CombinedRequestStudent[];
    onStudentClick: (id: string) => void;
    onStatusChange: (id: string, value: string) => void;
    onCheckedChange: (id: string, value: boolean) => void; // Changed type to boolean
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
    return (
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
                        <td className="border px-2 py-2 md:px-4">{student.student_id}</td>
                        <td className="border px-2 py-2 md:px-4">{student.student_name}</td> {/* Assuming student_name is correct */}
                        <td className="border px-2 py-2 md:px-4">{student.request_type}</td>
                        <td className="border px-2 py-2 md:px-4">{student.submission_date}</td>
                        <td className="border px-2 py-2 md:px-4 flex justify-center items-center space-x-2">
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
                                    onConfirm(student.request_id); // Trigger confirmation
                                    onCheckedChange(student.request_id, true); // Update checked status
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
    );
};

export default StudentRequestTable;
