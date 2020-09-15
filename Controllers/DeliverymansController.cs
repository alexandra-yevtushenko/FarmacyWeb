using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlinePharmacy.Models;

namespace OnlinePharmacy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliverymansController : ControllerBase
    {
        private readonly OnlinePharmacyContext _context;

        public DeliverymansController(OnlinePharmacyContext context)
        {
            _context = context;
        }

        // GET: api/Deliverymans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deliverymans>>> GetDeliverymans()
        {
            return await _context.Deliverymans.ToListAsync();
        }

        // GET: api/Deliverymans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Deliverymans>> GetDeliverymans(int id)
        {
            var deliverymans = await _context.Deliverymans.FindAsync(id);

            if (deliverymans == null)
            {
                return NotFound();
            }

            return deliverymans;
        }

        // PUT: api/Deliverymans/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeliverymans(int id, Deliverymans deliverymans)
        {
            if (id != deliverymans.id)
            {
                return BadRequest();
            }

            _context.Entry(deliverymans).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliverymansExists(id))
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

        // POST: api/Deliverymans
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Deliverymans>> PostDeliverymans(Deliverymans deliverymans)
        {
            _context.Deliverymans.Add(deliverymans);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeliverymans", new { id = deliverymans.id }, deliverymans);
        }

        // DELETE: api/Deliverymans/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Deliverymans>> DeleteDeliverymans(int id)
        {
            var deliverymans = await _context.Deliverymans.FindAsync(id);
            if (deliverymans == null)
            {
                return NotFound();
            }

            _context.Deliverymans.Remove(deliverymans);
            await _context.SaveChangesAsync();

            return deliverymans;
        }

        private bool DeliverymansExists(int id)
        {
            return _context.Deliverymans.Any(e => e.id == id);
        }
    }
}
