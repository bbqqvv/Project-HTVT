import React, { useState, ChangeEvent } from 'react';

const SelectSemester: React.FC = () => {
    const [semester, setSemester] = useState<string>("3");
    const [academicYear, setAcademicYear] = useState<string>("7");
    const [isOpen, setIsOpen] = useState<boolean>(false); // Thêm trạng thái để kiểm soát việc hiển thị menu

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
        setIsOpen(!isOpen); // Đổi trạng thái hiển thị menu
    };

    return (
        <div className="relative">
            <div className="inline-block">
                <button
                    className=" text-gray-700"
                    onClick={toggleMenu} // Thay đổi trạng thái khi bấm vào nút
                >
                    Học kỳ Hè - 2023-2024
                    <span className="ml-2 fa fa-angle-down"></span>
                </button>
                <ul
                    className={`absolute right-0 mt-5 w-96 bg-white border border-gray-200 rounded shadow-lg z-10 ${isOpen ? 'block' : 'hidden'}`}
                >
                    <li>
                        <div className="p-4 flex space-x-5">
                            <div className="mb-4 ">
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
                            <div className="mb-4">
                                <label htmlFor="namhoc" className="block text-gray-700">Năm học:</label>
                                <select
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    id="namhoc"
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
                            <div className="flex items-center mt-2">
                                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={changeSemester}>OK</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SelectSemester;
