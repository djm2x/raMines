using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using seed;

namespace Webapp.Models
{
    public partial class AdminContext : DbContext
    {
        public AdminContext()
        {
            // dotnet tool install -g dotnet-aspnet-codegenerator
            // dotnet tool update -g dotnet-aspnet-codegenerator
            // dotnet aspnet-codegenerator --project . controller -name HelloController -m Author -dc WebAPIDataContext
            // dotnet tool install --global dotnet-ef --version 3.0.0
            // scafolding to db
            // dotnet ef migrations add secondMG
            // dotnet ef database update
            // dotnet ef migrations remove
            // dotnet ef database update LastGoodMigration
            // dotnet ef migrations script
        }

        public AdminContext(DbContextOptions<AdminContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<Profil> Profils { get; set; }
        public virtual DbSet<Region> Regions { get; set; }
        public virtual DbSet<SousCategorie> SousCategories { get; set; }
        public virtual DbSet<Categorie> Categories { get; set; }
        public virtual DbSet<Renforcement> Renforcements { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Organisme> Organismes { get; set; }
        public virtual DbSet<ProjetEnr> ProjetEnrs { get; set; }
        public virtual DbSet<TypeProjet> TypeProjets { get; set; }
        public virtual DbSet<Commune> Communes { get; set; }
        public virtual DbSet<ElectrificationRural> ElectrificationRurals { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Region>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Libelle);
                entity.HasMany(d => d.Provinces).WithOne(p => p.Region).HasForeignKey(d => d.IdRegion);

            });

            modelBuilder.Entity<Commune>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Libelle);
                entity.Property(e => e.IdProvince);
                entity.HasOne(d => d.Province).WithMany(p => p.Communes).HasForeignKey(d => d.IdProvince);

            });

            modelBuilder.Entity<TypeProjet>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Libelle);
                
            });

            modelBuilder.Entity<ProjetEnr>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Libelle);
                entity.Property(e => e.IdTypeProjet);
                entity.Property(e => e.IdProvince);
                entity.Property(e => e.IdCommune);
                entity.Property(e => e.Capacite);
                entity.Property(e => e.Investissement);
                entity.Property(e => e.TypeAutorisation);
                entity.Property(e => e.EtatProjet);
                entity.Property(e => e.Date);

                entity.HasOne(d => d.Commune).WithMany(p => p.ProjetEnrs).HasForeignKey(d => d.IdCommune);
                entity.HasOne(d => d.Province).WithMany(p => p.ProjetEnrs).HasForeignKey(d => d.IdProvince)
                .OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(d => d.TypeProjet).WithMany(p => p.ProjetEnrs).HasForeignKey(d => d.IdTypeProjet);
                
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Libelle);
                entity.Property(e => e.IdRegion);

            });

             modelBuilder.Entity<Categorie>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Libelle);
            });

             modelBuilder.Entity<SousCategorie>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Libelle);
                entity.HasOne(d => d.Categorie).WithMany(p => p.SousCategories).HasForeignKey(d => d.IdCategorie);
                entity.HasMany(d => d.Renforcements).WithOne(p => p.SousCategorie).HasForeignKey(d => d.IdSousCategorie);
            });

            modelBuilder.Entity<Renforcement>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Libelle);
                entity.Property(e => e.Langueur);
                entity.Property(e => e.IdSousCategorie);
                
            });


            modelBuilder.Entity<ElectrificationRural>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.IdProvince);
                entity.Property(e => e.NbrLogement);
                entity.Property(e => e.NbrVillage);
                entity.Property(e => e.TauxElectrification);
                entity.Property(e => e.Annee);
                entity.Property(e => e.Mois);
                entity.HasOne(d => d.Province).WithMany(p => p.ElectrificationRurals).HasForeignKey(d => d.IdProvince);
                
            });

            

            modelBuilder.Entity<Profil>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Label);
            });

           modelBuilder.Entity<Organisme>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Adresse);
                entity.Property(e => e.Label);
                entity.Property(e => e.Tel);
                entity.Property(e => e.IdRegion);
                entity.HasOne(d => d.Region).WithMany(p => p.Organismes).HasForeignKey(d => d.IdRegion);
                
            });



            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Actif);
                entity.Property(e => e.Adresse).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Fix).IsRequired();
                entity.Property(e => e.Nom).IsRequired();
                entity.Property(e => e.IdOrganisme);
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.Prenom).IsRequired();
                entity.Property(e => e.IdProfil).IsRequired();
                entity.Property(e => e.Tel).IsRequired();
                entity.Property(e => e.Username).IsRequired();
                entity.Property(e => e.IdType).IsRequired();
                entity.Property(e => e.IdRegion);
                entity.Property(e => e.IdMetier);
                entity.HasOne(d => d.Organisme).WithMany(p => p.Users).HasForeignKey(d => d.IdOrganisme);
                entity.HasOne(d => d.Profil).WithMany(p => p.User).HasForeignKey(d => d.IdProfil);
                entity.HasOne(d => d.Region).WithMany(p => p.Users).HasForeignKey(d => d.IdRegion);
                
            });

            OnModelCreatingPartial(modelBuilder);

            modelBuilder
                .Profils()
                .Users()
                .Categories()
                .Regions()
                .Provinces()
                .Communes()
                .TypeProjets()
                .ProjetEnrs()
                .Organismes()
                .ElectrificationRurals()
            ;



        }


        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
