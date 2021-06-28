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
    public class ReceiptGoodsController : ControllerBase
    {
        private readonly SalesContext _context;

        public ReceiptGoodsController(SalesContext context)
        {
            _context = context;
        }

        // GET: api/ReceiptGoods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceiptGood>>> GetReceiptGoods()
        {
            return await _context.ReceiptGoods.ToListAsync();
        }

        // GET: api/ReceiptGoods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceiptGood>> GetReceiptGood(int id)
        {
            var receiptGood = await _context.ReceiptGoods.FindAsync(id);

            if (receiptGood == null)
            {
                return NotFound();
            }

            return receiptGood;
        }

        // PUT: api/ReceiptGoods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceiptGood(int id, ReceiptGood receiptGood)
        {
            if (id != receiptGood.GoodId)
            {
                return BadRequest();
            }

            _context.Entry(receiptGood).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceiptGoodExists(id))
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

        // POST: api/ReceiptGoods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReceiptGood>> PostReceiptGood(ReceiptGood receiptGood)
        {
            _context.ReceiptGoods.Add(receiptGood);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReceiptGoodExists(receiptGood.GoodId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetReceiptGood", new { id = receiptGood.GoodId }, receiptGood);
        }

        // DELETE: api/ReceiptGoods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceiptGood(int id)
        {
            var receiptGood = await _context.ReceiptGoods.FindAsync(id);
            if (receiptGood == null)
            {
                return NotFound();
            }

            _context.ReceiptGoods.Remove(receiptGood);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceiptGoodExists(int id)
        {
            return _context.ReceiptGoods.Any(e => e.GoodId == id);
        }
    }
}
