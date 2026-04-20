export type AssignmentCodeWCIF =
  | 'competitor'
  | 'staff-judge'
  | 'staff-scrambler'
  | 'staff-runner'
  | 'staff-dataentry'
  | 'staff-announcer';

export type AssignmentsWCIF = {
  activityId: number | null;
  stationNumber: string | null;
  assignmentCode: AssignmentCodeWCIF | null;
};

export type PersonWCIF = {
  name: string | null;
  wcaId: string | null | undefined;
  registrantId: number;
  countryIso2: string | null;
  assignments: Array<AssignmentCodeWCIF> | null;
};

export type ActivityWCIF = {
  id: number | null;
  name: string | null;
  // https://github.com/thewca/wcif/blob/stable/specification.md#activitycode
  activityCode: string | null;
  childActivities: Array<ActivityWCIF> | null;
};

export type RoomWCIF = {
  id: number | null;
  name: string | null;
  color: string | null; //  this is hex code
  activities: Array<ActivityWCIF> | null;
};
export type VenueWCIF = {
  id: number | null;
  name: string | null;
  timezone: string | null;
  rooms: Array<RoomWCIF> | null;
};
export type ScheduleWCIF = {
  venues: Array<VenueWCIF> | null;
};
export type CompetitionWCIF = {
  persons: Array<PersonWCIF> | null;
  schedule: ScheduleWCIF | null;
};
