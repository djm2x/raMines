using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class ProjetEnr
    {
        public ProjetEnr()
        {
        }
        public int Id { get; set; }
        public string Libelle { get; set; }
        public int IdTypeProjet { get; set; }
        public int? IdProvince { get; set; }
        public int? IdCommune { get; set; }
        public int Capacite { get; set; }
        public decimal Investissement { get; set; }
        public int TypeAutorisation { get; set; }
        public int EtatProjet { get; set; }
        public DateTime Date { get; set; }
        public TypeProjet  TypeProjet{get;set;}
        public Province  Province{get;set;}
        public Commune  Commune {get;set;}
        
        


        
    }
}
