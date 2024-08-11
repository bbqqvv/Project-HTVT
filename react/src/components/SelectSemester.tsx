import React, { useState, ChangeEvent } from 'react';

const SelectSemester: React.FC = () => {
    const [semester, setSemester] = useState<string>("3");
    const [academicYear, setAcademicYear] = useState<string>("7");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSemester(event.target.value);
    };

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setAcademicYear(event.target.value);
    };

    const changeSemester = () => {
        window.location.assign(`/gv/doi-hoc-ky?namhoc=${academicYear}&hocky=${semester}`);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block">
            <button
                className="flex items-center text-gray-700"
                onClick={toggleMenu}
            >
                Học kỳ {semester} - {academicYear}
                <span className="ml-2 fa fa-angle-down"></span>
            </button>
            {isOpen && (
                <ul className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <li>
                        <div className="p-4 flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="hocky" className="block text-gray-700">Học kỳ:</label>
                                <select
                                    name="hocky"
                                    id="hocky"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={semester}
                                    onChange={handleSemesterChange}
                                >
                                    <option value="1">Học kỳ 1</option>
                                    <option value="2">Học kỳ 2</option>
                                    <option value="3">Học kỳ hè</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="namhoc" className="block text-gray-700">Năm học:</label>
                                <select
                                    name="namhoc"
                                    id="namhoc"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={academicYear}
                                    onChange={handleYearChange}
                                >
                                    <option value="1">2017 - 2018</option>
                                    <option value="2">2018 - 2019</option>
                                    <option value="3">2019 - 2020</option>
                                    <option value="4">2020 - 2021</option>
                                    <option value="5">2021 - 2022</option>
                                    <option value="6">2022 - 2023</option>
                                    <option value="7">2023 - 2024</option>
                                    <option value="8">2024 - 2025</option>
                                    <option value="9">2025 - 2026</option>
                                    <option value="10">2026 - 2027</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end p-4">
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={changeSemester}
                            >
                                OK
                            </button>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default SelectSemester;
