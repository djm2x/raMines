using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class Renforcement
    {
        public Renforcement()
        {
        }
        public int Id { get; set; }
        public string Libelle { get; set; }
        public int Langueur { get; set; }
        public int IdSousCategorie { get; set; }
        public SousCategorie SousCategorie { get; set; }
        
    }
}
