import React, { useState } from 'react';
import Modal from 'react-modal';

interface Student {
    id: number;
    studentId: string;
    name: string;
    requestType: string;
    submissionDate: string;
    certificate: string;
    studentNotes: string;
    departmentNotes: string;
    status: string;
}

const initialStudents: Student[] = [
    {
        id: 1,
        studentId: '22IT.B239',
        name: 'BÙI QUỐC VĂN',
        requestType: 'Hoãn Thi',
        submissionDate: '01/01/2023',
        certificate: 'minhchung.pnj',
        studentNotes: '',
        departmentNotes: '',
        status: 'Xét duyệt',
    },
    {
        id: 2,
        studentId: '22IT.B239',
        name: 'KIM SA',
        requestType: 'Vắng Thi',
        submissionDate: '01/01/2023',
        certificate: 'minhchung.pnj',
        studentNotes: '',
        departmentNotes: '',
        status: 'Xét duyệt',
    },
    {
        id: 3,
        studentId: '22IT.B239',
        name: 'La Bàn',
        requestType: 'Hoãn Thi',
        submissionDate: '01/01/2023',
        certificate: 'minhchung.pnj',
        studentNotes: '',
        departmentNotes: '',
        status: 'Xét duyệt',
    },
    {
        id: 4,
        studentId: '22IT.B239',
        name: 'KAKAK ROT',
        requestType: 'Vắng Thi',
        submissionDate: '01/01/2023',
        certificate: 'minhchung.pnj',
        studentNotes: '',
        departmentNotes: '',
        status: 'Xét duyệt',
    },

    // Thêm các sinh viên khác nếu cần
];

const StudentTable: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 6;

    const handleConfirm = (id: number) => {
        const student = students.find((s) => s.id === id);
        if (student) {
            alert(`Đã gửi yêu cầu ${student.status} cho sinh viên ${student.name}`);
        }
    };

    const openModal = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    const handleNotesChange = (id: number, field: 'studentNotes' | 'departmentNotes', value: string) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, [field]: value } : student
            )
        );
    };

    const handleStatusChange = (id: number, value: string) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, status: value } : student
            )
        );
    };

    // Tính toán số sinh viên cần hiển thị trên mỗi trang
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    return (
        <div className="container mx-auto w-full">
            <div className='bg-white pb-1 pt-2'>
                <h1 className="text-center text-2xl font-bold mb-4">THÔNG TIN HOÀN THI - VẮNG THI SINH VIÊN</h1>
            </div>
            <table className="min-w-full bg-white border border-gray-300 mt-2">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Mã sinh viên</th>
                        <th className="border px-4 py-2">Tên sinh viên</th>
                        <th className="border px-4 py-2 cursor-pointer">Loại yêu cầu</th>
                        <th className="border px-4 py-2">Ngày nộp</th>
                        <th className="border px-4 py-2">Minh chứng</th>
                        <th className="border px-4 py-2">Ghi chú SV</th>
                        <th className="border px-4 py-2">Ghi chú KHOA</th>
                        <th className="border px-4 py-2">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student) => (
                        <tr
                            key={student.id}
                            className="hover:bg-gray-100"
                        >
                            <td
                                className="border px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal(student)}
                            >
                                {student.id}
                            </td>
                            <td
                                className="border px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal(student)}
                            >
                                {student.studentId}
                            </td>
                            <td
                                className="border px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal(student)}
                            >
                                {student.name}
                            </td>
                            <td
                                className="border px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => openModal(student)}
                            >
                                {student.requestType}
                            </td>
                            <td
                                className="border px-4 py-2 hover:bg-gray-100"
                                onClick={() => openModal(student)}
                            >
                                {student.submissionDate}
                            </td>
                            <td className="border px-4 py-2">{student.certificate}</td>
                            <td className="border px-4 py-2">
                                <textarea
                                    className="border rounded p-1 w-full"
                                    value={student.studentNotes}
                                    onChange={(e) => handleNotesChange(student.id, 'studentNotes', e.target.value)}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <textarea
                                    placeholder='Khoa ghi chú tại đây'
                                    className="border rounded p-1 w-full"
                                    value={student.departmentNotes}
                                    onChange={(e) => handleNotesChange(student.id, 'departmentNotes', e.target.value)}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <select
                                    className="border rounded p-1"
                                    value={student.status}
                                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                                >
                                    <option value="Xét duyệt">Xét duyệt</option>
                                    <option value="Từ chối">Từ chối</option>
                                </select>
                                <button
                                    onClick={() => handleConfirm(student.id)}
                                    className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Xác nhận
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center z-50 ">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-sm font-bold mb-4">Thông tin chi tiết hoãn thi <i className='text-red-600'>Bui Quoc Van</i> </h2>
                    {selectedStudent && (
                        <div>
                            <table className=" bg-gray-100 border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">Tên lớp học phần</th>
                                        <th className="border px-4 py-2">Giảng viên</th>
                                        <th className="border px-4 py-2">Số TC</th>
                                        <th className="border px-4 py-2">Hình thức thi</th>
                                        <th className="border px-4 py-2">Ngày thi</th>
                                        <th className="border px-4 py-2">Giờ thi</th>
                                        <th className="border px-4 py-2">Phòng thi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white'>
                                        <td className="border px-4 py-2">Môn học A</td>
                                        <td className="border px-4 py-2">Giảng viên A</td>
                                        <td className="border px-4 py-2">3</td>
                                        <td className="border px-4 py-2">Thi viết</td>
                                        <td className="border px-4 py-2">10/06/2024</td>
                                        <td className="border px-4 py-2">08:00</td>
                                        <td className="border px-4 py-2">Phòng 101</td>
                                    </tr>
                                    <tr className='bg-white'>
                                        <td className="border px-4 py-2">Môn học A</td>
                                        <td className="border px-4 py-2">Giảng viên A</td>
                                        <td className="border px-4 py-2">3</td>
                                        <td className="border px-4 py-2">Thi viết</td>
                                        <td className="border px-4 py-2">10/06/2024</td>
                                        <td className="border px-4 py-2">08:00</td>
                                        <td className="border px-4 py-2">Phòng 101</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded float-end">Đóng</button>
                </div>
            </Modal>
        </div>
    );
};

export default StudentTable;
