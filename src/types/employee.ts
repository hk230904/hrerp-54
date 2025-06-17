
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  location?: string;
  status: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  startDate?: string;
  salary?: number;
  managerId?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  skills?: string[];
  certifications?: string[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  created_at?: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  startDate: string;
  salary: string;
  managerId?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  skills: string;
  notes: string;
}

// Additional interfaces for other modules
export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'emergency';
  start_date: string;
  end_date: string;
  days_requested: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  instructor?: string;
  duration_hours?: number;
  category?: string;
  difficulty_level?: string;
  thumbnail_url?: string;
  content_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseEnrollment {
  id: string;
  course_id: string;
  employee_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress_percentage: number;
  status: string;
}
