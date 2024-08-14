import React, { useState } from 'react';
import TableKhaoThi from '../components/TableKhaoThi'; // Đảm bảo đường dẫn đúng với vị trí của TableKhaoThi
import ActionPanel from '../components/ActionPanel';
import StatusPanel from '../components/StatusPanel';
import Modal from '../components/Modal';
import TopNotification from '../components/TopNotification';
import BottomNotification from '../components/BottomNotification';
import Pagination from '../components/Pagination';

// Định nghĩa kiểu Student nếu chưa có
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
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      studentId: '22EL064',
      name: 'Nguyen Van A',
      requestType: 'Hoãn thi',
      submissionDate: '2024-08-01',
      certificate: 'Minh chứng A',
      studentNotes: 'Ghi chú của sinh viên A',
      departmentName: 'Khoa Học Máy Tính', // Thêm thông tin khoa duyệt
      status: 'Xét duyệt',
    },
    {
      id: 2,
      studentId: '22IT052',
      name: 'Tran Thi B',
      requestType: 'Vắng thi',
      submissionDate: '2024-08-02',
      certificate: 'Minh chứng B',
      studentNotes: 'Ghi chú của sinh viên B',
      departmentName: 'Khoa Công Nghệ Thông Tin', // Thêm thông tin khoa duyệt
      status: 'Xét duyệt',
    },
    {
      id: 3,
      studentId: '22EL010',
      name: 'Le Van C',
      requestType: 'Hoãn thi',
      submissionDate: '2024-08-03',
      certificate: 'Minh chứng C',
      studentNotes: 'Ghi chú của sinh viên C',
      departmentName: 'Khoa Điện Tử Viễn Thông', // Thêm thông tin khoa duyệt
      status: 'Xét duyệt',
    },
    // Thêm dữ liệu mẫu khác nếu cần
  ]);
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
    <div className=" bg-gray-100">
      <h1 className='text-center bg-white p-4 font-semibold text-2xl'>THÔNG TIN HOÃN THI - VẮNG THI SINH VIÊN </h1>

      <TableKhaoThi
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
    </div>
  );
};

export default KhaoThiPage;
