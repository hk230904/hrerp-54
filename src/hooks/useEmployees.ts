
import { useState, useEffect } from 'react';
import { Employee } from '@/types/employee';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch employees from Supabase
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform Supabase data to match our Employee interface
      const transformedEmployees: Employee[] = data.map(emp => ({
        id: emp.id,
        name: `${emp.first_name} ${emp.last_name}`,
        email: emp.email,
        phone: emp.phone || '',
        department: emp.department || '',
        position: emp.position || '',
        location: emp.location || '',
        status: emp.status as 'active' | 'inactive' | 'terminated',
        avatar: emp.avatar_url,
        startDate: emp.hire_date,
        salary: emp.salary,
        managerId: emp.manager_id,
        createdAt: emp.created_at,
        updatedAt: emp.updated_at
      }));

      setEmployees(transformedEmployees);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (employeeData: Partial<Employee>) => {
    setLoading(true);
    try {
      // Generate employee ID
      const employeeId = `EMP${Date.now().toString().slice(-6)}`;
      
      // Split name into first and last name
      const nameParts = (employeeData.name || '').split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const { data, error } = await supabase
        .from('employees')
        .insert([{
          employee_id: employeeId,
          first_name: firstName,
          last_name: lastName,
          email: employeeData.email,
          phone: employeeData.phone,
          department: employeeData.department,
          position: employeeData.position,
          location: employeeData.location,
          hire_date: employeeData.startDate,
          salary: employeeData.salary,
          manager_id: employeeData.managerId,
          status: employeeData.status || 'active'
        }])
        .select()
        .single();

      if (error) throw error;

      // Transform and add to local state
      const newEmployee: Employee = {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        phone: data.phone || '',
        department: data.department || '',
        position: data.position || '',
        location: data.location || '',
        status: data.status as 'active' | 'inactive' | 'terminated',
        avatar: data.avatar_url,
        startDate: data.hire_date,
        salary: data.salary,
        managerId: data.manager_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      setEmployees(prev => [newEmployee, ...prev]);
      
      toast({
        title: "Success",
        description: "Employee added successfully"
      });
      
      return newEmployee;
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    setLoading(true);
    try {
      // Prepare update data
      const updateData: any = {};
      
      if (updates.name) {
        const nameParts = updates.name.split(' ');
        updateData.first_name = nameParts[0] || '';
        updateData.last_name = nameParts.slice(1).join(' ') || '';
      }
      
      if (updates.email) updateData.email = updates.email;
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.department) updateData.department = updates.department;
      if (updates.position) updateData.position = updates.position;
      if (updates.location) updateData.location = updates.location;
      if (updates.status) updateData.status = updates.status;
      if (updates.startDate) updateData.hire_date = updates.startDate;
      if (updates.salary) updateData.salary = updates.salary;
      if (updates.managerId) updateData.manager_id = updates.managerId;

      const { data, error } = await supabase
        .from('employees')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setEmployees(prev => 
        prev.map(emp => 
          emp.id === id 
            ? { 
                ...emp, 
                name: `${data.first_name} ${data.last_name}`,
                email: data.email,
                phone: data.phone || '',
                department: data.department || '',
                position: data.position || '',
                location: data.location || '',
                status: data.status,
                startDate: data.hire_date,
                salary: data.salary,
                managerId: data.manager_id,
                updatedAt: data.updated_at
              }
            : emp
        )
      );

      toast({
        title: "Success",
        description: "Employee updated successfully"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEmployees(prev => prev.filter(emp => emp.id !== id));
      
      toast({
        title: "Success",
        description: "Employee deleted successfully"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEmployee = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  const searchEmployees = (searchTerm: string, department?: string, status?: string) => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !department || department === 'all' || employee.department === department;
      const matchesStatus = !status || status === 'all' || employee.status === status;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  };

  const sortEmployeesBy = (sortBy: string, sortOrder: 'asc' | 'desc' = 'asc') => {
    return [...employees].sort((a, b) => {
      let aValue: any = a[sortBy as keyof Employee];
      let bValue: any = b[sortBy as keyof Employee];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const getDepartments = () => {
    const departments = [...new Set(employees.map(emp => emp.department))];
    return departments.filter(Boolean).sort();
  };

  const getEmployeeStats = () => {
    const total = employees.length;
    const active = employees.filter(emp => emp.status === 'active').length;
    const inactive = employees.filter(emp => emp.status === 'inactive').length;
    const departments = getDepartments().length;
    
    return { total, active, inactive, departments };
  };

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    searchEmployees,
    sortEmployeesBy,
    getDepartments,
    getEmployeeStats,
    refetch: fetchEmployees
  };
};
