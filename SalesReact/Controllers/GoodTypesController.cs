using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesReact.Models;

namespace SalesReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodTypesController : ControllerBase
    {
        private readonly GoodTypeContext _context;

        public GoodTypesController(GoodTypeContext context)
        {
            _context = context;
        }

        // GET: api/Goods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GoodType>>> GetGoodType()
        {
            Console.WriteLine("hello");
            return await _context.GoodType.ToListAsync();
        }

        // GET: api/Goods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GoodType>> GetGoodType(int id)
        {
            var goodType = await _context.GoodType.FindAsync(id);

            if (goodType == null)
            {
                return NotFound();
            }

            return goodType;
        }

        // PUT: api/Goods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGoodType(int id, GoodType goodType)
        {
            if (id != goodType.id)
            {
                return BadRequest();
            }

            _context.Entry(goodType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoodTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Goods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Good>> PostGoodType(GoodType goodType)
        {
            _context.GoodType.Add(goodType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGoodType", new { id = goodType.id }, goodType);
        }

        // DELETE: api/Goods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoodType(int id)
        {
            var goodType = await _context.GoodType.FindAsync(id);
            if (goodType == null)
            {
                return NotFound();
            }

            _context.GoodType.Remove(goodType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GoodTypeExists(int id)
        {
            return _context.GoodType.Any(e => e.id == id);
        }
    }
}
