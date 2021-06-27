using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SalesReact.Models
{
    public class GoodTypeContext : DbContext
    {
        public GoodTypeContext(DbContextOptions<GoodTypeContext> options) : base(options)
        {

        }

        public DbSet<GoodType> GoodType { get; set; }
    }
}
