using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Servicios.Models
{
    public class TblNomen
    {
        [Key]
        public int IdsNomenId { get; set; }
        public string ChrNomenAbrev { get; set; }
        public string ChrNomenNom { get; set; }
        public bool? blnNomenDir { get; set; }

        public TblNomen() { }
    }

}