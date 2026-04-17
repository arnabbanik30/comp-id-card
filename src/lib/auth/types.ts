export type WcaCountry = {
  id: string;
  name: string;
  continent_id: string;
  iso2: string;
};

export type WcaAvatar = {
  id: number;
  status: string;
  thumbnail_crop_x: number;
  thumbnail_crop_y: number;
  thumbnail_crop_w: number;
  thumbnail_crop_h: number;
  url: string;
  thumb_url: string;
  is_default: boolean;
  can_edit_thumbnail: boolean;
};

export type WcaUser = {
  id: number;
  wca_id: string;
  name: string;
  gender: string;
  country_iso2: string;
  created_at: string;
  updated_at: string;
  url: string;
  country: WcaCountry;
  location: string;
  region_id: number;
  delegate_status: string | null;
  email: string;
  class: string;
  teams: unknown[];
  avatar: WcaAvatar;
  dob: string;
};
