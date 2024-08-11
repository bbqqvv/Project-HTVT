import React, { useState, useEffect } from 'react';
import Checkbox from '../components/Checkbox';

interface ExamTableProps {
    showCheckboxes?: boolean;
    onSelectionChange: (selectedCourses: any[]) => void; // Callback to send selected courses
}

const ExamTable: React.FC<ExamTableProps> = ({ showCheckboxes = false, onSelectionChange }) => {
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses?semester_id=HK1-2024');
                const result = await response.json();

                const formattedData = result.data.map((item: any) => ({
                    course_id: item.course_id, // Include course_id
                    subject: item.course_name,
                    lecturer: item.instructor,
                    credits: item.credits,
                    examType: item.exam_format,
                    examDate: item.exam_date,
                    examTime: item.exam_time,
                    examRoom: item.exam_room,
                    status: 'Chưa diễn ra'
                }));

                setData(formattedData);
                setCheckboxStates(new Array(formattedData.length).fill(false));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const newStates = [...checkboxStates];
        newStates[index] = checked;
        setCheckboxStates(newStates);

        // Notify parent component about the selection change
        const selectedCourses = data.filter((_, i) => newStates[i]);
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
                    <tr key={index} className="border-b hover:bg-gray-50">
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
                                    checked={checkboxStates[index]}
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
