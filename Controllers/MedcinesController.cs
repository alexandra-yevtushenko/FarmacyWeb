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
    public class MedcinesController : ControllerBase
    {
        private readonly OnlinePharmacyContext _context;

        public MedcinesController(OnlinePharmacyContext context)
        {
            _context = context;
        }

        // GET: api/Medcines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medcines>>> GetMedcines()
        {
            return await _context.Medcines.ToListAsync();
        }

        [HttpGet("like/{name}")]
        public async Task<ActionResult<IEnumerable<Medcines>>> GetMedcines(string name)
        {
            return await _context.Medcines.Where(m => m.name.StartsWith(name)).ToListAsync();
        }
        // GET: api/Medcines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Medcines>> GetMedcines(int id)
        {
            var medcines = await _context.Medcines.FindAsync(id);

            if (medcines == null)
            {
                return NotFound();
            }

            return medcines;
        }

        // PUT: api/Medcines/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedcines(int id, Medcines medcines)
        {
            if (id != medcines.id)
            {
                return BadRequest();
            }

            _context.Entry(medcines).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedcinesExists(id))
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

        // POST: api/Medcines
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Medcines>> PostMedcines(Medcines medcines)
        {
            try
            {
                _context.Medcines.Add(medcines);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetMedcines", new { id = medcines.id }, medcines);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Medcines/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Medcines>> DeleteMedcines(int id)
        {
            var medcines = await _context.Medcines.FindAsync(id);
            if (medcines == null)
            {
                return NotFound();
            }

            _context.Medcines.Remove(medcines);
            await _context.SaveChangesAsync();

            return medcines;
        }

        private bool MedcinesExists(int id)
        {
            return _context.Medcines.Any(e => e.id == id);
        }
    }
}
