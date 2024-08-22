import React, { useState, useEffect } from 'react';
import Checkbox from '../components/Checkbox';

interface ExamTableProps {
    showCheckboxes?: boolean;
    student_id: string;
    onSelectionChange: (selectedCourses: any[]) => void;
}

const ExamTable: React.FC<ExamTableProps> = ({ showCheckboxes = false, student_id, onSelectionChange }) => {
    const [data, setData] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data for student_id:', student_id); // Xem giá trị của student_id

            try {
                // Fetch danh sách môn học
                const response = await fetch('http://127.0.0.1:8000/api/courses?semester_id=HK1-2024');
                const result = await response.json();
                console.log('Fetched courses:', result);

                // Fetch danh sách môn học đã chọn của sinh viên
                const checkedResponse = await fetch(`http://127.0.0.1:8000/api/student_courses/${student_id}`);
                const checkedResult = await checkedResponse.json();
                console.log('Fetched checked courses:', checkedResult);

                // Kiểm tra định dạng dữ liệu môn học đã chọn
                if (!Array.isArray(checkedResult)) {
                    console.error('Invalid data format for checked courses:', checkedResult);
                    return;
                }

                // Tạo Set từ danh sách môn học đã chọn
                const formattedCheckedIds = new Set<string>(
                    checkedResult.map((item: { course_id: string }) => item.course_id)
                );
                console.log('Formatted checked IDs:', formattedCheckedIds);

                // Định dạng dữ liệu môn học
                const formattedData = result.data.map((item: any) => ({
                    course_id: item.course_id,
                    subject: item.course_name,
                    lecturer: item.instructor,
                    credits: item.credits,
                    examType: item.exam_format,
                    examDate: item.exam_date,
                    examTime: item.exam_time,
                    examRoom: item.exam_room,
                    status: 'Chưa diễn ra'
                }));

                console.log('Formatted data:', formattedData);

                // Cập nhật trạng thái checkbox dựa trên danh sách môn học đã chọn
                setData(formattedData);
                setSelectedIds(formattedCheckedIds);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [student_id]);

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const courseId = data[index].course_id;
        const updatedSelectedIds = new Set(selectedIds);

        if (checked) {
            updatedSelectedIds.add(courseId);
        } else {
            updatedSelectedIds.delete(courseId);
        }

        setSelectedIds(updatedSelectedIds);

        const selectedCourses = data.filter((_, i) => updatedSelectedIds.has(data[i].course_id));
        onSelectionChange(selectedCourses);
    };

    return (
        <table className="table-auto w-full bg-white shadow-md rounded-lg mb-6">
            <thead className="bg-gray-200 text-left">
                <tr>
                    <th className="p-3">Tên lớp học phần</th>
                    <th className="p-3">Giảng viên</th>
                    <th className="p-3">Số TC</th>
                    <th className="p-3">Hình thức thi</th>
                    <th className="p-3">Ngày thi</th>
                    <th className="p-3">Giờ thi</th>
                    <th className="p-3">Phòng thi</th>
                    {showCheckboxes && <th className="p-3 text-center">Vắng thi</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.course_id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{item.subject}</td>
                        <td className="p-2">{item.lecturer}</td>
                        <td className="p-2">{item.credits}</td>
                        <td className="p-2">{item.examType}</td>
                        <td className="p-2">{item.examDate}</td>
                        <td className="p-2">{item.examTime}</td>
                        <td className="p-2">{item.examRoom}</td>
                        {showCheckboxes && (
                            <td className="p-2 text-center">
                                <Checkbox
                                    checked={selectedIds.has(item.course_id)}
                                    onChange={(checked) => handleCheckboxChange(index, checked)}
                                />
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExamTable;
