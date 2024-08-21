export interface CombinedRequestStudent {
    [x: string]: any;
    student_id: string; // Primary key
    student_name: string; // Tên sinh viên
    faculty_id: string; // Foreign key to faculties table
    major: string; // Ngành học
    class_name: string; // Tên lớp
    phone_number: string; // Số điện thoại
    email: string; // Email
    user_id: string; // Foreign key to users table
    created_at?: string; // Timestamp for creation (optional)
    updated_at?: string; // Timestamp for updates (optional)
    request_id: string; // Primary key
    request_type: string;
    status: boolean; // Đổi kiểu từ number sang boolean
    submission_date: string;
    approved_by?: string; // Cột này có thể null
    evidence: string; // JSON sẽ được lưu dưới dạng string
    student_notes?: string; // Có thể null
    faculty_notes?: string; // Có thể null
    exam_department_notes?: string; // Có thể null
    selected_courses?: string; // JSON sẽ được lưu dưới dạng string
    khoa_checked: boolean; // Đảm bảo trường này có kiểu boolean
    khaothi_checked: boolean; // Đảm bảo trường này có kiểu boolean

    is_confirmed?: boolean; // Có thể có thêm trường này để biểu thị trạng thái đã xác nhận
    is_updated?: boolean; // Có thể có thêm trường này để biểu thị trạng thái đã cập nhật
    faculty_name: string; // Add this line
    reviewed_by: string; // Add this field

}
