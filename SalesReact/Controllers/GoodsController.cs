﻿using System;
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
    public class GoodsController : ControllerBase
    {
        private readonly GoodDBContext _context;

        public GoodsController(GoodDBContext context)
        {
            _context = context;
        }

        // GET: api/Goods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Good>>> GetGood()
        {
            return await _context.Good.ToListAsync();
        }

        // GET: api/Goods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Good>> GetGood(int id)
        {
            var good = await _context.Good.FindAsync(id);

            if (good == null)
            {
                return NotFound();
            }

            return good;
        }

        // PUT: api/Goods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGood(int id, Good good)
        {
            if (id != good.id)
            {
                return BadRequest();
            }

            _context.Entry(good).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoodExists(id))
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
        public async Task<ActionResult<Good>> PostGood(Good good)
        {
            _context.Good.Add(good);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGood", new { id = good.id }, good);
        }

        // DELETE: api/Goods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGood(int id)
        {
            var good = await _context.Good.FindAsync(id);
            if (good == null)
            {
                return NotFound();
            }

            _context.Good.Remove(good);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GoodExists(int id)
        {
            return _context.Good.Any(e => e.id == id);
        }
    }
}