export interface Employee {
    id: number;
    fullName: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    profileImage: string;
    state: string;
    isActive: boolean;
}

export interface EmployeeFormData {
    fullName: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    profileImage: string;
    state: string;
    isActive: boolean;
}

export type EmployeeFilters = {
    search: string;
    gender: 'All' | 'Male' | 'Female' | 'Other';
    status: 'All' | 'Active' | 'Inactive';
};
