
export interface Image {
  id: string;
  path: string,
  name?: string;
  size?: number;
  downloadURL?: string;
}

export class Bicycle {
    id?: string;
    brand?: string;
    description?: string;
    color?: string;
    serialNo?: string;
    images?: Image[];
  }
