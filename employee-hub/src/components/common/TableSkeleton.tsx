import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface TableSkeletonProps {
    columns?: number;
    rows?: number;
}

const TableSkeleton = ({ columns = 7, rows = 5 }: TableSkeletonProps) => {
    return (
        <div className="rounded-lg border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        {Array.from({ length: columns }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-20" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    {colIndex === 1 ? (
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                    ) : (
                                        <Skeleton className="h-4 w-24" />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableSkeleton;
