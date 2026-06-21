export interface IChild {
  id?: string;
  name: string;
  birthDate: Date;
  gender: 'M' | 'F';
  photoUrl?: string;
}

export class Child implements IChild {
  id?: string;
  name: string;
  birthDate: Date;
  gender: 'M' | 'F';
  photoUrl?: string;

  constructor(data: IChild) {
    this.id = data.id;
    this.name = data.name;
    this.birthDate = new Date(data.birthDate);
    this.gender = data.gender;
    this.photoUrl = data.photoUrl || 'assets/shapes/default-avatar.svg';
  }

  get ageInMonths(): number {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - this.birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 30.4375);
  }

  get formattedAge(): string {
    const totalMonths = this.ageInMonths;
    if (totalMonths < 12) {
      return `${totalMonths} meses`;
    }
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    return remainingMonths > 0
      ? `${years} ano(s) e ${remainingMonths} mes(es)`
      : `${years} ano(s)`;
  }
}
