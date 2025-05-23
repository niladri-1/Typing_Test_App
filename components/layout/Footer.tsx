export function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TypeTest. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}