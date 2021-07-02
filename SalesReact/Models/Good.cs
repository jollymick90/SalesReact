using System;
using System.Collections.Generic;

#nullable disable

namespace SalesReact.Models
{
    public partial class Good
    {
        public Good()
        {
            ReceiptGoods = new HashSet<ReceiptGood>();
        }

        public int GoodId { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }
        public int? CategoryId { get; set; }
        public bool? Imported { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<ReceiptGood> ReceiptGoods { get; set; }
    }
}
