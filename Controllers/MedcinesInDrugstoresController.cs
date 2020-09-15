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
    public class MedcinesInDrugstoresController : ControllerBase
    {
        private readonly OnlinePharmacyContext _context;

        public MedcinesInDrugstoresController(OnlinePharmacyContext context)
        {
            _context = context;
        }

        // GET: api/MedcinesInDrugstores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedcinesInDrugstores>>> GetMedcinesInDrugstores()
        {
            return await _context.MedcinesInDrugstores.ToListAsync();
        }

        // GET: api/MedcinesInDrugstores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedcinesInDrugstores>> GetMedcinesInDrugstores(int id)
        {
            var medcinesInDrugstores = await _context.MedcinesInDrugstores.FindAsync(id);

            if (medcinesInDrugstores == null)
            {
                return NotFound();
            }

            return medcinesInDrugstores;
        }

        // PUT: api/MedcinesInDrugstores/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedcinesInDrugstores(int id, MedcinesInDrugstores medcinesInDrugstores)
        {
            if (id != medcinesInDrugstores.id)
            {
                return BadRequest();
            }

            _context.Entry(medcinesInDrugstores).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedcinesInDrugstoresExists(id))
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

        // POST: api/MedcinesInDrugstores
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<MedcinesInDrugstores>> PostMedcinesInDrugstores(MedcinesInDrugstores medcinesInDrugstores)
        {
            _context.MedcinesInDrugstores.Add(medcinesInDrugstores);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedcinesInDrugstores", new { id = medcinesInDrugstores.id }, medcinesInDrugstores);
        }

        // DELETE: api/MedcinesInDrugstores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MedcinesInDrugstores>> DeleteMedcinesInDrugstores(int id)
        {
            var medcinesInDrugstores = await _context.MedcinesInDrugstores.FindAsync(id);
            if (medcinesInDrugstores == null)
            {
                return NotFound();
            }

            _context.MedcinesInDrugstores.Remove(medcinesInDrugstores);
            await _context.SaveChangesAsync();

            return medcinesInDrugstores;
        }

        private bool MedcinesInDrugstoresExists(int id)
        {
            return _context.MedcinesInDrugstores.Any(e => e.id == id);
        }
    }
}
