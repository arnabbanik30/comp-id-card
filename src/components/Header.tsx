import { LoginButton } from './ui/login-button/LoginButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="text-xl font-semibold">Generate Competition ID Card</h2>
        <LoginButton />
      </nav>
    </header>
  );
}
