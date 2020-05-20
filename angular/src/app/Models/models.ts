export class User {
  id = 0;
  nom = '';
  prenom = '';
  email = '';
  password = '';
  adresse = '';
  tel = '';
  fix = '';
  username = '';
  actif = false;
  idOrganisme = 0;
  idProfil = 0;
  idType = 2;
  idRegion = null;
  idMetier = null;
  organisme = new Organisme();
  region = new Region();
  profil = new Profil();
}

export class Organisme {
  id = 0;
  label = '';
  adresse = '';
  tel = '';
  idRegion = 0;
  users: User[] = [];
}

export class Profil {
  id = 0;
  label = '';
}

export class Region {
  id = 0;
  libelle = '';
  provinces: Province[] = [];
}

export class Province {
  id = 0;
  libelle = '';
  idRegion = 0;
  region = new Region();
  projetEnrs: ProjetEnr[] = [];
  communes: Commune[] = [];
}

export class ElectrificationRural {
  id = 0;
  idProvince = 0;
  nbrLogement = 0;
  nbrVillage = 0;
  tauxElectrification = 0;
  annee = new Date().getFullYear();
  mois = new Date().getMonth()+1;
  province = new Province();
}


export class Commune {
  id = 0;
  libelle = '';
  idProvince = 0;
  province = new Province();
  projetEnrs: ProjetEnr[] = [];
}

export class TypeProjet {
  id = 0;
  libelle = '';
  projetEnrs: ProjetEnr[] = [];
}

export class ProjetEnr {
  id = 0;
  libelle = '';
  idTypeProjet = 0;
  idProvince = 0;
  idCommune = 0;
  capacite = 0;
  investissement = 0;
  typeAutorisation = 0;
  etatProjet = 0;
  date = new Date();
  typeProjet = new TypeProjet();
  province = new Province();
  commune = new Commune();
}
