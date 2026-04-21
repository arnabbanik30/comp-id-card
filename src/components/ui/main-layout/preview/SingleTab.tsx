import { useState } from 'react';
import { useSelector } from '@tanstack/react-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select';
import type { PersonWCIF } from '#/lib/wcif/types';
import { competitionsStore } from '#/stores/competitions';
import { A6Card, IdCardHeader, IdCardPunchHole } from '../../id-card';

export function SingleTab() {
  const compData = useSelector(
    competitionsStore,
    (state) => state.compDataWCIF,
  );
  const [selectedPerson, setSelectedPerson] = useState<PersonWCIF | null>(null);

  if (!compData) {
    return null;
  }

  return (
    <>
      <Select>
        <SelectTrigger defaultValue={selectedPerson?.name ?? ''}>
          <SelectValue placeholder={'Select a Person'} />
        </SelectTrigger>
        <SelectContent
          className="!max-h-[250px]"
          position="popper"
          align="start"
        >
          {compData.persons?.map((person) => (
            <>
              {person.registrantId && (
                <SelectItem
                  key={person.registrantId}
                  value={person.registrantId.toString()}
                  onSelect={() => setSelectedPerson(person)}
                >
                  {`${person.name} - ${person.wcaId}`}
                </SelectItem>
              )}
            </>
          ))}
        </SelectContent>
      </Select>

      <div className="p-2 m-2 flex justify-center align-center">
        <A6Card>
          <IdCardPunchHole />
          <IdCardHeader
            name={compData.shortName!}
            date="7-8 May, 2026"
            venue="BUBT, MIRPUR"
          />
        </A6Card>
      </div>
    </>
  );
}
