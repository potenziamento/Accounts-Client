import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{

  transactions: any[] = [];
  error: string | null = null;
  fromDate: Date = new Date('2019-01-01');
  toDate: Date = new Date('2019-12-01');
  

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTransactions();
  }
  getTransactions(): void {
    let fromDateString: string = '';
    let toDateString: string = '';
  
    if (this.fromDate && this.toDate) {
      const fromISO = this.fromDate.toISOString();
      fromDateString = fromISO.split('T')[0];
      const toISO = this.toDate.toISOString();
      toDateString = toISO.split('T')[0];
  
      this.apiService.getTransactions(fromDateString, toDateString).subscribe(
        data => {
          this.transactions = data;
          this.error = null;
        },
        err => {
          this.error = 'Si è verificato un errore nel recupero delle transazioni.';
          console.error(err);
        }
      );
    } else {
      this.transactions = [];
      this.error = null;
    }
  }
}
