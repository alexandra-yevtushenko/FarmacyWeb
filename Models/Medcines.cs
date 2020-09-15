using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePharmacy.Models
{
    public class Medcines
    {
        public Medcines()
        {
            MedcinesInDrugstores = new List<MedcinesInDrugstores>();
        }

        public int id { get; set; }
        public string name { get; set; }
        public string country { get; set; }
        public bool prescription { get; set; }
        public float price { get; set; }
        public string imgUrl { get; set; }

        public virtual ICollection<MedcinesInDrugstores> MedcinesInDrugstores { get; set; }
    }
}
