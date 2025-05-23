export function Footer() {
	return (
		<footer className="w-full py-6 px-6 border-t">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
				<div className="text-sm text-muted-foreground">
					© {new Date().getFullYear()} TypeTest. All rights reserved.
				</div>
				<div className="flex space-x-6 mt-4 md:mt-0">
					<a href="https://linkedin.com/in/niladri1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						LinkedIn
					</a>
					<a href="https://github.com/niladri-1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						Github
					</a>
					<a href="https://niladri1.vercel.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						Portfolio
					</a>
				</div>
			</div>
		</footer>
	);
}