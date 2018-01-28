# Fullstack-fallout



**Déployé sur :** [fullstack-fallout.herokuapp.com/](https://fullstack-fallout.herokuapp.com/) 

Composant principal pour la loqique de jeu [src/component/Playground.js](https://github.com/Carburator11/fullstack-fallout/blob/rRefacto/src/component/Playground.js)

27/01 : les setState ont été ramené dans le composant principal (suppression des this = that)
28/01 : l"Animation Queue" permet de bien lancer les événements (performance améliorées)
Le problème est de les arrêter (!!) Il faut revoir++ les clearInterval..

* **Front-end :**  React, React-Router (sur base de [Create React App](https://github.com/facebookincubator/create-react-app))
* **Back-end :**  Node.js ([React simple boilerplate](https://github.com/andela-kadeniyi/react-simple-boilerplate/))

La version JS vanilla de ce projet est consultable sur : [carb11.eu](http://carb11.eu/fallout/).

Disclaimer: this is an educational (and fan) project. Fallout (1997) is under Copyright from Interplay Productions, USA. All product names, logos, and brands are property of their respective owners.
 