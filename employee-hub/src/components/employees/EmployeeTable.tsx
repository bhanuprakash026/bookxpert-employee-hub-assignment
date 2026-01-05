import { format } from 'date-fns';
import { Edit2, Trash2, Printer, UserCircle } from 'lucide-react';
import type { Employee } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../components/ui/tooltip";

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
    onToggleStatus: (employee: Employee) => void;
    onPrint: (employee: Employee) => void;
}

const EmployeeTable = ({
    employees,
    onEdit,
    onDelete,
    onToggleStatus,
    onPrint,
}: EmployeeTableProps) => {
    return (
        <div className="rounded-lg border border-border overflow-hidden print-table">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="w-16">ID</TableHead>
                        <TableHead className="w-20">Photo</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>DOB</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead className="w-24">Status</TableHead>
                        <TableHead className="w-32 no-print">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">#{employee.id}</TableCell>
                            <TableCell>
                                {employee.profileImage ? (
                                    <img
                                        src={employee.profileImage}
                                        alt={employee.fullName}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                        <UserCircle className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{employee.fullName}</TableCell>
                            <TableCell>{employee.gender}</TableCell>
                            <TableCell>
                                {format(new Date(employee.dateOfBirth), 'dd MMM yyyy')}
                            </TableCell>
                            <TableCell>{employee.state}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={employee.isActive}
                                        onCheckedChange={() => onToggleStatus(employee)}
                                        className="no-print"
                                    />
                                    <Badge
                                        variant={employee.isActive ? 'default' : 'secondary'}
                                        className={
                                            employee.isActive
                                                ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                                        }
                                    >
                                        {employee.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell className="no-print">
                                <div className="flex items-center gap-1">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(employee)}
                                                className="h-8 w-8"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit</TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(employee)}
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete</TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onPrint(employee)}
                                                className="h-8 w-8"
                                            >
                                                <Printer className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Print</TooltipContent>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmployeeTable;
