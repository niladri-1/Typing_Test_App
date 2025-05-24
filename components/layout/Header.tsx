'use client';

import { ModeToggle } from '@/components/theme/ModeToggle';
import { KeyboardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export function Header() {
	const { theme } = useTheme();

	return (
		<header className="w-full py-4 px-6 border-b transition-all duration-300">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<KeyboardIcon className="h-6 w-6" />
					<span className="font-bold text-xl">TypeTest</span>
				</div>
				<div className="flex items-center space-x-4">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}