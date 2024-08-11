import React from 'react';

interface StatusPanelProps {
    evidenceUrl: string | null;
    onImageClick: () => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ evidenceUrl, onImageClick }) => {
    return (
        <div className="w-1/2 bg-white shadow-md rounded-lg p-4">
            <div className="border-b pb-2 mb-2 text-center font-bold text-gray-600">TRẠNG THÁI</div>
            <div className='flex justify-between'>
                <div className='left-status'>
                    <div className="flex gap-2">
                        <button className="bg-[#3c9d97] text-white rounded-lg py-1 px-2 hover:bg-[#2c7a7b] transition duration-300">Khoa</button>
                        <button className="bg-[#3c9d97] text-white rounded-lg py-1 px-2 hover:bg-[#2c7a7b] transition duration-300">P. Khảo Thí</button>
                    </div>
                    <div className="mt-4 text-gray-700">Ghi chú của khoa: Bạn cần phải nộp minh chứng</div>
                </div>
                <div className='right-status w-[30%]'>
                    {evidenceUrl && (
                        <img
                            src={evidenceUrl}
                            alt="Evidence"
                            className="w-full h-auto cursor-pointer"
                            onClick={onImageClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatusPanel;
