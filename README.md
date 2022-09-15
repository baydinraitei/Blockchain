# Blockchain

Se base sur le principe du réseau peer to peer (réseau d’information) => réseau décentralisé : git 
Cryptographie donnée d’entrée et de sortie 
Clé privée, clé publique 

Scientifiques qui ont publiés des papiers sur la blockchain :
	1991 : Stuart Haber ,Scott Stornetta 
1992 : Merkle Tree, Double Spend, dApps, Vitalik Buterin 

Tous les jetons sont identiques on ne peut pas les dissocier ils sont dans la blockchain on les utilise notamment pour faire des transactions.

# Chainage de block

Le hash d’un bloc c’est l’ID unique et le pointeur 
Un block contient des transactions 
C’est le principe des listes chainées 

Dans réseau décentralisé, un nœud doit contenir toutes les infos du réseau à un instant t. un nœud léger contient une partie de l’information totale.
Un mineur c’est qqn qui crée un bloc 
Un nœud c’est un serveur, ordinateur etc

Evm => machine virtuelle etherum disponible sur : https://etherum.org/
Deux types de cle :
Cle public =>  permet de consulter l’activité du compte
Cle privée => permet d'accéder au compte

Wallet => Regroupe les adresses logique pour accéder au tokens
Une transaction c’est un message qui s’envoie d’un compte à un compte 

# Deploiement 

