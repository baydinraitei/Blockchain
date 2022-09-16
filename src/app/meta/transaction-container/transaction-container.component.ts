import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Status, Transaction} from '../meta-sender/meta-sender.component';
import {Web3Service} from '../../util/web3.service';


@Component({
  selector: 'app-transaction-container',
  templateUrl: './transaction-container.component.html',
  styleUrls: ['./transaction-container.component.css']
})
export class TransactionContainerComponent implements OnInit {

  @Input()
  myTransation: Transaction;

  connectedUserWallet: string;

  @Output() cancelTransactionEvent = new EventEmitter<number>();
  @Output() confirmTransactionEvent = new EventEmitter<number>();


  StatusEnum = Status;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.connectedUserWallet = this.web3Service.accounts[0];
  }

  confirmTransaction(event) {
    this.confirmTransactionEvent.emit(event);
  }

  cancelTransaction(event) {
    this.cancelTransactionEvent.emit(event);
  }

}
