
"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ban, UserCheck, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const users = [
    { id: 1, name: "Ravi Kumar", email: "ravi.kumar@example.com", role: "Player", status: "Active", avatar: "https://placehold.co/100x100.png" },
    { id: 2, name: "Mr. Owner", email: "owner@example.com", role: "Owner", status: "Active", avatar: "https://placehold.co/100x100.png" },
    { id: 3, name: "Priya Singh", email: "priya.singh@example.com", role: "Player", status: "Banned", avatar: "https://placehold.co/100x100.png" },
    { id: 101, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/100x100.png" },
];

export default function UserManagementPage() {
  return (
    <div className="space-y-8">
       <header>
            <h1 className="text-4xl font-bold font-headline">User Management</h1>
            <p className="text-muted-foreground">Search, filter, and manage all users on the platform.</p>
        </header>

        <Card>
            <CardContent className="p-4">
                <form className="flex items-center gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by name or email..." className="pl-10" />
                    </div>
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="player">Player</SelectItem>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="banned">Banned</SelectItem>
                        </SelectContent>
                    </Select>
                </form>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-0">
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person user"/>
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p>{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}  className={user.status === 'Active' ? 'bg-green-600' : ''}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {user.status === 'Active' ? (
                                        <Button variant="destructive" size="sm">
                                            <Ban className="mr-2 h-4 w-4" />
                                            Ban User
                                        </Button>
                                    ) : (
                                         <Button variant="secondary" size="sm">
                                            <UserCheck className="mr-2 h-4 w-4" />
                                            Unban User
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
