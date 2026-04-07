## Fonctionnement du système d’alertes

### 1. Vérification globale des alertes

- Dans **GameCreationEnvironnement**, on appelle la fonction qui vérifie les alertes.
- Cette fonction centralise l’analyse complète de l’état du jeu.

---

### 2. AlertOfGame

- Dans **AlertOfGame**, on vérifie toutes les alertes.
- On applique l’ensemble des contraintes et conditions définies.
- Cette couche contient la logique métier de validation.

---

### 3. Affichage des alertes

- Dans chaque page et composant concerné, on ajoute le composant `Alert`.
- Dans la navigation, on ajoute également une alerte permettant d’afficher un message global pour la page si nécessaire.

Cela permet :
- un affichage local (au niveau du champ ou du composant),
- un affichage global (au niveau de la page).

---

## Ajouter une nouvelle contrainte sur un champ

Si on souhaite ajouter une nouvelle règle de validation :

1. Ajouter la contrainte dans **AlertOfGame**.
2. Ajouter le composant `Alert` dans le container concerné.
3. Ajouter également l’alerte dans la navigation pour le signalement global de la page.

---

## Résumé

- La logique de validation est centralisée dans **AlertOfGame**.
- L’environnement déclenche la vérification.
- Les pages affichent les alertes locales.
- La navigation affiche les alertes globales.
- Toute nouvelle contrainte doit être déclarée à ces trois niveaux.