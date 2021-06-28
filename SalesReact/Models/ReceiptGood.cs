using System;
using System.Collections.Generic;

#nullable disable

namespace SalesReact.Models
{
    public partial class ReceiptGood
    {
        public int ReceiptId { get; set; }
        public int GoodId { get; set; }
        public int? Quanity { get; set; }
        public int? Taxes { get; set; }

        public virtual Good Good { get; set; }
        public virtual Receipt Receipt { get; set; }
    }
}
