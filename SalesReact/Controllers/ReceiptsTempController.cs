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

        [HttpGet("getPrice")] 
        public async Task<ActionResult<PriceResultDTO>> GetPrice(int? GoodId, int Quantity)
        {
            PriceResultDTO result = new PriceResultDTO();
            if (GoodId != null)
            {
                Good good = await _context.Goods.FindAsync(GoodId);
                if (good != null)
                {
                    return this.calculatePrice(good, Quantity);
                }
                
            }
            
            return result;
        }

        private Double roundingPolicy(Double value)
        {
            return value;
        }

        private PriceResultDTO calculatePrice(Good good, int Quantity)
        {
            int tax = good.Category.Tax.Value;

            if (good.Imported == true)
            {
                // get tax valoue from settings db _context.InvoiceSettings.FindAsync("")
                tax += 5;
            }
            
            Double priceD = Convert.ToDouble(good.Price);
            Double taxD = Convert.ToDouble(tax);
            Double value = priceD * (1 + (taxD / 100));
            Double valueRounded = this.roundingPolicy(value) * Quantity;


            PriceResultDTO pResult = new PriceResultDTO();
            
            pResult.TotalPrice = Convert.ToInt32(valueRounded);
            pResult.TotalTax = Convert.ToInt32(pResult.TotalPrice - good.Price * Quantity);
            

            Console.WriteLine("valueRounded: " + valueRounded + "; priceD=" + priceD + " pResult: " + pResult);


            return pResult;
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
                
                Console.WriteLine("add item " + countItem);

                ReceiptGood rGood = new ReceiptGood();
                rGood.Receipt = newReceipt;
                rGood.Quantity = receiptItemDto.Quantity;


                Good good = await _context.Goods.FindAsync(receiptItemDto.GoodId);
                if (good != null)
                {
                    PriceResultDTO priceResult = this.calculatePrice(good, rGood.Quantity);

                    rGood.TotalTax = priceResult.TotalTax;
                    rGood.TotalPrice = priceResult.TotalPrice;

                    rGood.GoodId = receiptItemDto.GoodId;
                    rGood.GoodName = good.Name;
                    rGood.PriceItem = good.Price;
                    rGood.TaxItem = good.Category.Tax.Value;

                    totalPrice += priceResult.TotalPrice;
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

            newReceipt.TotalItems = countItem;
            newReceipt.Total = totalPrice;

            _context.Entry(newReceipt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                Console.WriteLine("error update receipt DbUpdateConcurrencyException add item Error");

                throw;
            }
            return "ok";
        }

        private bool GoodExists(int id)
        {
            return _context.Goods.Any(e => e.GoodId == id);
        }
    }
}
