using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Webapp.Models
{
    public partial class SousCategorie
    {
        public SousCategorie()
        {
            Renforcements = new HashSet<Renforcement>();
        }

        public int Id { get; set; }
        public string Libelle { get; set; }
        public int IdCategorie { get; set; }
        public Categorie Categorie { get; set; }
        
        // [JsonIgnore]
        public virtual ICollection<Renforcement> Renforcements { get; set; }
    }
}
