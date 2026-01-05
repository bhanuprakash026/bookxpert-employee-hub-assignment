import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Users className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    );
};

export default EmptyState;
