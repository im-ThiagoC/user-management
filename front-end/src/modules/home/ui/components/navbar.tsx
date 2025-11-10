"use client";

// Node imports
import Link from "next/link";
import Image from "next/image";

// UI components
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
	return (
		<nav className="p-4 fixed top-0 left-0 right-0 z-50 shadow-lg border-b">
			<div className="max-w-7xl mx-auto w-full flex justify-between items-center">
				<Link href={"/"} className="flex items-center gap-3">
					<Image
						src="/mid.svg"
						alt="MidFalconi Logo"
						width={48}
						height={48}
						className="invert dark:invert-0"
					/>
					<span className="font-extrabold text-xl tracking-wider">
						User Management
					</span>
				</Link>

				<ModeToggle />
			</div>
		</nav>
	);
};
