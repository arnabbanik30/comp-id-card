import { ChevronDownIcon } from 'lucide-react';
import { useSelector } from '@tanstack/react-store';
import { Menubar, MenubarMenu, MenubarTrigger } from '../menubar';
import { Button } from '../button';
import { authStore } from '#/stores/auth';
import {
  resetCompetitions,
  setCompetitions,
} from '#/lib/competitions/competitions';

export function SubHeader() {
  const isSignedIn = useSelector(authStore, (state) => state['isSignedIn']);

  if (!isSignedIn) {
    resetCompetitions();
    return null;
  }
  setCompetitions();

  return (
    <div className="w-full max-w-full justify-start border-b border-t border-[var(--line)] bg-[var(--sand)]">
      <Menubar className="page-wrap">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button variant="ghost">
              Select a Competition
              <ChevronDownIcon className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 data-[state=open]:rotate-180" />
            </Button>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
