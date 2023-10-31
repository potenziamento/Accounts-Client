import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent {
  transferData = {
    creditorName: '',
    creditorAccountCode: '',
    description: '',
    currency: 'EUR',
    amount: '',
    executionDate: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  submitTransfer(): void {
    this.apiService.createMoneyTransfer(this.transferData).subscribe(
      response => {
        this.successMessage = 'Trasferimento completato con successo!';
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Si è verificato un errore durante il trasferimento.';
        this.successMessage = null;
        console.error(error);
      }
    );
  }
}
