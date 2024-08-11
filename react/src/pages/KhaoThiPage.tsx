import React, { useState } from 'react';
import TableKhaoThi from '../components/TableKhaoThi'; // Đảm bảo đường dẫn đúng với vị trí của TableKhaoThi
import ActionPanel from '../components/ActionPanel';
import StatusPanel from '../components/StatusPanel';
import Modal from '../components/Modal';
import TopNotification from '../components/TopNotification';
import BottomNotification from '../components/BottomNotification';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleStudentClick = (student: Student) => {
    console.log('Student clicked:', student);
    // Xử lý sự kiện khi nhấp vào sinh viên
  };

  const handleStatusChange = (id: number, value: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, status: value } : student
      )
    );
  };

  const handleNotesChange = (id: number, field: 'studentNotes' | 'departmentNotes', value: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const handleConfirm = (id: number) => {
    console.log('Confirm clicked for student ID:', id);
    // Xử lý xác nhận
  };

  return (
    <div className=" bg-gray-100">
      <TopNotification />
      <TableKhaoThi
        students={students}
        onStudentClick={handleStudentClick}
        onStatusChange={handleStatusChange}
        onNotesChange={handleNotesChange}
        onConfirm={handleConfirm}
      />
      <div className="flex gap-4 mt-4">
        <ActionPanel onConfirm={handleModalOpen} onUpload={handleModalOpen} />
        <StatusPanel />
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose} />
      )}
      <div className='mt-[8rem]'>
        <BottomNotification />
      </div>
    </div>
  );
};

export default KhaoThiPage;
