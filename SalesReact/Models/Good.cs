using System;
using System.Collections.Generic;

#nullable disable

namespace SalesReact.Models
{
    public partial class Good
    {
        public int GoodId { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual ReceiptGood ReceiptGood { get; set; }
    }
}
