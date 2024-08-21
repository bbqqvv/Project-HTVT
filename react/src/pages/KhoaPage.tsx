import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import ModalStudent from '../components/ModalStudent';
import TableKhoa from '../components/TableKhoa';
import { CombinedRequestStudent } from '../components/types';

const KhoaPage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [approvedStudents, setApprovedStudents] = useState<CombinedRequestStudent[]>([]); // State for approved students
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<CombinedRequestStudent | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const studentsPerPage = 8;

    // Fetch students data from API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/requests');
                const data: CombinedRequestStudent[] = await response.json();
                setStudents(data);
                setApprovedStudents(data.filter(student => student.is_confirmed)); // Initialize approved students
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Handle confirming student's status
    const handleConfirm = async (id: string) => {
        const student = students.find((s) => s.request_id === id);
        if (student) {
            try {
                // Send the confirmation request to the server
                const response = await fetch(`http://127.0.0.1:8000/api/requests/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...student, is_confirmed: true }),
                });

                if (response.ok) {
                    // Update local state
                    setStudents((prev) =>
                        prev.map((s) =>
                            s.request_id === id ? { ...s, is_confirmed: true } : s
                        )
                    );
                    // Update approved students list
                    setApprovedStudents((prev) => [...prev, { ...student, is_confirmed: true }]);
                } else {
                    console.error('Failed to confirm student');
                }
            } catch (error) {
                console.error('Error confirming student:', error);
            }
        }
    };

    // Open modal with selected student information
    const openModal = (student: CombinedRequestStudent) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    // Handle note changes for a student
    const handleNotesChange = (id: string, field: 'student_notes' | 'faculty_notes' | 'exam_department_notes', value: string) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.request_id === id ? { ...student, [field]: value } : student
            )
        );
    };

    // Handle status changes for a student
    const handleStatusChange = (id: string, value: string) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.request_id === id ? { ...student, status: parseInt(value) } : student
            )
        );
    };

    // Handle page change in pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate students to display on the current page
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(students.length / studentsPerPage);

    return (
        <div >
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
                    student={selectedStudent}
                    onNotesChange={handleNotesChange}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default KhoaPage;
