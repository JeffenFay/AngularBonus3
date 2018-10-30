var app = angular.module('myApp', [])
var valid = false;// variable de validation du formulaire
app.controller('myForm', function($scope) {
  $scope.subjectList = [];// Tableau des sujets
  $scope.users = [];//tableau des données utilisateurs
  var swapArray = [];//tableau d'échange pour copier les données
  //Initialisation des variables servant au modal
  $scope.nameDisplay = 'defaultName';
  $scope.mailDisplay = 'default@name.com';
  $scope.subjectDisplay = 'defaultText';
  $scope.textDisplay = 'defaultText';

  $scope.blurName = function(user){
    // variables stockant les regex
    var regexFirstlast =  /^[a-zA-ZÀ-Ÿ' -]+$/;
    user.name = user.name.toUpperCase();//mise en majuscule pour la regex et parceque les noms sont en majuscule
    if(!regexFirstlast.test(user.name)){//Condition appliquant le test de la regex à la valeur de this.
      //Erreur
      alert(user.name+' n\'est pas une chaîne de caractère valide !!!');
      valid = false;//Refus de validation
    } else {
      //Correct
      valid = true;//Validé
    }
  }
  $scope.blurMail = function(user){
    // variables stockant les regex
    var regexMail =  /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    user.mail = user.mail.toLowerCase();//mise en minuscule pour la regex et parceque aucun mail n'existe en majuscule
    if(!regexMail.test(user.mail)){//Condition appliquant le test de la regex à la valeur de this.
      //Erreur
      alert(user.mail+' n\'est pas une chaîne de caractère valide !!!');
      valid = false;//Refus de validation
    } else {
      //Correct
      valid = true;//Validé
    }
  }
  //mise à jour des listes
  $scope.update = function(user) {
    if (valid === false || user.subject == '' || user.text == ''){//teste les champs à remplir et exécute le code si tous les champs testés sont valides
      alert('Des champs restent vide, veuillez rentrer des informations !!!');
    }else{
      swapArray = angular.copy(user);
      $scope.users.push(swapArray);// rempli le tableau users pour les différents utilisateurs
      $scope.subjectList.push({subject: user.subject});// rempli le tableau subjectList pour les différents sujets
    }
  };
  // mise à jour des variables de données pour l'affichage
  $scope.displayData = function(subject){
    //boucle parcourant le tableau users pour comparer le sujet à celui existant dans users
    angular.forEach($scope.users, function(value, key) {
      if($scope.users[key].subject === subject){//Si la valeur du sujet est égale au sujet cliqué alors on met à jour les variables pour le modal
        $scope.nameDisplay = $scope.users[key].name;
        $scope.subjectDisplay = $scope.users[key].subject;
        $scope.mailDisplay = $scope.users[key].mail;
        $scope.textDisplay = $scope.users[key].text;
      }
    })
  };
});
