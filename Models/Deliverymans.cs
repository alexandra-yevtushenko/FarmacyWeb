using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePharmacy.Models
{
    public class Deliverymans
    {
        public Deliverymans()
        {
            Orders = new List<Orders>();
        }
        public int id { get; set; }
        public string name { get; set; }
        public int age { get; set; }
        public string telephone { get; set; }
        public string transport { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
    }

}
