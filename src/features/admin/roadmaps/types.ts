export type Roadmap = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRoadmap = {
  name: string;
  description: string;
};
