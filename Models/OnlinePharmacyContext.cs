using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlinePharmacy.Models;

namespace OnlinePharmacy.Models
{
    public class OnlinePharmacyContext: DbContext
    {
        public virtual DbSet<Medcines> Medcines { get; set; }
        public virtual DbSet<Drugstores> Drugstores { get; set; }
        public virtual DbSet<MedcinesInDrugstores> MedcinesInDrugstores { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }

        public OnlinePharmacyContext(DbContextOptions<OnlinePharmacyContext> options):base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<OnlinePharmacy.Models.Deliverymans> Deliverymans { get; set; }

    }
}
