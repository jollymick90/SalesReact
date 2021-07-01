using System;
using System.Collections.Generic;

#nullable disable

namespace SalesReact.Models
{
    public partial class ReceiptGood
    {
        public int ReceiptGoodId { get; set; }
        public int ReceiptId { get; set; }
        public int GoodId { get; set; }
        public string GoodName { get; set; }
        public int Quantity { get; set; }
        public int? TaxItem { get; set; }
        public int? PriceItem { get; set; }
        public int TotalPrice { get; set; }
        public int TotalTax { get; set; }

        public virtual Good Good { get; set; }
        public virtual Receipt Receipt { get; set; }
    }
}
