using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace SalesReact.Models
{
    public partial class Good
    {
        //private readonly SalesContext _dbContext;
        private Category _category;
        public Good()
        {
            ReceiptGoods = new HashSet<ReceiptGood>();
        }
        //private Good(ILazyLoader lazyLoader)
        //{
        //    LazyLoader = lazyLoader;
        //}

        //private ILazyLoader LazyLoader { get; set; }

        public int GoodId { get; set; }
        public string Name { get; set; }
        public int? Price { get; set; }
        public int? CategoryId { get; set; }
        public bool? Imported { get; set; }

        public virtual Category Category { get; set; }
        //public virtual Category Category {
        //    get => LazyLoader.Load(this, ref _category);
        //    set => _category = value; 
        //}
        public virtual ICollection<ReceiptGood> ReceiptGoods { get; set; }
    }
}
