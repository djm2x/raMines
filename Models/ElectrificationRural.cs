using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class ElectrificationRural
    {
        public ElectrificationRural()
        {
        }
        public int Id { get; set; }
        public int IdProvince { get; set; }
        public int NbrLogement { get; set; }
        public int NbrVillage { get; set; }
        public decimal TauxElectrification { get; set; }
        public int Mois { get; set; }
        public int Annee { get; set; }
        public Province Province { get; set; }
        
    }
}
