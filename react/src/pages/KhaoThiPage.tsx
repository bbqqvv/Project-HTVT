import React, { useState } from 'react';
import TableKhaoThi from '../components/TableKhaoThi';
import Pagination from '../components/Pagination';

interface Student {
  id: number;
  studentId: string;
  name: string;
  requestType: string;
  submissionDate: string;
  certificate: string;
  studentNotes: string;
  departmentName: string;
  status: string;
}

const KhaoThiPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]); // Khai báo state students
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const studentsPerPage = 8;
  const totalPages = Math.ceil(students.length / studentsPerPage);

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

  return (
    <div className="bg-gray-100">
      <h1 className='text-center bg-white p-4 font-semibold text-2xl'>
        THÔNG TIN HOÃN THI - VẮNG THI SINH VIÊN
      </h1>

      <TableKhaoThi
        students={currentStudents}
        onStudentClick={openModal}
        onStatusChange={handleStatusChange}
        onNotesChange={handleNotesChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default KhaoThiPage;