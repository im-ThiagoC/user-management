"use client"

import { Check, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
	const { theme, setTheme } = useTheme()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
					<Check className={`ml-auto h-4 w-4 ${theme === "light" ? "opacity-100" : "opacity-0"}`} />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
					<Check className={`ml-auto h-4 w-4 ${theme === "dark" ? "opacity-100" : "opacity-0"}`} />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
					<Check className={`ml-auto h-4 w-4 ${theme === "system" ? "opacity-100" : "opacity-0"}`} />	
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}