import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return <main className="container mx-auto px-4 pb-8 pt-14"></main>;
}