Le deploiement s’effectue via metamask, le compte qui déployer par remix ide est dis propriétaire
Uniswap protocol c’est un contrat ou ils ont cree un marché pour vendre acheter des crypto 
Le gaz c’est une estimation de ce qui va couter au déploiement et a la transaction (c'est le cout du calcul de la machine)
Si se gaz est épuisé la transaction ne peut pas passer (c'est comme le principe d’un carburant)
Le prix est définit par le proprietaire du metamask (cad qu’on peut le choisir,le modifier etc)

https://github.com/OpenZeppelin => collectif de developpeur qui créer des contrats 
erc20 => créer un jeton de ce type reviens a créer un smart contract de solidity 

code : 
context = contrat
is = heritage 

https://www.arweave.org/
https://ipfs.tech/
cours solidity 

# msg.sender
En Solidity, il existe des variables globales accessibles à toutes les fonctions.
L'une d'elles est msg.sender, qui faire référence à l’adresse de la personne (ou du smart contract) qui a appelée la fonction actuelle.

Voici un exemple d'utilisation de msg.sender pour mettre à jour un mapping : 
mapping (address => uint) favoriteNumber;
```
function setMyNumber(uint _myNumber) public {
  // Mettre à jour notre mappage favoriteNumber pour stocker _myNumber sous msg.sender 
  favoriteNumber[msg.sender] = _myNumber;
  // La syntaxe pour stocker des données dans un mappage est la même qu'avec les tableaux
}

function whatIsMyNumber() public view returns (uint) {
 // On récupère la valeur stockée à l'adresse de l'expéditeur
 // Qui sera 0 si l'expéditeur n'a pas encore appelé setMyNumber
  return favoriteNumber[msg.sender];
}
```

Utiliser msg.sender apporte de la sécurité à la blockchain Ethereum - la seule manière pour quelqu'un de modifier les données d'un autre serait de lui voler sa clé privée associée à son adresse Ethereum.


# Require
require est pratique pour vérifier que certaines conditions soient vraies avant d'exécuter une fonction.

```
function sayHiToVitalik(string _name) public returns (string) {
  // Regarde si _name est égal à "Vitalik". Renvoie une erreur et quitte si ce n'est pas le cas.
  // (Remarque : Solidity n'a pas de comparateur de string nativement,
  // nous comparons donc leurs hachages keccak256 pour voir si les string sont égaux)
  require(keccak256(_name) == keccak256("Vitalik"));
  // Si c'est vrai, on continue avec la fonction :
  return "Hi!" ;                                                                        
}
```

Si vous appelez la fonction avec sayHiToVitalik("Vitalik"), elle va renvoyer "Hi!". Si vous l'appelez avec un autre argument, elle va renvoyer une erreur et ne elle ne va pas s’exécuter.

# Héritage

A la place de faire un contrat vraiment long, il vaut mieux parfois séparer la logique de votre code en plusieurs contrats pour mieux l'organiser.
Une des fonctionnalités de Solidity qui rend les contrats plus facile à gérer est l'héritage :
```
contract Doge {
  function catchphrase() public returns (string) {
    return "So Wow CryptoDoge";
  }
}
contract BabyDoge is Doge {
  function anotherCatchphrase() public returns (string) {
    return "Such Moon BabyDoge";
  }
}
```
BabyDoge hérite de Doge. Cela veut dire que si vous compilez et déployez BabyDoge, il aura accès à catchphrase() et à anotherCatchphrase() (et n'importe quelle fonction publique que nous définirions dans Doge).

Cela peut être utilisé pour les héritages logiques (comme avec les sous-classes, un Chat est un Animal). Mais cela peut aussi simplement être utilisé pour organiser votre code en groupant les logiques similaires en différentes classes. En gros on hérite une fonction en utilisant le « is » dans le nouveau contrat.

# Notes

Outils :  https://remix-project.org/ => ide en ligne
https://trufflesuite.com/ => ide local 
https://cryptozombies.io/en/lesson/1/chapter/4 => tutorial 
uniswap => token uni, place de marché qui permet d’acheter et revendre des crypto 
code source : github 
OpenZepellin => collectif de developpeur , erc20 
NFT = erc761 
https://www.arweave.org/ => storage permently

Toujours vérifier le code source si on voit que ce nest pas commenté et que les fonctions ne veulent rien dire cela signifie que ce n'est pas un compte fiable c’est On peut le verifier avec le Hash (identifiant).

Devices : nano s plus => clé de stockage des clés privé pour les cryptos
Read contract permet de consulter le retrieve et consulter l’objet de contrat 
Write contract permet d’utiliser le contrat monnayant frais de gas 
ABI => Application binary interface 


OVERRIRDE permet la surchage et dans ce cas nous pouvons changer la valeur du gas qui exprimer en wei 
Gas : Il s'agit du carburant uttilisé pour les transaction il est exprimé  en giga wei

# Projet :
deployer un smart contract qui cree un token de type ERC20 : après déploiement amusez-vous à vous envoyer une certaine quantité de jeton via metamask

1. Décrivez comment on peut gérer les nombres à virgules flottantes avec Solidity ?

La principale différence entre les nombres à virgule flottante (float``et ``double dans de nombreux langages, plus précisément les nombres IEEE 754) et les nombres à virgule fixe est que le nombre de bits utilisés pour l’entier et la partie fractionnaire (la partie après le point décimal) est flexible dans le premier, alors qu’il est strictement défini dans le second. Généralement, en virgule flottante, presque tout l’espace est utilisé pour représenter le nombre, alors que seul un petit nombre de bits définit où se trouve le point décimal.

2. Pourquoi parle-t-on de nombre de décimale au sein du contrat ERC20.sol ?

Les balances de tokens sont gérés sans décimales par les contrats ERC20 – pour une personne possédant 1 token à 18 décimales.En général, c’est 18 décimales qui est choisi pour un token ERC20. 
Les décimales sont uttilisé par ERC20 qui sont la multiplication par des puissance de 10 : elles sont utilisées pour éviter d'avoir des types Float. 

3. Comment se comporte les blockchains avec le stockage massif de fichier ?

Dans le stockage blockchain, les fichiers sont d’abord séparés dans un processus appelé sharding. Chaque tesson est copié pour éviter toute perte de données en cas d’erreur de transmission. Les fichiers sont également cryptés à l’aide d’une clé privée qui rend impossible leur consultation par d’autres nœuds du réseau. Les shards répliqués sont distribués entre les nœuds décentralisés du monde entier. Les interactions sont enregistrées dans le grand livre de la blockchain, ce qui permet au système de confirmer et de synchroniser les transactions entre les nœuds de la blockchain. Le stockage blockchain est conçu pour sauvegarder ces interactions pour toujours et les données ne peuvent jamais être modifiées.

4-Quelle est l'impact de la modification des frais de gas lors d'une transaction ?

La diminution des frais de gas en dessous d'un certain taux minimal fait echouer la transaction , dans le cas d'une augmentation la priorité de la transaction est augmenté et donc les frais versé au mineux egalement la différence entre le prix total et le prix payé est remboursé à l'emetteur
