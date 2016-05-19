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
    public class TblNomenController : ApiController
    {
        private CentralContext db = new CentralContext();

        public IQueryable<object> GetTblNomen()
        {
            var a = db.TblNomen.Count((e) => e.IdsNomenId == 3);

            var query = from nomen in db.TblNomen
                        join niv in db.TblNivelesNomenclaturas
                        on nomen.IdsNomenId equals niv.IdNomenclatura
                        select new
                        {
                            id = nomen.IdsNomenId,
                            abreviatura = nomen.ChrNomenAbrev,
                            nivel = niv.Nivel,
                            obligatorio = niv.Obligatoria,
                            nomenAdicionales = niv.NomeclatrurasAdicionales
                        };
            return db.TblNomen;
        }

        // GET: api/TblNomen/5
        [ResponseType(typeof(TblNomen))]
        public IHttpActionResult GetTblNomen(int id)
        {
            TblNomen tblNomen = db.TblNomen.Find(id);
            if (tblNomen == null)
            {
                return NotFound();
            }

            return Ok(tblNomen);
        }


        [ResponseType(typeof(object))]
        public IHttpActionResult GetNomenNivel(int nivel)
        {
            var query = from nomen in db.TblNomen
                        join niv in db.TblNivelesNomenclaturas
                        on nomen.IdsNomenId equals niv.IdNomenclatura
                        where niv.Nivel == nivel
                        select new
                        {
                            id = nomen.IdsNomenId,
                            abreviatura = nomen.ChrNomenAbrev,
                            nivel = niv.Nivel,
                            obligatorio = niv.Obligatoria,
                            nomenAdicionales = niv.NomeclatrurasAdicionales
                        };
            if (query == null)
            {
                return NotFound();
            }

            return Ok(query);
        }



        // PUT: api/TblNomen/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTblNomen(int id, TblNomen tblNomen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblNomen.IdsNomenId)
            {
                return BadRequest();
            }

            db.Entry(tblNomen).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblNomenExists(id))
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

        // POST: api/TblNomen
        [ResponseType(typeof(TblNomen))]
        public IHttpActionResult PostTblNomen(TblNomen tblNomen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TblNomen.Add(tblNomen);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblNomen.IdsNomenId }, tblNomen);
        }

        // DELETE: api/TblNomen/5
        [ResponseType(typeof(TblNomen))]
        public IHttpActionResult DeleteTblNomen(int id)
        {
            TblNomen tblNomen = db.TblNomen.Find(id);
            if (tblNomen == null)
            {
                return NotFound();
            }

            db.TblNomen.Remove(tblNomen);
            db.SaveChanges();

            return Ok(tblNomen);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TblNomenExists(int id)
        {
            return db.TblNomen.Count(e => e.IdsNomenId == id) > 0;
        }
    }
}