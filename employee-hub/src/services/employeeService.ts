import { api } from './api';
import type { Employee, EmployeeFormData } from '@/types/employee';

export const employeeService = {
    getAll: () => api.get<Employee[]>('/employees'),

    getById: (id: number) => api.get<Employee>(`/employees/${id}`),

    create: (data: EmployeeFormData) => api.post<Employee>('/employees', data),

    update: (id: number, data: EmployeeFormData) =>
        api.put<Employee>(`/employees/${id}`, data),

    delete: (id: number) => api.delete(`/employees/${id}`),
};
