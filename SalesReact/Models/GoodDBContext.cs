using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SalesReact.Models
{
    public class GoodDBContext : DbContext
    {
        public GoodDBContext(DbContextOptions<GoodDBContext> options) : base(options)
        {

        }

        public DbSet<Good> Good { get; set; }
    }
}
