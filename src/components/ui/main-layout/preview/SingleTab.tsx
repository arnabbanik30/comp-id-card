import { useMemo, useState } from 'react';
import { useSelector } from '@tanstack/react-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../select';
import {
  A6Card,
  IdCardCompetitorInfo,
  IdCardFooter,
  IdCardGroupInfo,
  IdCardHeader,
  IdCardPunchHole,
} from '../../id-card';
import type { PersonWCIF } from '#/lib/wcif/types';
import { competitionsStore } from '#/stores/competitions';
import {
  getAllActivities,
  getCompetitionEvents,
  placeEventsAtEnd,
} from '#/lib/competitions/helper';

export function SingleTab() {
  const compData = useSelector(
    competitionsStore,
    (state) => state.compDataWCIF,
  );
  const [selectedPerson, setSelectedPerson] = useState<PersonWCIF | null>(null);

  const allActivities = useMemo(
    () => compData && getAllActivities(compData),
    [compData],
  );

  const competitionEvents = useMemo(() => {
    if (!compData) {
      return null;
    }
    const events = getCompetitionEvents(compData);
    return placeEventsAtEnd(['333mbf', '333fm'], events);
  }, [compData]);

  if (!compData) {
    return null;
  }

  const handleValueChange = (value: string) => {
    const idx = parseInt(value);
    setSelectedPerson(compData.persons![idx]);
  };
  return (
    <>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger defaultValue={selectedPerson?.name ?? ''}>
          <SelectValue placeholder={'Select a Person'} />
        </SelectTrigger>
        <SelectContent
          className="!max-h-[250px]"
          position="popper"
          align="start"
        >
          {compData.persons?.map((person, idx) => (
            <>
              {person.registrantId && (
                <SelectItem
                  key={person.registrantId}
                  value={idx.toString()}
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
          <IdCardCompetitorInfo
            name={selectedPerson?.name ?? ''}
            wcaId={selectedPerson?.wcaId}
            registrantId={selectedPerson?.registrantId ?? -1}
          />
          {selectedPerson?.assignments && (
            <IdCardGroupInfo
              personInfo={selectedPerson}
              eventsInfo={competitionEvents!}
              allActivities={allActivities!}
            />
          )}
          <IdCardFooter />
        </A6Card>
      </div>
    </>
  );
}
