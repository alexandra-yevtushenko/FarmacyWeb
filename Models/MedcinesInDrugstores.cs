using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePharmacy.Models
{
    public class MedcinesInDrugstores
    {
        public MedcinesInDrugstores()
        {
            Orders = new List<Orders>();
        }
        public int id { get; set; }
        public int medcineId { get; set; }
        public int storeId { get; set; }

        public virtual Medcines Medcine { get; set; }
        public virtual Drugstores Store { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }

    }
}
