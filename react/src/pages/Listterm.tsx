import React, { useState } from 'react';


const Listterm: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-2 w-auto bg-slate-300">
      <table className="table-auto w-full">
        <thead className="w-11/12 h-4 bg-[#e3e3e3]">
          <tr className="w-full h-4">
            <th className="p-1 text-left">Tên lớp học phần</th>
            <th className="p-1 text-left">Giảng viên</th>
            <th className="p-1 text-left">Số TC</th>
            <th className="p-1 text-left">Hình thức thi</th>
            <th className="p-1 text-left">Ngày thi</th>
            <th className="p-1 text-left">Giờ thi</th>
            <th className="p-1 text-left">Phòng thi</th>
            <th className="text-center">Vắng Thi</th>
          </tr>
        </thead>
        <tbody className="w-11/12 h-2 bg-slate-100 space-y-4">

          <tr className="w-auto h-2">
            <td className="p-1 h-2 text-black"> Cơ sở dữ liệu(1) </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello2 </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </td>
          </tr>
          <tr className="w-auto h-2">
            <td className="p-1 h-2 text-black"> Cơ sở dữ liệu(1) </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello2 </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </td>
          </tr>
          <tr className="w-auto h-2">
            <td className="p-1 h-2 text-black"> Cơ sở dữ liệu(1) </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello2 </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </td>
          </tr>
          <tr className="w-auto h-2">
            <td className="p-1 h-2 text-black"> Cơ sở dữ liệu(1) </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello2 </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </td>
          </tr>
          <tr className="w-auto h-2">
            <td className="p-1 h-2 text-black"> Cơ sở dữ liệu(1) </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello2 </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </td>
          </tr>
          <tr className="w-auto h-2">
            <td className="p-1 h-2 text-black"> Cơ sở dữ liệu(1) </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello2 </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </td>
          </tr>
          <tr className="w-auto h-2">
            <td className="p-1 h-2 text-black"> Cơ sở dữ liệu(1) </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello2 </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2"> Hello </td>
            <td className="p-1 h-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </td>
          </tr>


        </tbody>
      </table>

      <div className="flex mt-5">
        <div className="w-1/2 h-[196px] relative bg-white">
          <div className="w-[369px] h-[167px] left-[153px] top-[15px] absolute bg-[#f7f7f7]" />
          <textarea className="w-[131px] h-[13px] left-[162px] top-[24px] absolute text-[#c4c4c4] text-xs font-normal font-['Open Sans']">Ghi chú của sinh viên nếu có</textarea>
          <div className="w-[108px] h-9 left-[16px] top-[15px] absolute">
            <div className="w-[108px] h-9 left-0 top-0 absolute bg-[#36417a] rounded-[10px]" />
            <div className="w-[108px] h-9 left-0 top-0 absolute bg-[#36417a] rounded-[10px]" />
            <div className="w-[58px] h-3.5 left-[26px] top-[8px] absolute text-white text-xs font-bold font-['Open Sans']">Xác nhận</div>
          </div>
          <div className="w-[108px] h-9 left-[16px] top-[62px] absolute">
            <div className="w-[108px] h-9 left-0 top-0 absolute bg-[#9ea040] rounded-[10px]" />
            <button className="w-[95px] h-3.5 left-[9px] top-[9px] absolute text-white text-xs font-bold font-['Open Sans'] " onClick={handleModalOpen}>Tải minh chứng</button>
          </div>
        </div>

        {/* <div className="mb-4">
              <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleModalOpen}>Tải minh chứng</button>
            </div> */}

        <div className="w-1/2 p-4 h-[196px] bg-white space-y-4">
          <div className="w-full h-[196px] relative bg-white flex-col justify-start items-start inline-flex">
            <div className="w-full h-8 bg-gray-300 relative">
              <div className="w-full h-4 left-[194px] top-[7px]  absolute text-[#687b8e] text-center text-xs font-bold font-['Open Sans']">TRẠNG THÁI</div>
            </div>
            <div className="w-36 h-3 text-[#ff0000] text-xs font-light font-['Open Sans']">Minh chứng: minhchung.pnj</div>
            <div className="w-16 h-5 relative">
              <div className="w-16 h-5 left-0 top-0 absolute bg-[#3c9d97] rounded-lg" />
              <button className="w-5 h-2 left-[22px] top-[4px] absolute text-white text-xs font-bold font-['Open Sans']">Khoa  </button>
            </div>
            <div className="w-2.5 h-2.5 justify-center items-center inline-flex" />
            <div className="w-16 h-5 relative">
              <div className="w-16 h-5 left-0 top-0 absolute bg-[#3c9d97] rounded-lg" />
              <button className="w-10 h-2 left-[7px] top-[4px] absolute text-white text-xs font-bold font-['Open Sans']">P. Khảo Thí </button>
            </div>
            <div className="w-2.5 h-2.5 justify-center items-center inline-flex" />
            <div className="w-96 h-20 bg-[#f0f0f0] shadow-inner" />
            <textarea className="w-56 h-3 text-[#b1b1b1] text-xs font-light font-['Open Sans']">Ghi chú từ Khoa và phòng Khảo Thí ở đây</textarea>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={handleModalClose} />}
    </div>
  );
};

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[400px] h-[300px] bg-white rounded-lg p-4">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full h-[200px] bg-[#d9d9d9] rounded-lg flex items-center justify-center cursor-pointer">
            <div
              className="text-center text-[#939393] text-sm"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                console.log(e.dataTransfer.files);
              }}
            >
              <div className="w-16 h-16 bg-gray-300 mb-4"></div>
              MỞ FILE ẢNH TẠI ĐÂY
            </div>
          </div>

          <div className="flex justify-between mt-6 w-full">
            <button className="bg-[#48b4b4] text-white py-2 px-4 rounded-lg" onClick={onClose}>Lưu</button>
            <button className="bg-[#a5a5a5] text-white py-2 px-4 rounded-lg" onClick={onClose}>Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
};
// onDragOver={(e) => e.preventDefault()}
// onDrop={(e) => {
//   e.preventDefault();
//   // Handle file drop
//   console.log(e.dataTransfer.files);
// }}
{/* <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>Close</button>
        </div> */}

export default Listterm;
