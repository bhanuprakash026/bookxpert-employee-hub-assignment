import type { ReactNode } from 'react';

type DashboardLayoutProps = {
    children: ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div>
            <h1>DashboardLayout</h1>
            {children}
        </div>
    )
}

export default DashboardLayout;