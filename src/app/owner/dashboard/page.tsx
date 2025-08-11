import Dashboard from './components/Dashboard';

export default function OwnerDashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Facility Dashboard</h1>
        <p className="text-muted-foreground">Manage your venues, bookings, and reviews.</p>
      </header>
      <Dashboard />
    </div>
  );
}
