"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  MoreHorizontal,
  UserCog,
  Ban,
  Mail,
  Eye,
  ShieldAlert,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UserManagementTableProps {
  filter: "all" | "buyer" | "seller" | "admin" | "flagged"
}

export function UserManagementTable({ filter }: UserManagementTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showSuspendDialog, setShowSuspendDialog] = useState(false)

  // Sample data - in a real app, this would come from an API
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      type: "buyer",
      status: "active",
      joinDate: "2023-01-15",
      lastActive: "2023-07-20",
      purchases: 12,
      flagged: false,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      type: "seller",
      status: "active",
      joinDate: "2023-02-20",
      lastActive: "2023-07-21",
      listings: 8,
      flagged: false,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      type: "buyer",
      status: "inactive",
      joinDate: "2023-03-10",
      lastActive: "2023-06-15",
      purchases: 5,
      flagged: false,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      type: "seller",
      status: "active",
      joinDate: "2023-01-05",
      lastActive: "2023-07-19",
      listings: 12,
      flagged: false,
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      type: "admin",
      status: "active",
      joinDate: "2022-12-01",
      lastActive: "2023-07-21",
      flagged: false,
    },
    {
      id: "6",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      type: "buyer",
      status: "active",
      joinDate: "2023-02-15",
      lastActive: "2023-07-18",
      purchases: 8,
      flagged: false,
    },
    {
      id: "7",
      name: "David Miller",
      email: "david.miller@example.com",
      type: "seller",
      status: "suspended",
      joinDate: "2023-03-25",
      lastActive: "2023-07-10",
      listings: 5,
      flagged: true,
    },
    {
      id: "8",
      name: "Jessica Taylor",
      email: "jessica.taylor@example.com",
      type: "buyer",
      status: "pending",
      joinDate: "2023-07-15",
      lastActive: "2023-07-15",
      purchases: 0,
      flagged: false,
    },
    {
      id: "9",
      name: "James Anderson",
      email: "james.anderson@example.com",
      type: "seller",
      status: "active",
      joinDate: "2023-04-10",
      lastActive: "2023-07-20",
      listings: 15,
      flagged: true,
    },
    {
      id: "10",
      name: "Lisa Thomas",
      email: "lisa.thomas@example.com",
      type: "admin",
      status: "active",
      joinDate: "2022-11-05",
      lastActive: "2023-07-21",
      flagged: false,
    },
  ]

  // Filter users based on the selected filter
  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true
    if (filter === "buyer") return user.type === "buyer"
    if (filter === "seller") return user.type === "seller"
    if (filter === "admin") return user.type === "admin"
    if (filter === "flagged") return user.flagged
    return true
  })

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
            onCheckedChange={toggleSelectAll}
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={selectedUsers.length === 0} onClick={() => {}}>
            <Mail className="mr-2 h-4 w-4" />
            Email Selected
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            disabled={selectedUsers.length === 0}
            onClick={() => setShowSuspendDialog(true)}
          >
            <Ban className="mr-2 h-4 w-4" />
            Suspend
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    id={`select-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{user.name}</p>
                        {user.flagged && (
                          <Badge variant="destructive" className="ml-2">
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.type === "admin" ? "default" : "outline"}>
                    {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "outline"
                        : user.status === "inactive"
                          ? "secondary"
                          : user.status === "suspended"
                            ? "destructive"
                            : "default"
                    }
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  {user.type === "buyer"
                    ? `${user.purchases} purchases`
                    : user.type === "seller"
                      ? `${user.listings} listings`
                      : "Admin activity"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "suspended" ? (
                        <DropdownMenuItem>
                          <Unlock className="mr-2 h-4 w-4" />
                          Unsuspend User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                      )}
                      {user.flagged ? (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Clear Flag
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Flag User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Selected Users</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend {selectedUsers.length} selected users? This will prevent them from
              accessing the platform until they are unsuspended.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <ShieldAlert className="h-10 w-10 text-destructive" />
              <div>
                <h4 className="font-medium">This is an administrative action</h4>
                <p className="text-sm text-muted-foreground">
                  This action will be logged and visible to other administrators.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle suspension logic here
                setShowSuspendDialog(false)
                setSelectedUsers([])
              }}
            >
              <Lock className="mr-2 h-4 w-4" />
              Suspend Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
