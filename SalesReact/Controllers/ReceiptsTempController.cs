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
    public class ReceiptsTempController : ControllerBase
    {
        private readonly SalesContext _context;

        public ReceiptsTempController(SalesContext context)
        {
            _context = context;
        }


        // POST: api/Receipts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<String>> PostReceiptTemp(ReceiptDTO receiptDTO)
        {
            Receipt newReceipt = new Receipt();
            newReceipt.Date = DateTime.Now;

            _context.Receipts.Add(newReceipt);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                Console.WriteLine("error insert receipt DbUpdateConcurrencyException add item Error");
                throw;
            }

            int newReceiptId = newReceipt.Id;

            int countItem = 0;
            int totalPrice = 0;
            Console.WriteLine("Create receipt id=" + newReceiptId + "; #" + receiptDTO.ReceiptItems.Count());

            foreach (ReceiptItemDTO receiptItemDto in receiptDTO.ReceiptItems)
            {
                
                countItem += receiptItemDto.Quantity;
                totalPrice += receiptItemDto.TotalPrice;
                Console.WriteLine("add item " + countItem);

                ReceiptGood rGood = new ReceiptGood();
                rGood.Receipt = newReceipt;
                rGood.Quantity = receiptItemDto.Quantity;
                
                rGood.TotalTax = receiptItemDto.TotalTax;

                Good good = await _context.Goods.FindAsync(receiptItemDto.GoodId);
                if (good != null)
                {
                    rGood.GoodId = receiptItemDto.GoodId;
                    rGood.GoodName = good.Name;
                    rGood.PriceItem = good.Price;
                    rGood.TaxItem = receiptItemDto.TaxItem;
                }

                _context.ReceiptGoods.Add(rGood);
                try
                {
                    await _context.SaveChangesAsync();
                    Console.WriteLine("add item receipt to id=" + newReceiptId + "; countItem:#" + countItem);

                }
                catch (Exception)
                {
                    Console.WriteLine("error insert items DbUpdateConcurrencyException add item Error");
                }

            }

            //newReceipt.TotalItems = countItem;
            //newReceipt.Total = totalPrice;

            //_context.Entry(newReceipt).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (Exception)
            //{
            //    Console.WriteLine("error update receipt DbUpdateConcurrencyException add item Error");

            //    throw;                
            //}
            return "ok";
        }

        private bool GoodExists(int id)
        {
            return _context.Goods.Any(e => e.GoodId == id);
        }
    }
}
