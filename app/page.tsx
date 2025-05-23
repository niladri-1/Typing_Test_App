import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TypingTest } from '@/components/typing-test/TypingTest';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <TypingTest />
      </main>
      <Footer />
    </div>
  );
}