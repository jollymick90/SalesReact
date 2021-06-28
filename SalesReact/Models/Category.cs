using System;
using System.Collections.Generic;

#nullable disable

namespace SalesReact.Models
{
    public partial class Category
    {
        public Category()
        {
            Goods = new HashSet<Good>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? TaxId { get; set; }

        public virtual Tax Tax { get; set; }
        public virtual ICollection<Good> Goods { get; set; }
    }
}
