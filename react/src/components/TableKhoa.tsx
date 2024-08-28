import React, { useCallback, useEffect, useState } from 'react';
import StudentRequestTable from './StudentRequestTable';
import ImageModal from './ImageModal';
import SearchBar from './SearchBar';
import { CombinedRequestStudent } from './types';
import { toast } from 'react-toastify';

const TableKhoa: React.FC = () => {
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
            // Find the student by ID
            const student = data.find((s) => s.request_id === id);
    
            if (!student || student.khoa_checked) {
                return;
            }
    
            // Prepare the updated student data
            const updatedStudent = {
                is_confirmed: true,
                is_updated: true,
                khoa_checked: true,
                status: student.status,
                khaothi_checked: student.khaothi_checked,
            };
    
            // Make the API request
            const response = await fetch(`http://127.0.0.1:8000/api/requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });
    
            if (response.ok) {
                // Update state if the response is OK
                setData((prevData) =>
                    prevData.map((s) =>
                        s.request_id === id
                            ? { ...s, is_confirmed: true, is_updated: true, khoa_checked: true }
                            : s
                    )
                );
    
                // Show success message using toast
                toast.success('Yêu cầu đã được xác nhận!');
    
                // Optionally, set a success message in the state
                setSuccessMessage('Xác nhận thành công!');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                // Handle errors from the response
                const errorData = await response.json();
                console.error('Lỗi khi xác nhận:', errorData);
                setSuccessMessage(null);
    
                // Show error message using toast
                toast.error('Lỗi khi xác nhận yêu cầu!');
            }
        } catch (error) {
            // Handle unexpected errors
            console.error('Lỗi khi xác nhận:', error);
            setSuccessMessage(null);
    
            // Show error message using toast
            toast.error('Đã xảy ra lỗi!');
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

    const handleNotesChange = (id: string, field: keyof CombinedRequestStudent, value: string) => {
        const updatedData = data.map((student) =>
            student.request_id === id && !student.is_updated ? { ...student, [field]: value } : student
        );
        setData(updatedData);
    };

    const handleStudentClick = (id: string) => {
        console.log('Student clicked:', id);
    };

    return (
        <div>
            {successMessage && (
                <div className="bg-green-500 text-white p-2 mb-2 rounded">
                    {successMessage}
                </div>
            )}
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />
            <StudentRequestTable
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
                reviewerNotesHeader="Ghi chú Khoa"
                onCheckedChange={() => { /* Implement if needed */ }}
            />
            <hr />
            {modalIsOpen && selectedImage && (
                <ImageModal
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    imageUrl={selectedImage}
                />
            )}
        </div>
    );
};

export default TableKhoa;
