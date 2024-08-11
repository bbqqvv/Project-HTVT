// services/requestsService.ts

const API_URL = 'http://127.0.0.1:8000/api/requests'; // Thay đổi với URL thực của API

// Lấy danh sách tất cả các yêu cầu
export const fetchRequests = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch requests');
    }
    return response.json();
};

// Cập nhật một yêu cầu
export const updateRequest = async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update request');
    }
    return response.json();
};

// Xóa một yêu cầu
export const deleteRequest = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete request');
    }
};
