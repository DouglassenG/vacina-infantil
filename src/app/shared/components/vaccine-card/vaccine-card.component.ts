import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VaccineDoseModule } from '../../../core/models/vaccine.model';

@Component({
  standalone: false,
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  styleUrls: ['./vaccine-card.component.scss']
})
export class VaccineCardComponent {

  @Input() dose!: VaccineDoseModule;
  @Output() markedAsApplied = new EventEmitter<string>();

  applying = false;

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

  get canMarkAsApplied(): boolean {
    return this.dose.status !== 'CONCLUIDA';
  }

  onMarkAsApplied(): void {
    this.applying = true;
    this.markedAsApplied.emit(this.dose.id);
  }
}
