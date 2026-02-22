import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8 text-foreground">
        <h1 className="text-3xl font-bold">NexApprove</h1>
        <p className="text-muted-foreground">System preference is default</p>
        <ThemeToggle />
        <Button>Get Started</Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
