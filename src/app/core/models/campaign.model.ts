export interface ICampaign {
  id?: string;
  title: string;
  description: string;
  targetAgeMinMonths: number;
  targetAgeMaxMonths: number;
  startDate: Date;
  endDate: Date;
}

export class Campaign implements ICampaign {
  id?: string;
  title: string;
  description: string;
  targetAgeMinMonths: number;
  targetAgeMaxMonths: number;
  startDate: Date;
  endDate: Date;

  constructor(data: ICampaign) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.targetAgeMinMonths = data.targetAgeMinMonths;
    this.targetAgeMaxMonths = data.targetAgeMaxMonths;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
  }

  get isActive(): boolean {
    const today = new Date();
    return today >= this.startDate && today <= this.endDate;
  }

  public isTargetedForChild(childAgeInMonths: number): boolean {
    return childAgeInMonths >= this.targetAgeMinMonths
      && childAgeInMonths <= this.targetAgeMaxMonths;
  }
}
