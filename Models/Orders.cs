using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePharmacy.Models
{
    public class Orders
    {
        public Orders()
        {

        }

        public int id { get; set; }
        public int MedcinesInDrugstoresId { get; set; }
        public int amount { get; set; }
        public string name { get; set; }
        public string tel { get; set; }
        public string email { get; set; }
        public int DeliverymansId { get; set; }
        public DateTime date { get; set; }

        public virtual MedcinesInDrugstores MedcinesInDrugstores { get; set; }
        public virtual Deliverymans Deliverymans { get; set; }


    }
}
