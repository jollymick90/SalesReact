using System;
using System.Collections.Generic;

#nullable disable

namespace SalesReact.Models
{
    public partial class Tax
    {
        public Tax()
        {
            Categories = new HashSet<Category>();
        }

        public int TaxId { get; set; }
        public int Value { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
    }
}
