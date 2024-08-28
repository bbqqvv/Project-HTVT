import React, { useCallback, useEffect, useState } from 'react';
import KhoaRequestTable from './KhoaRequestTable';
import ImageModal from './ImageModal';
import SearchBar from './SearchBar';
import { CombinedRequestStudent } from './types';

const TableKhaoThi: React.FC = () => {
    const [data, setData] = useState<CombinedRequestStudent[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof CombinedRequestStudent; direction: 'ascending' | 'descending' } | null>(null);

    const fetchStudents = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/requests');
            const responseData = await response.json();

            if (Array.isArray(responseData)) {
                setData(responseData.filter(student => !student.is_deleted));
            } else {
                console.error('Dữ liệu không phải là một mảng:', responseData);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleSort = (key: keyof CombinedRequestStudent) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        let sortableData = [...data];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'ascending'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
                } else if (aValue instanceof Date && bValue instanceof Date) {
                    return sortConfig.direction === 'ascending'
                        ? aValue.getTime() - bValue.getTime()
                        : bValue.getTime() - aValue.getTime();
                }

                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const filteredData = React.useMemo(() =>
        sortedData.filter(student =>
            student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.request_type.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [sortedData, searchTerm]
    );

    const handleConfirm = async (id: string) => {
        try {
            const student = data.find((s) => s.request_id === id);
            if (!student || student.khaothi_checked) return;

            const updatedStudent = {
                ...student,
                is_confirmed: true,
                is_updated: true,
                khaothi_checked: true,
                selected_courses: Array.isArray(student.selected_courses) ? student.selected_courses : [],
            };

            const response = await fetch(`http://127.0.0.1:8000/api/requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });

            if (response.ok) {
                setData((prevData) =>
                    prevData.map((s) => (s.request_id === id ? { ...s, is_confirmed: true, is_updated: true } : s))
                );
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                const errorData = await response.json();
                console.error('Lỗi khi xác nhận:', errorData);
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error('Lỗi khi xác nhận:', error);
        }
    };


    const openModal = (image: string) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };


    const handleStatusChange = (id: string, value: string) => {
        const updatedData = data.map((student) =>
            student.request_id === id && !student.is_updated ? { ...student, status: parseInt(value) } : student
        );
        setData(updatedData);
    };

    const handleNotesChange = (id: string, field: keyof Student, value: string) => {
        const updatedData = data.map((student) =>
            student.request_id === id && !student.is_updated ? { ...student, [field]: value } : student
        );
        setData(updatedData);
    };

    // Dummy function for student click handling
    const handleStudentClick = (id: string) => {
        console.log('Student clicked:', id);
    };

    return (
        <div className="w-full mx-auto">
            {successMessage && (
                <div className="bg-green-500 text-white p-2 mb-2 rounded">
                    {successMessage}
                </div>
            )}
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />
            <KhoaRequestTable
                students={filteredData}
                onStudentClick={handleStudentClick}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
                onConfirm={handleConfirm}
                searchTerm={searchTerm}
                sortConfig={sortConfig}
                handleSort={handleSort}
                filteredData={filteredData}
                openModal={openModal}
                reviewerNotesHeader="Khoa duyệt"
                onCheckedChange={() => {
                    throw new Error('Function not implemented.');
                }}
            />
            <ImageModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                selectedImage={selectedImage}
            />
        </div>
    );
};

export default TableKhaoThi;
