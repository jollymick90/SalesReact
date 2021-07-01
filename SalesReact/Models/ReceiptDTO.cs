using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesReact.Models
{
    public class ReceiptDTO
    {
        public ReceiptDTO()
        {
            ReceiptItems = new List<ReceiptItemDTO>();
        }


        public virtual ICollection<ReceiptItemDTO> ReceiptItems { get; set; }
    }
}
