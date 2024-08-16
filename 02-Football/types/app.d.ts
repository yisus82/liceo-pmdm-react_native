export interface Team {
  id: number;
  name: string;
  location: {
    city: string;
    country: string;
  };
  stadium: {
    name: string;
    capacity: number;
  };
  logo?: string;
}

export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
export type PlayerPositionLabel = 'GK' | 'DF' | 'MF' | 'FW';

export interface Player {
  id: number;
  name: string;
  position: PlayerPosition;
  teamId: number;
  photo?: string;
}
