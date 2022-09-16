import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import {MatSnackBar} from '@angular/material';
import {id} from 'ethers/utils';
import {resolve} from '@angular-devkit/core';

declare let require: any;
const transaction_artifacts = require('../../../../build/contracts/Transaction.json');


export interface Transaction {
  id: number;
  acheteur: string;
  vendeur: string;
  status: any;
}

export interface FilteredTransaction {
  ok: Transaction[];
  cancel: Transaction[];
  transit: Transaction[];
  vente: Transaction[];
}

export enum Status {
  OK = 0,
  Canceled = 1,
  Transit= 2,
}

@Component({
  selector: 'app-meta-sender',
  templateUrl: './meta-sender.component.html',
  styleUrls: ['./meta-sender.component.css']
})
export class MetaSenderComponent implements OnInit {
  accounts: string[];
  MetaCoin: any;

  myTransaction: Transaction[] = [];
  filteredTransaction: FilteredTransaction;



  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  status = '';



  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  async ngOnInit() {
    // this.web3Service.artifactsToContract(transaction_artifacts)
    //   .then((MetaCoinAbstraction) => {
    //     this.watchAccount();
    //     console.log(MetaCoinAbstraction);
    //     this.MetaCoin = MetaCoinAbstraction;
    //     this.MetaCoin.deployed().then(deployed => {
    //       deployed.addVente({}, (err, ev) => {
    //         this.attributeTransaction();
    //       });
    //
    //       deployed.confirm({}, (err, ev) => {
    //         this.attributeTransaction();
    //       });
    //     });
    //   });

    await this.getContrat().then((result) => {
      this.attributeTransaction();
    });
  }

  async getContrat() {
    await this.web3Service.artifactsToContract(transaction_artifacts)
      .then((MetaCoinAbstraction) => {
        this.watchAccount();
        this.MetaCoin = MetaCoinAbstraction;
        this.MetaCoin.deployed().then(deployed => {
          deployed.addVente({}, (err, ev) => {
            this.attributeTransaction();
          });

          deployed.confirm({}, (err, ev) => {
            this.attributeTransaction();
          });

          deployed.cancel({}, (err, ev) => {
            this.attributeTransaction();
          });
        });
      });
  }

  async watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  async sendCoin() {
    if (!this.MetaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const transaction = await deployedMetaCoin.sendCoin.sendTransaction(receiver, amount, {from: this.model.account});

      if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
  }

  async getVenteByOwner() {
    const deployedTransaction = await this.MetaCoin.deployed();
    const account = this.accounts[0];
    const response = await deployedTransaction.getVenteByOwner(account);
    return response;
  }


  async getTransactionDetail(transacId) {
    const deployedTransaction = await this.MetaCoin.deployed();
    const value = await deployedTransaction.ventes(transacId);
    console.log(value);
    return value;
  }

  async attributeTransaction() {
   const attributeConnected = await this.getVenteByOwner();
   this.myTransaction = [];
   for (const transacId of attributeConnected) {
     console.log(transacId.toNumber());
     const transac = await this.getTransactionDetail(transacId.toNumber());

     this.myTransaction.push({
       id: transacId.toNumber(),
       acheteur: transac.acheteur,
       vendeur: transac.vendeur,
       status: transac.status.toNumber()
     });

     this.filteredTransaction = this.groupByProximity(this.myTransaction);
     console.log(this.filteredTransaction);

   }
  }

  groupByProximity(xs: any[]) {
    return xs.reduce((result, current: Transaction) => {
      const currentStatus = current.status;
      const vendeurAdresse = current.vendeur;
      console.log(currentStatus);
      console.log(Status.Transit);
      if (vendeurAdresse === this.accounts[0]) {
        (result['vente'] = result['vente'] || []).push(current);
      } else if (currentStatus === Status.OK) {
        (result['ok'] = result['ok'] || []).push(current);
      } else if (currentStatus === Status.Canceled) {
        (result['cancel'] = result['cancel'] || []).push(current);
      } else if (currentStatus === Status.Transit) {
        (result['transit'] = result['transit'] || []).push(current);
      }

      return result;
    }, {});
  }

  async addTransaction() {
    try {
      const deployedTransaction = await this.MetaCoin.deployed();
      deployedTransaction.send.sendTransaction('0x855e339599E60BF6346CA3A459582154B1C572dF', {from: this.model.account});
    } catch (e) {
      console.log(e);
    }
  }

  async confirmTransaction(idTransaction: number) {
    console.log(idTransaction);
    try {
      const deployedTransaction = await this.MetaCoin.deployed();
      deployedTransaction.confirmReception.sendTransaction(idTransaction, {from: this.model.account});
    } catch (e) {
      console.log(e);
    }
  }

  async cancelTransaction(idTransaction: number) {
    try {
      const deployedTransaction = await this.MetaCoin.deployed();
      deployedTransaction.cancelTransaction.sendTransaction(idTransaction, {from: this.model.account});
    } catch (e) {
      console.log(e);
    }
  }

}
