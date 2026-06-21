import { Component, Input } from '@angular/core';
import { VaccineDoseModule } from '../../../core/models/vaccine.model';

@Component({
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  styleUrls: ['./vaccine-card.component.scss']
})
export class VaccineCardComponent {

  @Input() dose!: VaccineDoseModule;

  get statusColor(): string {
    switch (this.dose.status) {
      case 'CONCLUIDA': return 'success';
      case 'ATRASADA': return 'danger';
      case 'AGENDADA': return 'warning';
      default: return 'medium';
    }
  }

  get statusLabel(): string {
    switch (this.dose.status) {
      case 'CONCLUIDA': return 'Concluida';
      case 'ATRASADA': return 'Atrasada';
      case 'AGENDADA': return 'Agendada';
      default: return this.dose.status;
    }
  }
}
