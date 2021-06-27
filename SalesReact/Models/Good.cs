using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesReact.Models
{
    public class Good
    {

        public int id { get; set; }

        public string name { get; set; }

        public int price { get; set; }

        
        //[Column("good_type")]        
        public virtual GoodType goodType { get; set; }

    }
}
