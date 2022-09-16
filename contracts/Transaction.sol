pragma solidity ^0.5.0;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Transaction {

  struct Vente {
    address acheteur;
    address vendeur;
    VenteStatut status;
  }

  enum VenteStatut {
    Ok,
    Cancelled,
    Transit
  }

  uint256 venteSequence = 0;

  mapping(uint256 => address) public achatToOwner;
  mapping(uint256 => address) public venteToOwner;
  mapping(address => uint) public ownerAchatCount;
  mapping(address => uint) public ownerVenteCount;

  Vente[] public ventes;

  event addVente(address receiver, uint256 id);
  event confirm(uint256 id);
  event cancel(uint256 id);

  function send(address vendeur) public  {
    venteSequence++;
    ventes.push(Vente({
      acheteur: msg.sender,
      vendeur: vendeur,
      status: VenteStatut.Transit
    }));
    achatToOwner[venteSequence] = msg.sender;
    venteToOwner[venteSequence] = vendeur;
    ownerAchatCount[msg.sender]++;
    ownerVenteCount[vendeur]++;

    emit addVente(vendeur, venteSequence);
  }

  function getVenteByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](ownerAchatCount[_owner] + ownerVenteCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < ventes.length; i++) {
      if (achatToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }

      if (venteToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function confirmReception(uint transactionId) public {
    ventes[transactionId].status = VenteStatut.Ok;
    emit confirm(transactionId);
  }

  function cancelTransaction(uint transactionId) public {
    ventes[transactionId].status = VenteStatut.Cancelled;
    emit cancel(transactionId);
  }

}
