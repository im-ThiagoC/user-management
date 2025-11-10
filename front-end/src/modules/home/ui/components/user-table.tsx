// src/components/UserTable.tsx
"use client";

import React from 'react';
import { UserWithProfile } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserTableProps {
	 users: UserWithProfile[];
	 onEdit: (user: UserWithProfile) => void;
	 onDelete: (id: string) => void;
	 onToggleStatus: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onToggleStatus }) => {
	 if (users.length === 0) {
	 	 return (
	 	 	 <div className="bg-white rounded-lg shadow-sm">
	 	 	 	 <div className="text-center py-12 text-[#6C757D]">
	 	 	 	 	 No users found matching the filters
	 	 	 	 </div>
	 	 	 </div>
	 	 );
	 }

	 return (
	 	 <div className="bg-white rounded-lg shadow-sm overflow-hidden">
	 	 	 <Table>
	 	 	 	 <TableHeader className="bg-[#E9ECEF]">
	 	 	 	 	 <TableRow>
	 	 	 	 	 	 <TableHead className="text-[#343A40] font-semibold">ID</TableHead>
	 	 	 	 	 	 <TableHead className="text-[#343A40] font-semibold">Name</TableHead>
	 	 	 	 	 	 <TableHead className="text-[#343A40] font-semibold">Email</TableHead>
	 	 	 	 	 	 <TableHead className="text-[#343A40] font-semibold">Profile</TableHead>
	 	 	 	 	 	 <TableHead className="text-[#343A40] font-semibold">Status</TableHead>
	 	 	 	 	 	 <TableHead className="text-[#343A40] font-semibold">Actions</TableHead>
	 	 	 	 	 </TableRow>
	 	 	 	 </TableHeader>
	 	 	 	 <TableBody>
	 	 	 	 	 {users.map(user => (
	 	 	 	 	 	 <TableRow key={user.id} className="hover:bg-[#E9ECEF]/50 border-[#E9ECEF]">
	 	 	 	 	 	 	 <TableCell className="text-sm text-[#6C757D] font-mono">{user.id.slice(0, 8)}</TableCell>
	 	 	 	 	 	 	 <TableCell className="text-sm font-medium text-[#343A40]">{user.firstName} {user.lastName}</TableCell>
	 	 	 	 	 	 	 <TableCell className="text-sm text-[#6C757D]">{user.email}</TableCell>
	 	 	 	 	 	 	 <TableCell>
	 	 	 	 	 	 	 	 <Badge 
										variant="default" 
										className="bg-[#0A2342] text-[#F8F9FA] hover:bg-[#0A2342]/90"
								>
	 	 	 	 	 	 	 	 	 {user.profile?.name || 'Unknown'}
	 	 	 	 	 	 	 	 </Badge>
	 	 	 	 	 	 	 </TableCell>
	 	 	 	 	 	 	 <TableCell>
	 	 	 	 	 	 	 	 <Button
	 	 	 	 	 	 	 	 	 variant="outline"
	 	 	 	 	 	 	 	 	 size="sm"
	 	 	 	 	 	 	 	 	 onClick={() => onToggleStatus(user.id)}
	 	 	 	 	 	 	 	 	 className={`
												text-xs font-medium 
												${user.isActive
														? 'bg-[#28A745]/10 text-[#28A745] hover:bg-[#28A745]/20 border-[#28A745]/30'
														: 'bg-[#DC3545]/10 text-[#DC3545] hover:bg-[#DC3545]/20 border-[#DC3545]/30'
												}
										`}
	 	 	 	 	 	 	 	 >
	 	 	 	 	 	 	 	 	 {user.isActive ? '● Active' : '○ Inactive'}
	 	 	 	 	 	 	 	 </Button>
	 	 	 	 	 	 	 </TableCell>
	 	 	 	 	 	 	 <TableCell className="space-x-2">
	 	 	 	 	 	 	 	 <Button 
										variant="link" 
										onClick={() => onEdit(user)} 
										className="text-[#1B4F72] hover:text-[#0A2342] h-auto p-0"
								>
										Edit
								</Button>
	 	 	 	 	 	 	 	 <Button 
										variant="link" 
										onClick={() => onDelete(user.id)} 
										className="text-[#DC3545] hover:text-[#DC3545]/80 h-auto p-0"
								>
										Delete
								</Button>
	 	 	 	 	 	 	 </TableCell>
	 	 	 	 	 	 </TableRow>
	 	 	 	 	 ))}
	 	 	 	 </TableBody>
	 	 	 </Table>
	 	 </div>
	 );
};