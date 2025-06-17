
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE employment_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
CREATE TYPE leave_type AS ENUM ('annual', 'sick', 'personal', 'maternity', 'paternity', 'emergency');
CREATE TYPE performance_rating AS ENUM ('excellent', 'good', 'satisfactory', 'needs_improvement', 'unsatisfactory');
CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'interviewed', 'offered', 'hired', 'rejected');
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'employee', 'hr');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  role user_role DEFAULT 'employee',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employees table
CREATE TABLE public.employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT,
  position TEXT,
  manager_id UUID REFERENCES public.employees(id),
  hire_date DATE,
  salary DECIMAL(10,2),
  location TEXT,
  status employment_status DEFAULT 'active',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create departments table
CREATE TABLE public.departments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES public.employees(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leave requests table
CREATE TABLE public.leave_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  leave_type leave_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INTEGER NOT NULL,
  reason TEXT,
  status leave_status DEFAULT 'pending',
  approved_by UUID REFERENCES public.employees(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  date DATE NOT NULL,
  clock_in TIMESTAMP WITH TIME ZONE,
  clock_out TIMESTAMP WITH TIME ZONE,
  break_duration INTEGER DEFAULT 0, -- in minutes
  total_hours DECIMAL(4,2),
  status TEXT DEFAULT 'present',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- Create performance reviews table
CREATE TABLE public.performance_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  reviewer_id UUID REFERENCES public.employees(id) NOT NULL,
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  overall_rating performance_rating,
  goals TEXT,
  achievements TEXT,
  areas_for_improvement TEXT,
  comments TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job postings table
CREATE TABLE public.job_postings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT,
  job_type TEXT DEFAULT 'full-time',
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  description TEXT,
  requirements TEXT,
  posted_by UUID REFERENCES public.employees(id),
  status TEXT DEFAULT 'active',
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_posting_id UUID REFERENCES public.job_postings(id) NOT NULL,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status application_status DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table for learning management
CREATE TABLE public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT,
  duration_hours INTEGER,
  category TEXT,
  difficulty_level TEXT DEFAULT 'beginner',
  thumbnail_url TEXT,
  content_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) NOT NULL,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0,
  status TEXT DEFAULT 'enrolled',
  UNIQUE(course_id, employee_id)
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  name TEXT NOT NULL,
  issuing_organization TEXT,
  issue_date DATE,
  expiration_date DATE,
  certificate_url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payroll table
CREATE TABLE public.payroll (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  base_salary DECIMAL(10,2),
  overtime_hours DECIMAL(4,2) DEFAULT 0,
  overtime_rate DECIMAL(10,2) DEFAULT 0,
  bonuses DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  gross_pay DECIMAL(10,2),
  net_pay DECIMAL(10,2),
  tax_deductions DECIMAL(10,2) DEFAULT 0,
  processed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for employees (allow all authenticated users to view)
CREATE POLICY "Authenticated users can view employees" ON public.employees
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin and HR can insert employees" ON public.employees
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );
CREATE POLICY "Admin and HR can update employees" ON public.employees
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

-- Create RLS policies for departments
CREATE POLICY "Authenticated users can view departments" ON public.departments
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin and HR can manage departments" ON public.departments
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

-- Create RLS policies for leave requests
CREATE POLICY "Employees can view their own leave requests" ON public.leave_requests
  FOR SELECT TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager'))
  );
CREATE POLICY "Employees can create their own leave requests" ON public.leave_requests
  FOR INSERT TO authenticated WITH CHECK (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
  );

-- Create RLS policies for attendance
CREATE POLICY "Employees can view their own attendance" ON public.attendance
  FOR SELECT TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager'))
  );
CREATE POLICY "Employees can manage their own attendance" ON public.attendance
  FOR ALL TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

-- Create RLS policies for performance reviews
CREATE POLICY "Users can view their own performance reviews" ON public.performance_reviews
  FOR SELECT TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR reviewer_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

-- Create RLS policies for job postings (public view, admin manage)
CREATE POLICY "Anyone can view active job postings" ON public.job_postings
  FOR SELECT USING (status = 'active');
CREATE POLICY "Admin and HR can manage job postings" ON public.job_postings
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

-- Create RLS policies for courses (all authenticated users can view)
CREATE POLICY "Authenticated users can view courses" ON public.courses
  FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "Admin can manage courses" ON public.courses
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create RLS policies for course enrollments
CREATE POLICY "Users can view their own enrollments" ON public.course_enrollments
  FOR SELECT TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );
CREATE POLICY "Users can enroll themselves" ON public.course_enrollments
  FOR INSERT TO authenticated WITH CHECK (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
  );

-- Create RLS policies for certifications
CREATE POLICY "Users can view their own certifications" ON public.certifications
  FOR SELECT TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );
CREATE POLICY "Users can manage their own certifications" ON public.certifications
  FOR ALL TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

-- Create RLS policies for payroll (sensitive data - restricted access)
CREATE POLICY "Employees can view their own payroll" ON public.payroll
  FOR SELECT TO authenticated USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );
CREATE POLICY "Admin and HR can manage payroll" ON public.payroll
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    'employee'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.leave_requests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.performance_reviews FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.job_postings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.job_applications FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
