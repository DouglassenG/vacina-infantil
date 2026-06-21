export type VaccineStatus = 'CONCLUIDA' | 'AGENDADA' | 'ATRASADA';

export interface IVaccineDose {
  id: string;
  vaccineName: string;
  doseType: '1a Dose' | '2a Dose' | '3a Dose' | 'Reforco' | 'Dose Unica';
  targetAgeMonths: number;
  appliedDate?: Date;
  status: VaccineStatus;
  lotNumber?: string;
}

export class VaccineDoseModule implements IVaccineDose {
  id: string;
  vaccineName: string;
  doseType: '1a Dose' | '2a Dose' | '3a Dose' | 'Reforco' | 'Dose Unica';
  targetAgeMonths: number;
  appliedDate?: Date;
  status: VaccineStatus;
  lotNumber?: string;

  constructor(data: IVaccineDose) {
    this.id = data.id;
    this.vaccineName = data.vaccineName;
    this.doseType = data.doseType;
    this.targetAgeMonths = data.targetAgeMonths;
    this.appliedDate = data.appliedDate ? new Date(data.appliedDate) : undefined;
    this.status = data.status;
    this.lotNumber = data.lotNumber;
  }

  public evaluateStatus(childAgeInMonths: number): void {
    if (this.appliedDate) {
      this.status = 'CONCLUIDA';
    } else if (childAgeInMonths > this.targetAgeMonths) {
      this.status = 'ATRASADA';
    } else {
      this.status = 'AGENDADA';
    }
  }
}
