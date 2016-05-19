using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Servicios.Clases
{
    public class Conexion
    {

        /// <summary>
        /// Constructor ©JPardo 2014FEB14  Modified by WISTON MAZO
        /// </summary>
        public Conexion()
        {

        }
        /// <summary>
        /// Ejecuta un procedimiento almacenado ©JPardo 2014FEB14 & WistonMazo 2015JUL01
        /// </summary>
        /// <param name="NombreSP">Nombre del procedimiento almacenado</param>
        /// <param name="Parametros">Lista de parámetros del tipo List SqlParamter </param>
        /// <param name="ConexionString">Cadena de conexión a la base de datos</param>
        /// <returns></returns>
        public DataTable EjecutarProcedimientoAlmacenado(string NombreSP, List<SqlParameter> Parametros, string ConnetionString)
        {
            try
            {
                /*SE QUITÓ LA INSTRUCCION USING YA QUE DE LA MANERA QUE SE VENIA HACIENDO LA CONEXION SEGUÍA ESTANDO ABIERTA AUN DESPUES DE EJECUTAR EL CN.CLOSE()    -----Agregado por Wiston Mazo  ---*/
                SqlConnection cn = new SqlConnection(ConnetionString);
                SqlDataAdapter da = null;
                SqlTransaction tr = null; //transaccion actual
                SqlCommand cmd;
                DataSet ds;
                cn.Open();//abrir conexion
                          //Ejecutar el procedimiento como una transacción
                tr = cn.BeginTransaction();
                cmd = cn.CreateCommand();
                cmd.Connection = cn;
                cmd.Transaction = tr;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = NombreSP;

                ds = new DataSet();

                try
                {
                    //Determinar si hay parámetros en el procedimiento
                    if (Parametros != null)
                    {
                        //Añadir cada parámetro al procedimiento
                        foreach (SqlParameter item in Parametros)
                        {
                            cmd.Parameters.Add(item);
                        }
                    }//if (Parametros != null)

                    //SqlAdapter utiliza el SqlCommand para llenar el Dataset
                    da = new SqlDataAdapter(cmd);

                    //ejecuta procedimiento y llena el dataset (En lugar de cmd.ExecuteNonQuery(), Este a su vez retorna la cantidad de filas afectadas.)
                    da.SelectCommand.CommandTimeout = 180;//Máximo 3 minutos
                    da.Fill(ds);

                    //Completar la transacción
                    tr.Commit();
                    tr.Dispose();
                    da.Dispose();
                }
                catch (Exception ex)
                {
                    tr.Rollback();//Devolver la ejecución de la transacción
                    throw (ex);
                }
                finally
                {
                    /*SE QUITO EL METODO DE DESCONECTAR YA QUE DE LA MANERA QUE SE VENIA HACIENDO LA CONEXION SEGUÍA ESTANDO ABIERTA    -----Agregado por Wiston Mazo  ---*/
                    //Cerrar conexión con o sin error
                    if (cn.State.Equals(ConnectionState.Open))
                    {
                        da.Dispose();//destruir el DataAdapter
                        da = null;
                        tr.Dispose();//destruir la transaccion
                        tr = null;
                        cmd.Parameters.Clear();
                        cmd.Dispose(); //destruir el comando
                        cmd = null;
                        cn.Close(); //cerrar conexión
                        cn.Dispose(); //Eliminar conexión
                        cn = null;
                    }
                }
                //Agregado por Wiston Mazo  --- se agrega codigo que calcula cual es la ultima tabla de la coleccion y devuelve el indice de esta
                Int32 LastChild = ds.Tables.Count - 1;
                return ds.Tables[LastChild];//Devolver el DataTable
            }
            catch (Exception ex)
            {
                throw ex;
            }//try

        }//EjecutarProcedimientoAlmacenado

        /// <summary>
        /// Ejecuta una instrucción Select y devuelve un objeto del tipo DataTable ©JPardo 2014FEB14 & WistonMazo 2015JUL01
        /// </summary>
        /// <param name="strConsulta">Consulta SQL SELECT</param>
        /// <param name="ConnetionString">Cadena de conexión a la base de datos</param>
        /// <returns></returns>
        public DataTable Listar(string strConsulta, string ConnetionString)
        {
            try
            {
                /*SE QUITÓ LA INSTRUCCION USING YA QUE DE LA MANERA QUE SE VENIA HACIENDO LA CONEXION SEGUÍA ESTANDO ABIERTA AUN DESPUES DE EJECUTAR EL CN.CLOSE()    -----Agregado por Wiston Mazo  ---*/
                SqlConnection cn = new SqlConnection(ConnetionString);
                SqlCommand cmd = new SqlCommand(strConsulta, cn);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                try
                {
                    //Ejecutar consulta y llenar el DataTable
                    da.Fill(dt);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    /*SE QUITO EL METODO DE DESCONECTAR YA QUE DE LA MANERA QUE SE VENIA HACIENDO LA CONEXION SEGUÍA ESTANDO ABIERTA    -----Agregado por Wiston Mazo  ---*/
                    //Cerrar conexión con o sin error
                    if (cn.State.Equals(ConnectionState.Open))
                    {
                        da.Dispose();//destruir el DataAdapter
                        da = null;
                        cmd.Parameters.Clear();
                        cmd.Dispose(); //destruir el comando
                        cmd = null;
                        cn.Close(); //cerrar conexión
                        cn.Dispose(); //Eliminar conexión
                        cn = null;
                    }
                }

                return dt;//Retornar el DataTable

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }//public class Conexion
}
