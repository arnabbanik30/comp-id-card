import { useSelector } from '@tanstack/react-store';
import { AvatarMenu } from './ui/auth/AvatarMenu';
import { LoginButton } from './ui/auth/LoginButton';
import { authStore } from '#/stores/auth';

export default function Header() {
  const isSignedIn = useSelector(authStore, (state) => state['isSignedIn']);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="container mx-auto flex flex-wrap justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="text-xl font-semibold">Generate Competition ID Card</h2>
        {isSignedIn ? <AvatarMenu /> : <LoginButton />}
      </nav>
    </header>
  );
}
