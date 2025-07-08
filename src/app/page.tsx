import { Leaf } from 'lucide-react';
import DiseaseAnalyzer from '@/components/disease-analyzer';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <Leaf className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary font-headline">
          VerdantVision
        </h1>
      </header>
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
        <div className="w-full max-w-2xl text-center">
            <p className="text-muted-foreground">
              Snap a photo of a plant leaf, and our AI will help you identify potential diseases and suggest treatments.
            </p>
        </div>
        <DiseaseAnalyzer />
      </main>
      <footer className="flex items-center justify-center p-4 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 VerdantVision. All rights reserved.</p>
      </footer>
    </div>
  );
}
