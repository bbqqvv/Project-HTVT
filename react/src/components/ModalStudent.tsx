// components/ModalStudent.tsx
import React from 'react';
import Modal from 'react-modal';
import { Student } from '../pages/KhoaPage';

interface ModalStudentProps {
    isOpen: boolean;
    onRequestClose: () => void;
    student: Student | null;
}

const ModalStudent: React.FC<ModalStudentProps> = ({ isOpen, onRequestClose, student }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-4xl">
                <h2 className="text-sm md:text-lg font-bold mb-4">Thông tin chi tiết hoãn thi <i className='text-red-600'>{student?.name}</i></h2>
                {student && (
                    <div className="overflow-x-auto">
                        <table className="bg-gray-100 border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border px-2 py-2 md:px-4">Tên lớp học phần</th>
                                    <th className="border px-2 py-2 md:px-4">Giảng viên</th>
                                    <th className="border px-2 py-2 md:px-4">Số TC</th>
                                    <th className="border px-2 py-2 md:px-4">Hình thức thi</th>
                                    <th className="border px-2 py-2 md:px-4">Ngày thi</th>
                                    <th className="border px-2 py-2 md:px-4">Giờ thi</th>
                                    <th className="border px-2 py-2 md:px-4">Phòng thi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='bg-white'>
                                    <td className="border px-2 py-2 md:px-4">Môn học A</td>
                                    <td className="border px-2 py-2 md:px-4">Giảng viên A</td>
                                    <td className="border px-2 py-2 md:px-4">3</td>
                                    <td className="border px-2 py-2 md:px-4">Tự luận</td>
                                    <td className="border px-2 py-2 md:px-4">01/02/2023</td>
                                    <td className="border px-2 py-2 md:px-4">08:00</td>
                                    <td className="border px-2 py-2 md:px-4">Phòng A1</td>
                                </tr>
                                <tr className='bg-white'>
                                    <td className="border px-2 py-2 md:px-4">Môn học B</td>
                                    <td className="border px-2 py-2 md:px-4">Giảng viên B</td>
                                    <td className="border px-2 py-2 md:px-4">3</td>
                                    <td className="border px-2 py-2 md:px-4">Trắc nghiệm</td>
                                    <td className="border px-2 py-2 md:px-4">01/03/2023</td>
                                    <td className="border px-2 py-2 md:px-4">10:00</td>
                                    <td className="border px-2 py-2 md:px-4">Phòng B1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <button
                    onClick={onRequestClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Đóng
                </button>
            </div>
        </Modal>
    );
};

export default ModalStudent;
