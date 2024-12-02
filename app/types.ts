export type Trip = {
  id: number;
  name: string;
  description: string;
  year: number;
  color: string;
  departure_port: string;
  departure_date: string;
  arrival_port: string;
  arrival_date: string;
};

export type Stage = {
  id: number;
  trip_id: number;
  name: string;
  description: string;
  departure_port: string;
  departure_date: string;
  arrival_port: string;
  arrival_date: string;
};

export type Waypoint = {
  id: number;
  stage_id: number;
  latitude: number;
  longitude: number;
};
