using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class TypeProjet
    {
        public TypeProjet()
        {
            ProjetEnrs = new HashSet<ProjetEnr>();
        }

        public int Id { get; set; }
        public string Libelle { get; set; }
        public virtual ICollection<ProjetEnr> ProjetEnrs { get; set; }

    }
}
