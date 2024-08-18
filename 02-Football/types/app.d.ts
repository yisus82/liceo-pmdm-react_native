export interface Team {
  id: string;
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

type TeamSnapshotData = {
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
};

export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
export type PlayerPositionLabel = 'GK' | 'DF' | 'MF' | 'FW';

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  teamId?: string;
  photo?: string;
}

type PlayerSnapshotData = {
  name: string;
  position: PlayerPosition;
  teamId?: string;
  photo?: string;
};
