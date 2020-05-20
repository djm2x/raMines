using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class Province
    {
        public Province()
        {
            ElectrificationRurals = new HashSet<ElectrificationRural>();
            Communes = new HashSet<Commune>();
            ProjetEnrs = new HashSet<ProjetEnr>();
        }
        public int Id { get; set; }
        public string Libelle { get; set; }
        public int IdRegion { get; set; }
        public Region Region { get; set; }
        public virtual ICollection<ProjetEnr> ProjetEnrs { get; set; }
        public virtual ICollection<Commune> Communes { get; set; }
        public virtual ICollection<ElectrificationRural> ElectrificationRurals { get; set; }

    }
}
