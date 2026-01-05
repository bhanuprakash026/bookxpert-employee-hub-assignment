import { Users, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardProps {
    title: string;
    value: number;
    icon: 'total' | 'active' | 'inactive';
    isLoading?: boolean;
}

const iconMap = {
    total: Users,
    active: UserCheck,
    inactive: UserX,
};

const colorMap = {
    total: 'text-primary bg-primary/10',
    active: 'text-green-500 bg-green-500/10',
    inactive: 'text-red-500 bg-red-500/10',
};

const StatsCard = ({ title, value, icon, isLoading }: StatsCardProps) => {
    const Icon = iconMap[icon];

    return (
        <Card className="bg-card border-border">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                        {isLoading ? (
                            <Skeleton className="h-9 w-16" />
                        ) : (
                            <p className="text-3xl font-bold">{value}</p>
                        )}
                    </div>
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center ${colorMap[icon]}`}>
                        <Icon className="h-7 w-7" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
