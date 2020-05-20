using System;
using System.Collections.Generic;

namespace Webapp.Models
{
    public partial class Region
    {
        public Region()
        {
            Provinces = new HashSet<Province>();
            Organismes = new HashSet<Organisme>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Libelle { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Organisme> Organismes { get; set; }
        public virtual ICollection<Province> Provinces { get; set; }
    }
}
