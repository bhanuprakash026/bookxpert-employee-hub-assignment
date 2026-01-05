import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { EmployeeFilters } from '@/types/employee';

interface EmployeeFiltersProps {
    filters: EmployeeFilters;
    onFiltersChange: (filters: EmployeeFilters) => void;
}

const EmployeeFiltersComponent = ({ filters, onFiltersChange }: EmployeeFiltersProps) => {
    const handleSearchChange = (value: string) => {
        onFiltersChange({ ...filters, search: value });
    };

    const handleGenderChange = (value: string) => {
        onFiltersChange({ ...filters, gender: value as EmployeeFilters['gender'] });
    };

    const handleStatusChange = (value: string) => {
        onFiltersChange({ ...filters, status: value as EmployeeFilters['status'] });
    };

    const clearFilters = () => {
        onFiltersChange({ search: '', gender: 'All', status: 'All' });
    };

    const hasActiveFilters = filters.search || filters.gender !== 'All' || filters.status !== 'All';

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name..."
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 bg-card border-border"
                />
            </div>

            <Select value={filters.gender} onValueChange={handleGenderChange}>
                <SelectTrigger className="w-full sm:w-40 bg-card border-border">
                    <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Genders</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full sm:w-40 bg-card border-border">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>

            {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Clear
                </Button>
            )}
        </div>
    );
};

export default EmployeeFiltersComponent;
