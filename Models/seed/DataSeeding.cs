using System;
using System.Collections.Generic;
using System.Linq;
using Webapp.Models;
using Bogus;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

// dotnet ef dbcontext scaffold 
// "data source=DESKTOP-3550K4L\HARMONY;database=rfid;user id=sa; password=123" 
// Microsoft.EntityFrameworkCore.SqlServer 
// -o Model 
// -c "RfidContext"

// dotnet add package Bogus
namespace seed
{
    public static class DataSeeding
    {
        public static int i = 100;
        public static string lang = "fr";
        public static ModelBuilder Profils(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Profil>().HasData(new Profil[]{
                new Profil {Id = 1, Label = "Administrateur"},
                new Profil {Id = 3, Label = "Point focal"},
                new Profil {Id = 2, Label = "Centrale"},
                new Profil {Id = 4, Label = "Metier"},

            });

            return modelBuilder;
        }


        public static ModelBuilder Categories(this ModelBuilder modelBuilder)
        {
            int id = 1;

            var faker = new Faker<Categorie>(DataSeeding.lang)
                .CustomInstantiator(f => new Categorie { Id = id++ })
                .RuleFor(o => o.Libelle, f => f.Name.FirstName())
                ;
            modelBuilder.Entity<Categorie>().HasData(faker.Generate(10));

            return modelBuilder;
        }
        static List<string> listRegions = null;
        public static ModelBuilder Regions(this ModelBuilder modelBuilder)
        {
            int id = 1;
            DataSeeding.listRegions = new List<string>() {
                "Rabat, Salé, Kénitra",
                "Casablanca, Settat",
                "Fès, Meknès",
                "Marrakech, Safi" ,
                "Tanger, Tétouan, Al Hoceïma" ,
                "Oriental" ,
                "Béni Mellal, Khénifra" ,
                "Drâa, Tafilalet" ,
                "Souss, Massa" ,
                "Guelmim, Oued Noun" ,
                "Laâyoune, Sakia El Hamra" ,
                "Dakhla, Oued Ed Dahab" ,
                };

            var faker = new Faker<Region>(DataSeeding.lang)
                .CustomInstantiator(f => new Region { Id = id++ })
                .RuleFor(o => o.Libelle, f => listRegions[id - 2])
                ;
            modelBuilder.Entity<Region>().HasData(faker.Generate(12));

            return modelBuilder;
        }

        public static ModelBuilder Provinces(this ModelBuilder modelBuilder)
        {
            var provinces = new List<Province>();
            int i = 1;
            int id = 1;
            provinces.Add(new Province { Id = id++, IdRegion = i, Libelle = "Skhirate-Témara" });

            DataSeeding.listRegions.ForEach((e) =>
            {
                // var index = e.IndexOf(",");
                string[] collection = e.Split(",");

                foreach (var item in collection)
                {
                    provinces.Add(new Province { Id = id++, IdRegion = i, Libelle = item });
                }
                i++;
            });

            modelBuilder.Entity<Province>().HasData(provinces);

            return modelBuilder;
        }

        public static ModelBuilder Communes(this ModelBuilder modelBuilder)
        {
            var communes = new List<Commune>();
            int i = 1;
            int id = 1;
            var list = new[] {
                "Témara",
                "Skhirate",
                "Aïn El Aouda",
                "Aïn Attig",
                "Sidi Yahya Zaër",
                "Mers El Kheïr",
                "Sabbah",
                "Oumazza",
                "El Menzeh",
            };

            foreach (var e in list)
            {
                communes.Add(new Commune { Id = id++, Libelle = e, IdProvince = i, });
            }

            var faker = new Faker<Commune>(DataSeeding.lang)
                .CustomInstantiator(f => new Commune { Id = id++ })
                .RuleFor(o => o.Libelle, f => $"Commune {id}")
                .RuleFor(o => o.IdProvince, f => f.Random.Number(2, 25))
                ;

            communes.AddRange(faker.Generate(15)); //24

            modelBuilder.Entity<Commune>().HasData(communes);

            return modelBuilder;
        }

        public static ModelBuilder TypeProjets(this ModelBuilder modelBuilder)
        {
            int id = 1;
            var list = new[] {
                "Solaire",
                "Eolien",
                "Hydroélectrique",
                "Biomasse",
            };

            var faker = new Faker<TypeProjet>(DataSeeding.lang)
                .CustomInstantiator(f => new TypeProjet { Id = id++ })
                .RuleFor(o => o.Libelle, f => list[id - 2])
                ;

            modelBuilder.Entity<TypeProjet>().HasData(faker.Generate(4));

            return modelBuilder;
        }

        public static ModelBuilder ProjetEnrs(this ModelBuilder modelBuilder)
        {
            int id = 1;
            bool isProvince = false;
            var faker = new Faker<ProjetEnr>(DataSeeding.lang)
                .CustomInstantiator(f => new ProjetEnr { Id = id++ })
                .RuleFor(o => o.Libelle, f => f.Lorem.Sentence())
                .RuleFor(o => o.IdTypeProjet, f => f.Random.Number(1, 4))
                .RuleFor(o => o.IdProvince, f =>
                {
                    isProvince = !isProvince;
                    return isProvince ? f.Random.Number(1, 25) as object : null as object;
                })
                .RuleFor(o => o.IdCommune, f =>
                {
                    // isProvince = !isProvince;
                    return !isProvince ? f.Random.Number(1, 24) as object : null as object;
                })
                .RuleFor(o => o.Capacite, f => f.Random.Number(10, 1000))
                .RuleFor(o => o.Investissement, f => f.Random.Number(1000, 100000))
                .RuleFor(o => o.TypeAutorisation, f => f.Random.Number(1, 3))
                .RuleFor(o => o.EtatProjet, f => f.Random.Number(1, 2))
                .RuleFor(o => o.Date, f => f.Date.Past())
                ;

            modelBuilder.Entity<ProjetEnr>().HasData(faker.Generate(100));

            return modelBuilder;
        }

