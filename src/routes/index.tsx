import { createFileRoute } from '@tanstack/react-router';
import { ConfigCard } from '#/components/ui/main-layout/config/ConfigCard';
import { PreviewCard } from '#/components/ui/main-layout/preview/PreviewCard';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <main className="container mx-auto px-4 pt-14 h-[750px]">
      <div className="flex flex-row gap-6 h-full">
        <ConfigCard />
        <PreviewCard />
      </div>
    </main>
  );
}
