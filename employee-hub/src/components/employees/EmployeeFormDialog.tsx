import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X, UserCircle } from 'lucide-react';
import type { Employee, EmployeeFormData } from '@/types/employee';
import { INDIAN_STATES, GENDERS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const employeeSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    gender: z.enum(['Male', 'Female', 'Other']),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    profileImage: z.string().optional(),
    state: z.string().min(1, 'State is required'),
    isActive: z.boolean(),
});

interface EmployeeFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: EmployeeFormData) => void;
    employee?: Employee | null;
    isLoading?: boolean;
}

const EmployeeFormDialog = ({
    open,
    onOpenChange,
    onSubmit,
    employee,
    isLoading = false,
}: EmployeeFormDialogProps) => {
    const [imagePreview, setImagePreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            fullName: '',
            gender: 'Male',
            dateOfBirth: '',
            profileImage: '',
            state: '',
            isActive: true,
        },
    });

    useEffect(() => {
        if (employee) {
            reset({
                fullName: employee.fullName,
                gender: employee.gender,
                dateOfBirth: employee.dateOfBirth,
                profileImage: employee.profileImage,
                state: employee.state,
                isActive: employee.isActive,
            });
            setImagePreview(employee.profileImage);
        } else {
            reset({
                fullName: '',
                gender: 'Male',
                dateOfBirth: '',
                profileImage: '',
                state: '',
                isActive: true,
            });
            setImagePreview('');
        }
    }, [employee, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImagePreview(base64);
                setValue('profileImage', base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview('');
        setValue('profileImage', '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onFormSubmit = (data: EmployeeFormData) => {
        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {employee ? 'Edit Employee' : 'Add New Employee'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-24 w-24 rounded-full object-cover border-2 border-border"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                                    <UserCircle className="h-12 w-12 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="profile-image"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Photo
                            </Button>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                            id="fullName"
                            {...register('fullName')}
                            placeholder="Enter full name"
                            className="bg-card"
                        />
                        {errors.fullName && (
                            <p className="text-sm text-destructive">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                        <Label>Gender *</Label>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex gap-6"
                                >
                                    {GENDERS.map((gender) => (
                                        <div key={gender} className="flex items-center gap-2">
                                            <RadioGroupItem value={gender} id={gender} />
                                            <Label htmlFor={gender} className="font-normal cursor-pointer">
                                                {gender}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        {errors.gender && (
                            <p className="text-sm text-destructive">{errors.gender.message}</p>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            {...register('dateOfBirth')}
                            className="bg-card"
                        />
                        {errors.dateOfBirth && (
                            <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                        )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                        <Label>State *</Label>
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="bg-card">
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                        {INDIAN_STATES.map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.state && (
                            <p className="text-sm text-destructive">{errors.state.message}</p>
                        )}
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center justify-between">
                        <Label htmlFor="isActive">Active Status</Label>
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    id="isActive"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isLoading}>
                            {isLoading ? 'Saving...' : employee ? 'Update' : 'Add Employee'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeFormDialog;
