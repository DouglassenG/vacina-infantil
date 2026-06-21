import { VaccineDoseModule } from './vaccine.model';

describe('VaccineDoseModule Model', () => {

  it('deve criar uma instancia com os dados corretos', () => {
    const dose = new VaccineDoseModule({
      id: 'v1',
      vaccineName: 'BCG',
      doseType: 'Dose Unica',
      targetAgeMonths: 0,
      status: 'AGENDADA'
    });

    expect(dose.vaccineName).toBe('BCG');
    expect(dose.doseType).toBe('Dose Unica');
    expect(dose.targetAgeMonths).toBe(0);
  });

  it('deve definir status CONCLUIDA quando appliedDate existe', () => {
    const dose = new VaccineDoseModule({
      id: 'v1',
      vaccineName: 'BCG',
      doseType: 'Dose Unica',
      targetAgeMonths: 0,
      appliedDate: new Date('2025-06-15'),
      status: 'AGENDADA'
    });

    dose.evaluateStatus(12);
    expect(dose.status).toBe('CONCLUIDA');
  });

  it('deve definir status ATRASADA quando idade ultrapassa o recomendado sem aplicacao', () => {
    const dose = new VaccineDoseModule({
      id: 'v2',
      vaccineName: 'Hepatite A',
      doseType: 'Dose Unica',
      targetAgeMonths: 15,
      status: 'AGENDADA'
    });

    dose.evaluateStatus(20);
    expect(dose.status).toBe('ATRASADA');
  });

  it('deve definir status AGENDADA quando idade nao ultrapassa o recomendado', () => {
    const dose = new VaccineDoseModule({
      id: 'v3',
      vaccineName: 'Pentavalente',
      doseType: '1a Dose',
      targetAgeMonths: 2,
      status: 'ATRASADA'
    });

    dose.evaluateStatus(1);
    expect(dose.status).toBe('AGENDADA');
  });

  it('deve manter CONCLUIDA mesmo com idade maior que recomendado', () => {
    const dose = new VaccineDoseModule({
      id: 'v4',
      vaccineName: 'BCG',
      doseType: 'Dose Unica',
      targetAgeMonths: 0,
      appliedDate: new Date('2023-01-01'),
      status: 'AGENDADA'
    });

    dose.evaluateStatus(36);
    expect(dose.status).toBe('CONCLUIDA');
  });

  it('deve converter appliedDate para Date quando informada', () => {
    const dose = new VaccineDoseModule({
      id: 'v5',
      vaccineName: 'BCG',
      doseType: 'Dose Unica',
      targetAgeMonths: 0,
      appliedDate: new Date('2025-01-15'),
      status: 'CONCLUIDA'
    });

    expect(dose.appliedDate instanceof Date).toBeTrue();
  });

  it('deve deixar appliedDate undefined quando nao informada', () => {
    const dose = new VaccineDoseModule({
      id: 'v6',
      vaccineName: 'Rotavirus',
      doseType: '1a Dose',
      targetAgeMonths: 2,
      status: 'AGENDADA'
    });

    expect(dose.appliedDate).toBeUndefined();
  });
});
