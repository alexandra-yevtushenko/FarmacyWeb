using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePharmacy.Models
{
    public class Drugstores
    {
        public Drugstores()
            {
                MedcinesInDrugstores = new List<MedcinesInDrugstores>();
            }

        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string tel { get; set; }


        public virtual ICollection<MedcinesInDrugstores> MedcinesInDrugstores { get; set; }
    }
}
