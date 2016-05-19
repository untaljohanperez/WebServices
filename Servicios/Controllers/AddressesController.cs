using Servicios.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Servicios.Controllers
{
    public class AddressesController : ApiController
    {
        private CentralContext db = new CentralContext();

        [HttpGet]
        [ActionName("GetNomenNivel")]
        public object GetNomenNivel(int? id)
        {
            // if nivel== null get all the nomenclatures
            var listNomenNivel = from nomen in db.TblNomen
                             join niv in db.TblNivelesNomenclaturas
                             on nomen.IdsNomenId equals niv.IdNomenclatura
                             where niv.Nivel ==  (id == null ? niv.Nivel : id)
                             select new
                             {
                                 id = nomen.IdsNomenId,
                                 nomen = nomen.ChrNomenNom,
                                 abreviatura = nomen.ChrNomenAbrev,
                                 nivel = niv.Nivel,
                                 obligatorio = niv.Obligatoria,
                                 nomenAdicionales = niv.NomeclatrurasAdicionales
                             };

            return listNomenNivel;
        }

        [HttpGet]
        [ActionName("GetNumNiveles")]
        public object GetNumNiveles()
        {
            //var nivObli = from niv in db.TblNivelesNomenclaturas
            //              where niv.Obligatoria == true
            //              group niv by niv.Nivel into gniv
            //              select gniv.Key;

            var nivObli = db.TblNivelesNomenclaturas.Where(e => e.Obligatoria == true)
                                                    .GroupBy(e => e.Nivel)
                                                    .Select(e => e.Key).ToList();
            

            var nivOpc = db.TblNivelesNomenclaturas.Where(e => e.Obligatoria == false)
                                                                 .GroupBy(e => e.Nivel)
                                                                 .Select(e => e.Key).ToList();

            //var nivOpc = from niv in db.TblNivelesNomenclaturas
            //                        where niv.Obligatoria == false
            //                        group niv by niv.Nivel
            //                         into gniv
            //                        select gniv.Key;

            return new { nivObli, nivOpc };
        }

        [HttpGet]
        [ActionName("GetNomenclaturas")]
        public object GetNomenclaturas()
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
            return query;
        }


    }
}
