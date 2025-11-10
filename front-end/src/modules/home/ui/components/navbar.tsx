"use client";

// Node imports
import Link from "next/link";
import Image from "next/image";

// UI components
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
	const { setTheme, theme } = useTheme();

	return (
		<nav className="p-4 bg-[#0F2C4A] fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-[#FF6C00]/50">
			<div className="max-w-7xl mx-auto w-full flex justify-between items-center">
				<Link href={"/"} className="flex items-center gap-3">
					<Image
						src="/mid.svg"
						alt="MidFalconi Logo"
						width={48}
						height={48}
					/>
					<span className="font-extrabold text-xl text-white tracking-wider">
						User Management
					</span>
				</Link>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							// Texto branco. No hover: fundo transparente, texto laranja.
							className="text-white hover:bg-transparent hover:text-[#FF6C00] transition-colors"
						>
							<SunMoonIcon className="size-4 mr-2" />
							<span className="font-semibold hidden sm:inline">Theme</span>
							<ChevronDownIcon className="size-4 ml-1" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side="bottom"
						align="end"
						// Conteúdo branco padrão do Shadcn
						className="bg-white text-[#0F2C4A] border-gray-300 shadow-xl"
					>
						<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
							<DropdownMenuRadioItem
								value="light"
								// No check: Fundo Laranja de acento, texto Azul Marinho para contraste.
								className="focus:bg-[#FF6C00]/20 data-[state=checked]:bg-[#FF6C00] data-[state=checked]:text-white font-semibold"
							>
								Light
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem
								value="dark"
								className="focus:bg-[#FF6C00]/20 data-[state=checked]:bg-[#FF6C00] data-[state=checked]:text-white font-semibold"
							>
								Dark
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem
								value="system"
								className="focus:bg-[#FF6C00]/20 data-[state=checked]:bg-[#FF6C00] data-[state=checked]:text-white font-semibold"
							>
								System
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};
