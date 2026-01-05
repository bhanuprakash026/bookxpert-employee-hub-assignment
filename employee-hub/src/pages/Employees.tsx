import { useState, useMemo, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { employeeService } from '@/services/employeeService';
import { Employee, EmployeeFilters, EmployeeFormData } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import EmployeeTable from '@/components/employees/EmployeeTable';
import EmployeeFiltersComponent from '@/components/employees/EmployeeFilters';
import EmployeeFormDialog from '@/components/employees/EmployeeFormDialog';
import DeleteConfirmDialog from '@/components/common/DeleteConfirmDialog';
import TableSkeleton from '@/components/common/TableSkeleton';
import EmptyState from '@/components/common/EmptyState';

const Employees = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const printRef = useRef<HTMLDivElement>(null);

    const [filters, setFilters] = useState<EmployeeFilters>({
        search: '',
        gender: 'All',
        status: 'All',
    });

    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    // Fetch employees
    const { data: employees = [], isLoading, error } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeService.getAll,
    });

    // Create mutation
    const createMutation = useMutation({
        mutationFn: employeeService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setFormDialogOpen(false);
            toast({ title: 'Success', description: 'Employee added successfully' });
        },
        onError: () => {
            toast({ title: 'Error', description: 'Failed to add employee', variant: 'destructive' });
        },
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: EmployeeFormData }) =>
            employeeService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setFormDialogOpen(false);
            setSelectedEmployee(null);
            toast({ title: 'Success', description: 'Employee updated successfully' });
        },
        onError: () => {
            toast({ title: 'Error', description: 'Failed to update employee', variant: 'destructive' });
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: employeeService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setDeleteDialogOpen(false);
            setSelectedEmployee(null);
            toast({ title: 'Success', description: 'Employee deleted successfully' });
        },
        onError: () => {
            toast({ title: 'Error', description: 'Failed to delete employee', variant: 'destructive' });
        },
    });

    // Filter employees
    const filteredEmployees = useMemo(() => {
        return employees.filter((emp) => {
            const matchesSearch = emp.fullName
                .toLowerCase()
                .includes(filters.search.toLowerCase());
            const matchesGender = filters.gender === 'All' || emp.gender === filters.gender;
            const matchesStatus =
                filters.status === 'All' ||
                (filters.status === 'Active' && emp.isActive) ||
                (filters.status === 'Inactive' && !emp.isActive);
            return matchesSearch && matchesGender && matchesStatus;
        });
    }, [employees, filters]);

    const handleAddNew = () => {
        setSelectedEmployee(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setFormDialogOpen(true);
    };

    const handleDelete = (employee: Employee) => {
        setSelectedEmployee(employee);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedEmployee) {
            deleteMutation.mutate(selectedEmployee.id);
        }
    };

    const handleToggleStatus = (employee: Employee) => {
        updateMutation.mutate({
            id: employee.id,
            data: { ...employee, isActive: !employee.isActive },
        });
    };

    const handleFormSubmit = (data: EmployeeFormData) => {
        if (selectedEmployee) {
            updateMutation.mutate({ id: selectedEmployee.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handlePrintSingle = (employee: Employee) => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>Employee Details - ${employee.fullName}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
              .details { margin: 20px 0; }
              .row { display: flex; margin: 10px 0; }
              .label { width: 150px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Employee Details</h1>
            </div>
            <div style="text-align: center; margin-bottom: 20px;">
              ${employee.profileImage ? `<img src="${employee.profileImage}" class="photo" />` : '<div style="width:100px;height:100px;border-radius:50%;background:#ddd;margin:0 auto;"></div>'}
            </div>
            <div class="details">
              <div class="row"><span class="label">Employee ID:</span> #${employee.id}</div>
              <div class="row"><span class="label">Full Name:</span> ${employee.fullName}</div>
              <div class="row"><span class="label">Gender:</span> ${employee.gender}</div>
              <div class="row"><span class="label">Date of Birth:</span> ${format(new Date(employee.dateOfBirth), 'dd MMM yyyy')}</div>
              <div class="row"><span class="label">State:</span> ${employee.state}</div>
              <div class="row"><span class="label">Status:</span> ${employee.isActive ? 'Active' : 'Inactive'}</div>
            </div>
          </body>
        </html>
      `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const handlePrintAll = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>Employee List</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
              th { background: #f5f5f5; }
              .active { color: green; }
              .inactive { color: red; }
            </style>
          </head>
          <body>
            <h1>Employee List</h1>
            <p>Total: ${filteredEmployees.length} employees</p>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>State</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${filteredEmployees.map(emp => `
                  <tr>
                    <td>#${emp.id}</td>
                    <td>${emp.fullName}</td>
                    <td>${emp.gender}</td>
                    <td>${format(new Date(emp.dateOfBirth), 'dd MMM yyyy')}</td>
                    <td>${emp.state}</td>
                    <td class="${emp.isActive ? 'active' : 'inactive'}">${emp.isActive ? 'Active' : 'Inactive'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-destructive mb-2">Failed to load employees</p>
                    <p className="text-muted-foreground text-sm">
                        Make sure JSON Server is running on port 3001
                    </p>
                    <code className="block mt-2 text-xs bg-muted p-2 rounded">
                        npx json-server --watch db.json --port 3001
                    </code>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6" ref={printRef}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Employees</h1>
                    <p className="text-muted-foreground">
                        Manage your employee records
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePrintAll} className="gap-2">
                        <Printer className="h-4 w-4" />
                        Print List
                    </Button>
                    <Button onClick={handleAddNew} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Employee
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <EmployeeFiltersComponent filters={filters} onFiltersChange={setFilters} />

            {/* Content */}
            {isLoading ? (
                <TableSkeleton columns={8} rows={5} />
            ) : filteredEmployees.length === 0 ? (
                <EmptyState
                    title={employees.length === 0 ? 'No employees yet' : 'No results found'}
                    description={
                        employees.length === 0
                            ? 'Get started by adding your first employee.'
                            : 'Try adjusting your search or filter criteria.'
                    }
                    actionLabel={employees.length === 0 ? 'Add Employee' : undefined}
                    onAction={employees.length === 0 ? handleAddNew : undefined}
                />
            ) : (
                <EmployeeTable
                    employees={filteredEmployees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    onPrint={handlePrintSingle}
                />
            )}

            {/* Dialogs */}
            <EmployeeFormDialog
                open={formDialogOpen}
                onOpenChange={setFormDialogOpen}
                onSubmit={handleFormSubmit}
                employee={selectedEmployee}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
                isLoading={deleteMutation.isPending}
            />
        </div>
    );
};

export default Employees;
