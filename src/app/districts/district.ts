
export interface District {
  uid: string;
  name?: string;
  theftsCount?: number;
  cities?: City[]
}

export class City {
  uid: string;
  district: string;
  name?: string;
  theftsCount?: number;
  }
