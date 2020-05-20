using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class Commune
    {
        public Commune()
        {
            ProjetEnrs = new HashSet<ProjetEnr>();

        }
        public int Id { get; set; }
        public string Libelle { get; set; }
        public int IdProvince { get; set; }
        public Province Province { get; set; }
        public virtual ICollection<ProjetEnr> ProjetEnrs { get; set; }

    }
}
