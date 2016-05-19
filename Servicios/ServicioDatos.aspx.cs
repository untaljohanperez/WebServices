using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Servicios.Clases;
using System.Configuration;
namespace Servicios
{
    public partial class ServicioDatos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static object listarNomeclaturas()
        {
            Conexion cn = new Conexion();
            DataTable nomenclaturas = cn.Listar("[LISTARNomenclaturas]", ConfigurationManager.ConnectionStrings["ListC_Connection"].ToString());
            System.Collections.Generic.Dictionary<string, object>[] map = new System.Collections.Generic.Dictionary<string, object>[nomenclaturas.Rows.Count];
            int i = 0;
            foreach (DataRow item in nomenclaturas.Rows)
            {
                map[i] = new System.Collections.Generic.Dictionary<string, object>();
                map[i].Add("name", item["blnNomenDir"].ToString());
                map[i].Add("value", item["ChrNomenAbrev"].ToString());
                map[i].Add("text", item["ChrNomenNom"].ToString());
                i++;
            }
            var tt = map.ToList();
            return map.ToList();
        }
    }
}