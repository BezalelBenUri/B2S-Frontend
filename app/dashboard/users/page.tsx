import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserManagementTable } from "@/components/admin/user-management-table"
import { UserStats } from "@/components/admin/user-stats"
import { Plus, Filter, Download } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage all platform users and their permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <UserStats />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input placeholder="Search users by name, email, or ID..." className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="buyer">Buyers</SelectItem>
                <SelectItem value="seller">Sellers</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="active">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending Verification</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="buyers">Buyers</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagementTable filter="all" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="buyers">
            <Card>
              <CardHeader>
                <CardTitle>Buyers</CardTitle>
                <CardDescription>Manage users with buyer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagementTable filter="buyer" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sellers">
            <Card>
              <CardHeader>
                <CardTitle>Sellers</CardTitle>
                <CardDescription>Manage users with seller accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagementTable filter="seller" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <CardTitle>Administrators</CardTitle>
                <CardDescription>Manage platform administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagementTable filter="admin" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="flagged">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Users</CardTitle>
                <CardDescription>Users flagged for suspicious activity</CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagementTable filter="flagged" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
