# Blockchain

Blockchain

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
Toujours vérifier le code source si on voit que c’est pas commenté que les fonctions ne veulent rien dire fuir c’est un truc d’arnaque on peux verifier si c’est un bon truc avec le Hash (identifiant)
Uniswap protocol c’est un contrat ou ils ont cree un marché pour vendre acheter des crypto 
Le gaz c’est une estimation de ce qui va couter au déploiement et a la transaction (c le cout du calcul de la machine)
Si se gaz est épuisé la transaction ne peut pas passer (c comme le principe d’un carburant)
Le prix est définis par le proprietaire du metamask (cad qu’on peut le choisir,le modifier etc)

https://github.com/OpenZeppelin => collectif de developpeur qui créer des contrats 
erc20 => créer un jeton de ce type reviens a créer un smart contract de solidity 

code : 
context = contrat
is = heritage 

projet à rendre :
deployer un smart contract qui cree un token de type ERC20 :
apres deploiement amusez vous à vous envoyer une certaine quantité de jeton via metamask
decriver comment on peut gérer les nombres a virgules flottantes avec solidity 
pourquoi parle-t-on de nombre de decimales au sein du contrat ERC20.sol ?
comment se comporte les blockchains avec le stockage massif de fichiers ?


https://www.arweave.org/
https://ipfs.tech/
cours solidity 

# msg.sender
En Solidity, il existe des variables globales accessibles à toutes les fonctions.
L'une d'elles est msg.sender, qui faire référence à l’adresse de la personne (ou du smart contract) qui a appelée la fonction actuelle.

Voici un exemple d'utilisation de msg.sender pour mettre à jour un mapping : 
mapping (address => uint) favoriteNumber;

function setMyNumber(uint _myNumber) public {
  // Mettre à jour notre mappage `favoriteNumber` pour stocker `_myNumber` sous `msg.sender`
  favoriteNumber[msg.sender] = _myNumber;
  // ^ La syntaxe pour stocker des données dans un mappage est la même qu'avec les tableaux
}

function whatIsMyNumber() public view returns (uint) {
  // On récupère la valeur stockée à l'adresse de l'expéditeur
  // Qui sera `0` si l'expéditeur n'a pas encore appelé `setMyNumber`
  return favoriteNumber[msg.sender];
}

Utiliser msg.sender apporte de la sécurité à la blockchain Ethereum - la seule manière pour quelqu'un de modifier les données d'un autre serait de lui voler sa clé privée associée à son adresse Ethereum.


# Require
require est pratique pour vérifier que certaines conditions soient vraies avant d'exécuter une fonction.

function sayHiToVitalik(string _name) public returns (string) {
  // Regarde si _name est égal à "Vitalik". Renvoie une erreur et quitte si ce n'est pas le cas.
  // (Remarque : Solidity n'a pas de comparateur de `string` nativement,
  // nous comparons donc leurs hachages keccak256 pour voir si les `string` sont égaux)
  require(keccak256(_name) == keccak256("Vitalik"));
  // Si c'est vrai, on continue avec la fonction :
  return "Hi!" ;                                                                        
}
Si vous appelez la fonction avec sayHiToVitalik("Vitalik"), elle va renvoyer "Hi!". Si vous l'appelez avec un autre argument, elle va renvoyer une erreur et ne elle ne va pas s’exécuter.



Outils :  https://remix-project.org/ => ide en ligne
https://trufflesuite.com/ => ide local 
https://cryptozombies.io/en/lesson/1/chapter/4 => tutorial 
uniswap => token uni, place de marché qui permet d’acheter et revendre des crypto 
code source : github 
OpenZepellin => collectif de developpeur , erc20 
NFT = erc761 
https://www.arweave.org/ => storage permently


Devices : nano s plus => clé de stockage des clés privé pour les cryptos

Read contract permet de consulter le retrieve et consulter l’objet de contrat 
Write contract permet d’utiliser le contrat monnayant frais de gas 
ABI => Application binary interface 

Les décimales sont uttilisé par ERC20 qui sont la multiplication par des puissance de 10 : elle sont uttilisé pour eviter d'avoir des type Float 
OVERRIRDE permet la surchage et dans ce cas nous pouvons changer la valeur du gas qui exprimer en wei 
Gas : Il s'agit du carburant uttilisé pour les transaction il est exprimé  en giga wei


