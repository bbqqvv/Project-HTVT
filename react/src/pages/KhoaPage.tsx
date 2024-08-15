import React, { useState } from 'react';
import Modal from 'react-modal';
import Pagination from '../components/Pagination';
import ModalStudent from '../components/ModalStudent';
import TableKhoa from '../components/TableKhoa';

export interface Student {
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

const initialStudents: Student[] = [
    {
        request_id: '1',
        student_id: '22IT.B239',
        request_type: 'Hoãn Thi',
        status: 1,
        submission_date: '2023-01-01',
        approved_by: null,
        evidence: 'minhchung.pnj',
        student_notes: '',
        faculty_notes: '',
        exam_department_notes: '',
        selected_courses: '',
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
    },
    {
        request_id: '2',
        student_id: '22IT.B239',
        request_type: 'Vắng Thi',
        status: 1,
        submission_date: '2023-01-01',
        approved_by: null,
        evidence: 'minhchung.pnj',
        student_notes: '',
        faculty_notes: '',
        exam_department_notes: '',
        selected_courses: '',
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
    },
    // Thêm các sinh viên khác nếu cần
];

const KhoaPage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const studentsPerPage = 8;
    const totalPages = Math.ceil(students.length / studentsPerPage);

    const handleConfirm = (id: string) => {
        const student = students.find((s) => s.request_id === id);
        if (student) {
            alert(`Đã gửi yêu cầu ${student.status === 1 ? 'Xét duyệt' : 'Từ chối'} cho sinh viên ${student.student_id}`);
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

    const handleNotesChange = (id: string, field: 'student_notes' | 'faculty_notes' | 'exam_department_notes', value: string) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.request_id === id ? { ...student, [field]: value } : student
            )
        );
    };

    const handleStatusChange = (id: string, value: string) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.request_id === id ? { ...student, status: parseInt(value) } : student
            )
        );
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    return (
        <div className="container mx-auto">
            <h1 className="text-center bg-white p-4 font-semibold text-2xl">
                THÔNG TIN HOÃN THI - VẮNG THI SINH VIÊN
            </h1>
            <TableKhoa
                students={currentStudents}
                onStudentClick={openModal}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
                onConfirm={handleConfirm}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {selectedStudent && (
                <ModalStudent
                    isOpen={isModalOpen}
                    onRequestClose={closeModal} 
                    request={null}                />
            )}
        </div>
    );
};

export default KhoaPage;
