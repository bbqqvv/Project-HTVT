import React, { useState } from 'react';
import Modal from 'react-modal';
import Pagination from '../components/Pagination';
import ModalStudent from '../components/ModalStudent';
import TableKhoa from '../components/TableKhoa';

export interface Student {
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
    {
        id: 5,
        studentId: '22IT.B249',
        name: 'Mai Nguyễn',
        requestType: 'Vắng Thi',
        submissionDate: '01/01/2023',
        certificate: 'minhchung.pnj',
        studentNotes: '',
        departmentNotes: '',
        status: 'Xét duyệt',
    },

    // Thêm các sinh viên khác nếu cần
];

const KhoaPage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const studentsPerPage = 8; // Number of students per page
    const totalPages = Math.ceil(students.length / studentsPerPage);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const handleStudentClick = (student: Student) => {
        openModal(student);
    };

    return (
        <div className="container mx-auto p-4">
            <TableKhoa
                students={students}
                onStudentClick={handleStudentClick}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
                onConfirm={handleConfirm}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <ModalStudent
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                student={selectedStudent}
            />
        </div>
    );
};

export default KhoaPage;