        public static ModelBuilder ElectrificationRurals(this ModelBuilder modelBuilder)
        {
            int id = 1;
            var faker = new Faker<ElectrificationRural>(DataSeeding.lang)
                .CustomInstantiator(f => new ElectrificationRural { Id = id++ })
                .RuleFor(o => o.IdProvince, f => f.Random.Number(1, 25))
                .RuleFor(o => o.NbrLogement, f => f.Random.Number(1, 100))
                .RuleFor(o => o.NbrVillage, f => f.Random.Number(1, 100))
                .RuleFor(o => o.TauxElectrification, f => f.Random.Decimal(1, 100))
                .RuleFor(o => o.Annee, f => f.Random.Number(2020, 2040))
                .RuleFor(o => o.Mois, f => f.Random.Number(1, 12))
                ;

            modelBuilder.Entity<ElectrificationRural>().HasData(faker.Generate(100));

            return modelBuilder;
        }


        public static ModelBuilder Organismes(this ModelBuilder modelBuilder)
        {
            var organismes = new List<Organisme>();
            int i = 1;
            int id = 1;
            DataSeeding.listRegions.ForEach((e) =>
            {
                int index = e.IndexOf(",");
                // Console.WriteLine("-----------------------------------------------------------------");
                // Console.WriteLine(JsonConvert.SerializeObject(index));
                // Console.WriteLine("---------------------------------------------------------------- - ");
                var s = index != -1 ? e.Substring(0, index) : e;
                organismes.AddRange(new Organisme[]{
                    new Organisme {Id = id++, IdRegion = i, Label = $"direction régionale {s}"},
                    // new Organisme {Id = id++, IdRegion = i, Label = $"direction observatoire {s}"},
                    // new Organisme {Id = id++, IdRegion = i, Label = $"direction provinciale {s}"}
                });
                i++;
            });

            modelBuilder.Entity<Organisme>().HasData(organismes);

            return modelBuilder;
        }
        public static ModelBuilder Users(this ModelBuilder modelBuilder)
        {
            int id = 1;
            // var list = new[] {1, 2, 3, 4, null};

            var faker = new Faker<User>(DataSeeding.lang)
                .CustomInstantiator(f => new User { Id = id++ })
                .RuleFor(o => o.Nom, f => f.Name.FirstName())
                .RuleFor(o => o.Prenom, f => f.Name.LastName())
                .RuleFor(o => o.Email, (f, u) => f.Internet.Email($"{u.Nom}{f.UniqueIndex}", u.Prenom))
                .RuleFor(o => o.Password, f => f.Internet.Password(6))
                .RuleFor(o => o.Adresse, f => f.Address.FullAddress())
                .RuleFor(o => o.Tel, f => f.Phone.PhoneNumber("(+212)6 ## ##-##-##"))
                .RuleFor(o => o.Fix, f => f.Phone.PhoneNumber("(+212)5 ## ##-##-##"))
                .RuleFor(o => o.Username, (f, u) => f.Internet.UserName(u.Nom, u.Prenom))
                .RuleFor(o => o.Actif, (f, u) => f.Random.Bool())
                .RuleFor(o => o.IdMetier, (f, u) => f.Random.Number(1, 4))
                .RuleFor(o => o.IdOrganisme, f => f.Random.Number(1, 6))
                .RuleFor(o => o.IdProfil, f => f.Random.Number(2, 4));
            // f.Company.CompanyName()

            // var users = faker.Generate(DataSeeding.i);
            var users = new List<User>();
            users.Add(new User
            {
                Id = id++,
                Nom = "mourabit",
                Prenom = "mohamed",
                Email = "mourabit@angular.io",
                Adresse = "Temara",
                Tel = "06 ## ## ## ##",
                Fix = "05 ## ## ## ##",
                Username = "mourabit",
                Password = "123",
                Actif = true,
                IdOrganisme = 1,
                IdType = 2,
                IdRegion = 1,
                IdProfil = 1,
            });
            users.Add(new User
            {
                Id = id++,
                Nom = "mehdi",
                Prenom = "mehdi",
                Email = "mehdi@angular.io",
                Adresse = "Temara",
                Tel = "06 ## ## ## ##",
                Fix = "05 ## ## ## ##",
                Username = "mehdi",
                Password = "123",
                Actif = true,
                IdOrganisme = 2,
                IdType = 2,
                IdRegion = 1,
                IdProfil = 2
            });

            users.Add(new User
            {
                Id = id++,
                Nom = "ahmed",
                Prenom = "ahmed",
                Email = "ahmed@angular.io",
                Adresse = "Temara",
                Tel = "06 ## ## ## ##",
                Fix = "05 ## ## ## ##",
                Username = "ahmed",
                Password = "123",
                Actif = true,
                IdOrganisme = 4,
                IdType = 2,
                IdRegion = 1,
                IdProfil = 4,
                IdMetier=1,
            });
            users.Add(new User
            {
                Id = id++,
                Nom = "soufiane",
                Prenom = "soufiane",
                Email = "soufiane@angular.io",
                Adresse = "Temara",
                Tel = "06 ## ## ## ##",
                Fix = "05 ## ## ## ##",
                Username = "soufiane",
                Password = "123",
                Actif = true,
                IdOrganisme = 4,
                IdType = 2,
                IdRegion = 1,
                IdProfil = 3
            });

            modelBuilder.Entity<User>().HasData(users);

            return modelBuilder;
        }


    }
}