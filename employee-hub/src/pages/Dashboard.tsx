import { useQuery } from '@tanstack/react-query';
import { employeeService } from '@/services/employeeService';
import StatsCard from '@/components/employees/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, Users } from 'lucide-react';

const Dashboard = () => {
    const { data: employees = [], isLoading } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeService.getAll,
    });

    const totalEmployees = employees.length;
    const activeEmployees = employees.filter((emp) => emp.isActive).length;
    const inactiveEmployees = employees.filter((emp) => !emp.isActive).length;

    // Get gender distribution
    const maleCount = employees.filter((emp) => emp.gender === 'Male').length;
    const femaleCount = employees.filter((emp) => emp.gender === 'Female').length;
    const otherCount = employees.filter((emp) => emp.gender === 'Other').length;

    // Get state distribution (top 5)
    const stateDistribution = employees.reduce((acc, emp) => {
        acc[emp.state] = (acc[emp.state] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topStates = Object.entries(stateDistribution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's an overview of your employee management system.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Employees"
                    value={totalEmployees}
                    icon="total"
                    isLoading={isLoading}
                />
                <StatsCard
                    title="Active Employees"
                    value={activeEmployees}
                    icon="active"
                    isLoading={isLoading}
                />
                <StatsCard
                    title="Inactive Employees"
                    value={inactiveEmployees}
                    icon="inactive"
                    isLoading={isLoading}
                />
            </div>

            {/* Additional Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gender Distribution */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Gender Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Male</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${totalEmployees ? (maleCount / totalEmployees) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <span className="font-medium w-8">{maleCount}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Female</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-pink-500 rounded-full"
                                            style={{ width: `${totalEmployees ? (femaleCount / totalEmployees) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <span className="font-medium w-8">{femaleCount}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Other</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full"
                                            style={{ width: `${totalEmployees ? (otherCount / totalEmployees) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <span className="font-medium w-8">{otherCount}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Top States */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Top States
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {topStates.length > 0 ? (
                            <div className="space-y-3">
                                {topStates.map(([state, count], index) => (
                                    <div key={state} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="h-6 w-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
                                                {index + 1}
                                            </span>
                                            <span className="text-muted-foreground">{state}</span>
                                        </div>
                                        <span className="font-medium">{count} employees</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No data available</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Quick Stats
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-2xl font-bold text-primary">
                                {totalEmployees ? Math.round((activeEmployees / totalEmployees) * 100) : 0}%
                            </p>
                            <p className="text-sm text-muted-foreground">Active Rate</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-2xl font-bold text-primary">
                                {Object.keys(stateDistribution).length}
                            </p>
                            <p className="text-sm text-muted-foreground">States Covered</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-2xl font-bold text-primary">
                                {totalEmployees ? Math.round((maleCount / totalEmployees) * 100) : 0}%
                            </p>
                            <p className="text-sm text-muted-foreground">Male Ratio</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                            <p className="text-2xl font-bold text-primary">
                                {totalEmployees ? Math.round((femaleCount / totalEmployees) * 100) : 0}%
                            </p>
                            <p className="text-sm text-muted-foreground">Female Ratio</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
