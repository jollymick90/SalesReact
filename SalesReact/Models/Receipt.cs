using System;
using System.Collections.Generic;

#nullable disable

namespace SalesReact.Models
{
    public partial class Receipt
    {
        public Receipt()
        {
            ReceiptGoods = new HashSet<ReceiptGood>();
        }

        public int Id { get; set; }
        public int? Total { get; set; }
        public DateTime Date { get; set; }
        public int? TotalItems { get; set; }

        public virtual ICollection<ReceiptGood> ReceiptGoods { get; set; }
    }
}
