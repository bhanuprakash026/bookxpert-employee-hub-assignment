import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    LogOut,
    Menu,
    X,
    UserCircle
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employees', label: 'Employees', icon: Users },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300',
                    sidebarOpen ? 'w-64' : 'w-0 lg:w-16'
                )}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
                    {sidebarOpen && (
                        <h1 className="text-xl font-bold text-sidebar-foreground">
                            EMP<span className="text-primary">Manager</span>
                        </h1>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 overflow-hidden">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="border-t border-sidebar-border p-4">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <UserCircle className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-sidebar-foreground truncate">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    ) : null}
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className={cn(
                            'text-destructive hover:bg-destructive/10 hover:text-destructive',
                            sidebarOpen ? 'w-full justify-start' : 'w-full justify-center'
                        )}
                    >
                        <LogOut className="h-5 w-5" />
                        {sidebarOpen && <span className="ml-2">Logout</span>}
                    </Button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-h-screen overflow-auto">
                {/* Header */}
                <header className="h-16 bg-card border-b border-border flex items-center px-6 sticky top-0 z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden mr-4"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h2 className="text-lg font-semibold">
                        {navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
                    </h2>
                </header>

                {/* Page Content */}
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
};

export default DashboardLayout;
