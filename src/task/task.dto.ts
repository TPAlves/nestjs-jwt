export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  updatedDate: Date;
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}
