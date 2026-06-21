import { Child } from './child.model';

describe('Child Model', () => {

  it('deve criar uma instancia com os dados corretos', () => {
    const child = new Child({
      id: 'c1',
      name: 'Miguel',
      birthDate: new Date('2025-06-15'),
      gender: 'M'
    });

    expect(child.name).toBe('Miguel');
    expect(child.gender).toBe('M');
    expect(child.photoUrl).toBe('assets/shapes/default-avatar.svg');
  });

  it('deve calcular ageInMonths corretamente para um bebe', () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const child = new Child({
      name: 'Bebe',
      birthDate: sixMonthsAgo,
      gender: 'F'
    });

    expect(child.ageInMonths).toBeGreaterThanOrEqual(5);
    expect(child.ageInMonths).toBeLessThanOrEqual(7);
  });

  it('deve retornar formattedAge em meses quando menor que 12 meses', () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const child = new Child({
      name: 'Bebe',
      birthDate: threeMonthsAgo,
      gender: 'M'
    });

    expect(child.formattedAge).toContain('meses');
    expect(child.formattedAge).not.toContain('ano');
  });

  it('deve retornar formattedAge em anos quando maior que 12 meses', () => {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    const child = new Child({
      name: 'Crianca',
      birthDate: twoYearsAgo,
      gender: 'F'
    });

    expect(child.formattedAge).toContain('ano(s)');
  });

  it('deve usar avatar padrao quando photoUrl nao e informada', () => {
    const child = new Child({
      name: 'Teste',
      birthDate: new Date(),
      gender: 'M'
    });

    expect(child.photoUrl).toBe('assets/shapes/default-avatar.svg');
  });

  it('deve usar photoUrl customizada quando informada', () => {
    const child = new Child({
      name: 'Teste',
      birthDate: new Date(),
      gender: 'F',
      photoUrl: 'custom/photo.png'
    });

    expect(child.photoUrl).toBe('custom/photo.png');
  });
});
