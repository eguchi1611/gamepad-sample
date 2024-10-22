export interface Remote {
  [key: string]: {
    name: string;
    pos: {
      x: number;
      y: number;
    };
  };
}
