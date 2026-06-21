import { Campaign } from './campaign.model';

describe('Campaign Model', () => {

  it('deve criar uma instancia com os dados corretos', () => {
    const campaign = new Campaign({
      id: 'camp1',
      title: 'Campanha Teste',
      description: 'Descricao teste',
      targetAgeMinMonths: 12,
      targetAgeMaxMonths: 48,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31')
    });

    expect(campaign.title).toBe('Campanha Teste');
    expect(campaign.targetAgeMinMonths).toBe(12);
    expect(campaign.targetAgeMaxMonths).toBe(48);
  });

  it('deve retornar isActive true quando data atual esta dentro do periodo', () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 1);

    const campaign = new Campaign({
      title: 'Ativa',
      description: 'Campanha ativa',
      targetAgeMinMonths: 0,
      targetAgeMaxMonths: 60,
      startDate,
      endDate
    });

    expect(campaign.isActive).toBeTrue();
  });

  it('deve retornar isActive false quando campanha ja encerrou', () => {
    const campaign = new Campaign({
      title: 'Encerrada',
      description: 'Campanha encerrada',
      targetAgeMinMonths: 0,
      targetAgeMaxMonths: 60,
      startDate: new Date('2020-01-01'),
      endDate: new Date('2020-12-31')
    });

    expect(campaign.isActive).toBeFalse();
  });

  it('deve retornar isActive false quando campanha ainda nao comecou', () => {
    const campaign = new Campaign({
      title: 'Futura',
      description: 'Campanha futura',
      targetAgeMinMonths: 0,
      targetAgeMaxMonths: 60,
      startDate: new Date('2030-01-01'),
      endDate: new Date('2030-12-31')
    });

    expect(campaign.isActive).toBeFalse();
  });

  it('deve retornar true quando crianca esta na faixa etaria alvo', () => {
    const campaign = new Campaign({
      title: 'Teste',
      description: 'Teste',
      targetAgeMinMonths: 12,
      targetAgeMaxMonths: 48,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31')
    });

    expect(campaign.isTargetedForChild(24)).toBeTrue();
  });

  it('deve retornar false quando crianca esta fora da faixa etaria', () => {
    const campaign = new Campaign({
      title: 'Teste',
      description: 'Teste',
      targetAgeMinMonths: 12,
      targetAgeMaxMonths: 48,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31')
    });

    expect(campaign.isTargetedForChild(6)).toBeFalse();
    expect(campaign.isTargetedForChild(60)).toBeFalse();
  });
});
