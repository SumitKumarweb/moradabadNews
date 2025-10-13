import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure site settings and preferences</p>
        </div>
      </div>
    </AdminLayout>
  )
}
