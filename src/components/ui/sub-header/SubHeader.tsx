import { ChevronDownIcon } from 'lucide-react';
import { useSelector } from '@tanstack/react-store';
import { useEffect, useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../menubar';
import { Button } from '../button';
import { ScrollArea } from '../scroll-area';
import type { CompetitionType } from '#/lib/competitions/types';
import { authStore } from '#/stores/auth';
import {
  resetCompetitions,
  setCompetitions,
} from '#/lib/competitions/competitions';
import { competitionsStore, setSelectedCompId } from '#/stores/competitions';
import { getCompetitionWCIF } from '#/lib/wcif/competition-wcif';

export function SubHeader() {
  const isSignedIn = useSelector(authStore, (state) => state.isSignedIn);
  const competitions = useSelector(
    competitionsStore,
    (state) => state.competitions,
  );
  const [selectedComp, setSelectedComp] = useState<CompetitionType | null>(
    null,
  );
  useEffect(() => {
    if (selectedComp?.id) {
      getCompetitionWCIF(selectedComp.id);
    }
  }, [selectedComp]);

  if (!isSignedIn) {
    resetCompetitions();
    return null;
  }
  setCompetitions();

  return (
    <div className="w-full max-w-full justify-start border-b border-t border-[var(--line)] bg-[var(--sand)]">
      <Menubar className="container mx-auto">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button variant="ghost">
              {selectedComp?.name ?? 'Select a Competition'}
              <ChevronDownIcon className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 data-[state=open]:rotate-180" />
            </Button>
          </MenubarTrigger>
          <MenubarContent>
            <ScrollArea className="h-[200px]">
              {competitions?.map((comp, idx) => (
                <>
                  <MenubarItem
                    key={comp.id}
                    onSelect={() => {
                      setSelectedComp(comp);
                      setSelectedCompId(comp.id);
                    }}
                  >
                    {comp.name}
                  </MenubarItem>
                  {idx !== competitions.length - 1 && <MenubarSeparator />}
                </>
              ))}
            </ScrollArea>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
