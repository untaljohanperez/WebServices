using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Servicios.Models;

namespace Servicios.Controllers
{
    public class TblNivelesNomenclaturasController : ApiController
    {
        private CentralContext db = new CentralContext();

        // GET: api/TblNivelesNomenclaturas
        public IQueryable<TblNivelesNomenclaturas> GetTblNivelesNomenclaturas()
        {
            return db.TblNivelesNomenclaturas;
        }

        // GET: api/TblNivelesNomenclaturas/5
        [ResponseType(typeof(TblNivelesNomenclaturas))]
        public IHttpActionResult GetTblNivelesNomenclaturas(int id)
        {
            TblNivelesNomenclaturas tblNivelesNomenclaturas = db.TblNivelesNomenclaturas.Find(id);
            if (tblNivelesNomenclaturas == null)
            {
                return NotFound();
            }

            return Ok(tblNivelesNomenclaturas);
        }

        // PUT: api/TblNivelesNomenclaturas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTblNivelesNomenclaturas(int id, TblNivelesNomenclaturas tblNivelesNomenclaturas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblNivelesNomenclaturas.IdNomenclatura)
            {
                return BadRequest();
            }

            db.Entry(tblNivelesNomenclaturas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblNivelesNomenclaturasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/TblNivelesNomenclaturas
        [ResponseType(typeof(TblNivelesNomenclaturas))]
        public IHttpActionResult PostTblNivelesNomenclaturas(TblNivelesNomenclaturas tblNivelesNomenclaturas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TblNivelesNomenclaturas.Add(tblNivelesNomenclaturas);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TblNivelesNomenclaturasExists(tblNivelesNomenclaturas.IdNomenclatura))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tblNivelesNomenclaturas.IdNomenclatura }, tblNivelesNomenclaturas);
        }

        // DELETE: api/TblNivelesNomenclaturas/5
        [ResponseType(typeof(TblNivelesNomenclaturas))]
        public IHttpActionResult DeleteTblNivelesNomenclaturas(int id)
        {
            TblNivelesNomenclaturas tblNivelesNomenclaturas = db.TblNivelesNomenclaturas.Find(id);
            if (tblNivelesNomenclaturas == null)
            {
                return NotFound();
            }

            db.TblNivelesNomenclaturas.Remove(tblNivelesNomenclaturas);
            db.SaveChanges();

            return Ok(tblNivelesNomenclaturas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TblNivelesNomenclaturasExists(int id)
        {
            return db.TblNivelesNomenclaturas.Count(e => e.IdNomenclatura == id) > 0;
        }
    }
}