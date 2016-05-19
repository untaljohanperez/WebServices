using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Servicios.Models
{
    public class TblNivelesNomenclaturas
    {
        [Key]
        [Column(Order=1)]
        public int IdNomenclatura { get; set; }
        [Key]
        [Column(Order = 2)]
        public int Nivel { get; set; }
        public bool Obligatoria { get; set; }
        public int NomeclatrurasAdicionales { get; set; }

        public TblNivelesNomenclaturas() { }

    }
}