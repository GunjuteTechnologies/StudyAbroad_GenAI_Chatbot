import { Background } from "@/components/background";
import AuthPage from "@/components/login";
import '@/app/globals.css';

export default function Home() {
  return (
    <div className="relative min-h-screen ">
      <Background />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <div className="absolute z-10 items-center ">
          <AuthPage />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
