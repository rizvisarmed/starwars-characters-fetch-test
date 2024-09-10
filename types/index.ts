export interface People {
  name: string;
  homeworld?: string;
}

export interface Homeworld {
  [key: string]: string;
}
