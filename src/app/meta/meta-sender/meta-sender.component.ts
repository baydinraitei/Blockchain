import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import {MatSnackBar} from '@angular/material';


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
  styleUrls: ['./meta-sender.component.scss']
})
export class MetaSenderComponent implements OnInit {
  accounts: string[];
  MetaCoin: any;

  myTransaction: Transaction[] = [];
  filteredTransaction: FilteredTransaction;

  address: string;

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
    // recupère données du contrat et actualise l'affichage
    await this.getContrat().then((result) => {
      this.attributeTransaction();
    });
  }

  // méthode de mise à jour du template
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

  // récupère l'adresse de l'utilisateur connecté
  async watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  // récupère les data de l'utilisateur connecté (ventes et achats)
  async getVenteByOwner() {
    const deployedTransaction = await this.MetaCoin.deployed();
    const account = this.accounts[0];
    const response = await deployedTransaction.getVenteByOwner(account);
    return response;
  }

  // récupère le déteils d'une transaction via l'id
  async getTransactionDetail(transacId) {
    const deployedTransaction = await this.MetaCoin.deployed();
    const value = await deployedTransaction.ventes(transacId);
    console.log(value);
    return value;
  }

  // assignes les datas depuis le smart contract et réalise le mapping en fonctions du statut
  async attributeTransaction() {
   const attributeConnected = await this.getVenteByOwner();
   this.myTransaction = [];
   for (const transacId of attributeConnected) {
     const transac = await this.getTransactionDetail(transacId.toNumber());

     this.myTransaction.push({
       id: transacId.toNumber(),
       acheteur: transac.acheteur,
       vendeur: transac.vendeur,
       status: transac.status.toNumber()
     });

     this.filteredTransaction = this.groupBy(this.myTransaction);
     console.log(this.filteredTransaction);

   }
  }

  // sépare les ventes et achats ainsi que les différents statut des transactions
  groupBy(xs: any[]) {
    return xs.reduce((result, current: Transaction) => {
      const currentStatus = current.status;
      const vendeurAdresse = current.vendeur;
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


  async addTransaction(walletAddress: string) {
    try {
      const deployedTransaction = await this.MetaCoin.deployed();
      deployedTransaction.send.sendTransaction(walletAddress, {from: this.model.account});
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
