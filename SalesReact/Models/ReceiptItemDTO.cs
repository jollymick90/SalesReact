using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesReact.Models
{
    public class ReceiptItemDTO
    {
        public int GoodId { get; set; }

        public string GoodName { get; set; }        

        public int Quantity { get; set; }

        public int? TaxItem { get; set; }

        public int? PriceItem { set; get; }

        public int TotalPrice { set; get; }

        public int TotalTax { get; set; }

    }
}
