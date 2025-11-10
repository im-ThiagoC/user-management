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
	 	 	 <div className=" rounded-lg shadow-sm">
	 	 	 	 <div className="text-center py-12">
	 	 	 	 	 No users found matching the filters
	 	 	 	 </div>
	 	 	 </div>
	 	 );
	 }

	 return (
	 	 <div className="rounded-lg shadow-sm overflow-hidden">
	 	 	 <Table>
	 	 	 	 <TableHeader>
	 	 	 	 	 <TableRow>
	 	 	 	 	 	 <TableHead>	ID			</TableHead>
	 	 	 	 	 	 <TableHead>	Name		</TableHead>
	 	 	 	 	 	 <TableHead>	Email		</TableHead>
	 	 	 	 	 	 <TableHead>	Profile	</TableHead>
	 	 	 	 	 	 <TableHead>	Status	</TableHead>
	 	 	 	 	 	 <TableHead>	Actions	</TableHead>
	 	 	 	 	 </TableRow>
	 	 	 	 </TableHeader>
	 	 	 	 <TableBody>
	 	 	 	 	 {users.map(user => (
	 	 	 	 	 	 <TableRow key={user.id}>
	 	 	 	 	 	 	 <TableCell className="text-sm font-mono">{user.id.slice(0, 8)}</TableCell>
	 	 	 	 	 	 	 <TableCell className="text-sm font-medium">{user.firstName} {user.lastName}</TableCell>
	 	 	 	 	 	 	 <TableCell className="text-sm">{user.email}</TableCell>
	 	 	 	 	 	 	 <TableCell>
	 	 	 	 	 	 	 	 <Badge 
										variant="default" 
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
										className="h-auto p-0"
								>
										Edit
								</Button>
	 	 	 	 	 	 	 	 <Button 
										variant="link" 
										onClick={() => onDelete(user.id)} 
										className="h-auto p-0 text-red-500 hover:text-red-600"
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