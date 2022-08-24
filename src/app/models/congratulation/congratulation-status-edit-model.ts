export interface IEditCongratulationStatus {
  id: number;
  status: number;
}

export class EditCongratulationStatus implements IEditCongratulationStatus {
  id: number;
  status: number;

  constructor(
    data?: Partial<IEditCongratulationStatus>) {
    const defaults: IEditCongratulationStatus = {
      id: 0,
      status: null,
      ...data
    };

    this.id = defaults.id;
    this.status = defaults.status;
  }
}