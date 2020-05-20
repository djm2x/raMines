using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class Organisme
    {
        public Organisme()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Label { get; set; }
        public string Adresse { get; set; }
        public string Tel { get; set; }
        public int IdRegion { get; set; }
        public Region Region { get; set; }

        // [System.Text.Json.Serialization.JsonIgnore]
        public virtual ICollection<User> Users { get; set; }
    }
}
