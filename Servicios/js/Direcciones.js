var _mdlKey = 0;

/*===================================DECLARACION EN ASP======================================

        <div class="form-group">
            <asp:Label ID="Label2" runat="server" Text="Dirección:" AssociatedControlID="txtdir_envio"
                CssClass="control-label"></asp:Label>
            <asp:TextBox ID="txtdir_envio" runat="server" CssClass="form-control hide result-box "></asp:TextBox>
            <div class="form-control preview-box result-box"></div>
            <p class="help-block"></p>
            <asp:RequiredFieldValidator ID="RF_txtdir_envio" runat="server"
                ControlToValidate="txtdir_envio" Display="Dynamic"
                ErrorMessage="Ingrese Dirección de Domicilio actual"
                ValidationGroup="AllValidators">Campo Obligatorio</asp:RequiredFieldValidator>
        </div>






*/

var _modalInstructions =`<div class="modal fade" id="TutoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">
                        ¿Cómo Seleccionar tu dirección?</h4>
                </div>
                <div class="modal-body">
                    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                        <!-- Indicators -->
                        <ol class="carousel-indicators">
                            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="5"></li>
                        </ol>
                        <!-- Wrapper for slides -->
                        <div class="carousel-inner" role="listbox">
                            <div class="item active">
                                <img src="../img/Diapositiva1.PNG" alt="..." />
                            </div>
                            <div class="item">
                                <img src="../img/Diapositiva2.PNG" alt="..." />
                            </div>
                            <div class="item">
                                <img src="../img/Diapositiva3.PNG" alt="..." />
                            </div>
                            <div class="item">
                                <img src="../img/Diapositiva4.PNG" alt="..." />
                            </div>
                            <div class="item">
                                <img src="../img/Diapositiva5.PNG" alt="..." />
                            </div>
                            <div class="item">
                                <img src="../img/Diapositiva6.PNG" alt="..." />
                            </div>
                        </div>
                        <!-- Controls -->
                        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">
                                Previous</span> </a><a class="right carousel-control" href="#carousel-example-generic"
                                    role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true">
                                    </span><span class="sr-only">Next</span> </a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        Entendido</button>
                </div>
            </div>
        </div>
    </div>`;

$.fn.Direcciones = function (options, callback) {
    var defaults = {
        id: "ninguno",
        name: "ninguno",
    }
    if (callback === undefined) {
        callback = function () { };
    };
    var formGroupCount = $(this).length;
    this.each(function () {

        console.log(this);
        var formGroup = $(this).clone();
        var formGroupOriginal = $(this);
        $.ajax({
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://services.unac.edu.co/ServicioDatos.aspx/listarNomeclaturas",
            beforeSend: function () {

            },
            success: function (data) {
                var _row = `<div class="row">
            <div class="col-lg-4">
                <div>
                    <label class="control-label">Nomenclatura</label>
                    <select></select>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="formGroup form-group">

                </div>
            </div>
            <div class="col-lg-2 btn" data-toggle="modal" data-target="#TutoModal" >
                <div class="row text-center text-success">
                    <div class="col-lg-12">
                        <i class="fa fa-question-circle fa-2x"></i>
                    </div>
                    <div class="col-lg-12">
                        ¿Como usarlo?</div>
                </div>
            </div>
        </div>`;
                _row = $(_row);

                var _mdl = `<div runat="server" id="mdl" class="wz-mdl" data-key="1" style="display: none;">
            <div>
                <div class="row">
                    <div class="col-lg-4 col-lg-offset-4 " style="background-color: #fff; padding: 2em;">
                        <i class="fa fa-times close-wz" onclick="hideMdl(this);"></i>
                        <div class="Sec-1">
                        <h4 class="Pregunta">
                        </h4>
                        <div class="text-center">
                            <span class ="btn btn-green" onclick="tieneNombre(true,this);"  tabindex="0" autofocus="true"  onkeypress="enter(event);">Si </span><span class="btn btn-green no-btn" onkeypress="enter(event);"  onclick="tieneNombre(false,this);"  tabindex="0" autofocus="true">No </span>
                        </div>
                        </div>
                        <div class="Sec-2" style="display: none;">
                        <div class="Respuesta">
                        <div class="form-group">
                            <label class="control-label">Ingese el Nombre:</label>
                            <input type="text" name="nomenclaturaNombre" maxlength=40 class="form-control text-uppercase" onkeypress="return soloLetras(event,this);" onpaste="return noPaste(event);"/>
                        </div>
                        <div class="text-center">
                            <span class="btn btn-green ok-btn" onclick="establecerNombre(this);" tabindex="0"  onkeypress="enter(event);" autofocus="true">Ok </span><span class="btn btn-green"   tabindex="0" autofocus="true" onclick="hideMdl(this);"  onkeypress="enter(event);">Cancelar </span>
                        </div>
                        </div>
                        </div>
                        <div class="Sec-3" style="display: none;">
                        <div class="Respuesta">
                        <div class="form-group">
                            <label class="control-label">Ingese el Numero:</label>
                            <input type="number" name="nomenclaturaNombre" maxlength=40 class="form-control text-uppercase" onkeypress="return soloNumeros(event,this);" onpaste="return noPaste(event);"/>
                        </div>
                        <div class="text-center">
                            <span class="btn btn-green ok-btn ok-Num" onclick="establecerNombre(this);" tabindex="0"  onkeypress="enter(event);" autofocus="true">Ok </span><span class="btn btn-green"   tabindex="0" autofocus="true" onclick="hideMdl(this);"  onkeypress="enter(event);">Cancelar </span>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
                _mdl = $(_mdl);
                var keyboard = `<div class='keyboard'>
            <div class='col-lg-10' style='padding: 0.5em;'>
                <div class='row'>
                    <div class='col-lg-12 key'>
                        <div>A</div>
                        <div>B</div>
                        <div>C</div>
                        <div>D</div>
                        <div>E</div>
                        <div>F</div>
                        <div>G</div>
                        <div>H</div>
                        <div>I</div>
                        <div>J</div>
                        <div>K</div>
                        <div>L</div>
                        <div>M</div>
                        <div>N</div>
                        <div>O</div>
                        <div>P</div>
                        <div>Q</div>
                        <div>R</div>
                        <div>S</div>
                        <div>T</div>
                        <div>U</div>
                        <div>V</div>
                        <div>W</div>
                        <div>X</div>
                        <div>Y</div>
                        <div>Z</div>
                        <div data-value=' ' style='min-width: 120px;'>
                            Espacio</div>
                    </div>
                </div>
            <div class='row'>
                <div class='col-lg-6 col-lg-offset-6 key text-right not'>
                    <div onclick='borrarUlt(this);'>
                        <i class='fa fa-undo'></i>Deshacer última</div>
                    <div onclick='borrarTodo(this);'>
                        <i class='fa fa-eraser'></i>Limpiar todo</div>
                </div>
            </div>
            </div>
            <div class='col-lg-2' style='padding: 0.5em;'>
                <div class='row'>
                    <div class='col-lg-12 key'>
                        <div >1</div>
                        <div >2</div>
                        <div >3</div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-lg-12 key'>
                        <div >4</div>
                        <div >5</div>
                        <div >6</div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-lg-12 key'>
                        <div >7</div>
                        <div >8</div>
                        <div >9</div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-lg-12 key'>
                        <div >0</div>
                    </div>
                </div>
            </div>
        </div>`;
                keyboard = $(keyboard);

                var selectObj = $("<select class='form-control chos'></select>");

                for (var i = 0; i < data.d.length; i++) {
                    selectObj.append($("<option data-nombre='" + data.d[i].name + "' value='" + data.d[i].value + "'>" + data.d[i].text + "</option>"));
                };
                _row.find("select").replaceWith(selectObj);
                _row.find(".formGroup").replaceWith(formGroup);
                _mdlKey++;
                _mdl.attr("data-key", _mdlKey);
                //$("body").append($('<div class="container key-container"></div>').append(_row).append(_mdl).append(keyboard));
                formGroupOriginal.before($('<div class="container key-container"></div>').append(_row).append(_mdl).append(keyboard));
                formGroupOriginal.detach();
                //formGroup.remove();
                if (_mdlKey == formGroupCount) {
                    defineDirection();
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });

}

var tipoTecla;
var lastHandled = ["_", ""];
var nomenActual = ["_", "."];


/*Inicializacion*/
function defineDirection() {
    $("select.chosen-select").removeClass("form-control").chosen({ inherit_select_classes: true, no_results_text: "No se encontró el texto:" }).addClass("form-control");
    for (var i = 0; i < $(".key-container").length; i++) {
        lastHandled[i] = ["_", ""];
    }

    //$("select.chos").chosen();
    $("select.chos").chosen({ no_results_text: "No se encontró el texto:" }).change(function () {

        var __name = $(this).find("option:selected").data("nombre");
        if (__name.toLowerCase() == "true") {
            nomenActual[Number.parseInt($(this).parents(".key-container").find(".wz-mdl").data("key")) - 1] = $(this).find("option:selected").val();
            pedirNombre($(this).find("option:selected").text(), $(this).parents(".key-container").find(".wz-mdl").data("key"));
        } else {
            var i = Number.parseInt($(this).parents(".key-container").find(".wz-mdl").data("key")) - 1;
            nomenActual[i] = $(this).find("option:selected").val();
            if (lastHandled[i][1] != nomenActual[Number.parseInt(i)]) {
                launchMdlnum($(this).parents(".key-container").find(".wz-mdl").data("key"));
                tieneNombre(false, $(this).parents(".key-container").find(".Sec-1 span.no-btn")[0]);
            } else {
                $(this).parents(".key-container").find("select option").prop("selected", false).trigger('chosen:updated');
                new PNotify({
                    title: 'Atencion!',
                    text: 'No puedes seleccionar dos nomenclaturas iguales ni más de dos letras seguidas.',
                    icon: 'fa fa-times-o',
                    type: 'error',
                    hide: true,
                    styling: 'bootstrap3'
                });
            }
            /*
            var _text = $(this).parents(".key-container").find("div.result-box").first().text();
            nomenActual = $(this).find("option:selected").val();
            if (_text.length == 0) {
                _space = "";
            } else {
                _space = " ";
            }
            _text = $(this).parents(".key-container").find("div.result-box").first().text() + _space + nomenActual;
            $(this).parents(".key-container").find("div.result-box").text(_text);
            $(this).parents(".key-container").find("input.result-box").val(_text);*/
            $(this).find("option").prop("selected", false).trigger('chosen:updated');
        }
    });
    $(".chosen-container").css("width", "auto");
    $(".chosen-container").css("display", "block");
    $(".keyboard").find(".key:not(.not)>").on("click", function () { setKey(this); });
    $(".preview-box").each(function () {
        $(this).text($(this).siblings("input.result-box").val());
    });
    $("body").append($(_modalInstructions));
    //$("head").append($("<link href='http://services.unac.edu.co/css/wzModal.css' rel=\"stylesheet\">"));
}
var d = 0;

/*se ejecuta al hacer click en una letra o un número*/
function setKey(element) {
    var i = $(element).parents(".key-container").find(".wz-mdl").data("key") - 1;
    var char = "";
    var _space = "";
    if ($(element).text().trim().length > 1) {
        char = $(element).data("value");
    } else {
        char = $(element).text().trim();
    }
    var isnum = false;
    if (!isNaN(Number.parseInt(char))) {
        isnum = true;
    }
    if (lastHandled[i][0] != char || lastHandled[i][1] != char || isnum) {
        lastHandled[i][0] = lastHandled[i][1];
        lastHandled[i][1] = char;
        var _text = $(element).parents(".key-container").find("div.result-box").first().text();
        if (isnum) {
            if (_text.length == 0) {
                _space = "";
            } else {
                if (!isNaN(Number.parseInt(_text[_text.length - 1]))) {
                    _space = "";
                } else {
                    _space = " ";
                }
            }

        } else {
            if (_text - length == 0) {
                _space = "";

            } else {
                _space = " ";

            }
        }
        _text = $(element).parents(".key-container").find("div.result-box").first().text() + _space + char;
        $(element).parents(".key-container").find("input.result-box").removeAttr("value");
        $(element).parents(".key-container").find("div.result-box").text(_text.toLocaleUpperCase().replace("  ", " "));
        $(element).parents(".key-container").find("input.result-box").val(_text.toLocaleUpperCase().replace("  ", " "));
        $(element).parents(".key-container").find("select option").prop("selected", false).trigger('chosen:updated');
    } else {
        $(element).parents(".key-container").find("select option").prop("selected", false).trigger('chosen:updated');
        new PNotify({
            title: 'Atencion!',
            text: 'No puedes seleccionar dos nomenclaturas iguales ni más de dos letras seguidas.',
            icon: 'fa fa-times-o',
            type: 'error',
            hide: true,
            styling: 'bootstrap3'
        });
    }
}



function isWhitespace(charToCheck) {
    var whitespaceChars = " \t\n\r\f";
    return (whitespaceChars.indexOf(charToCheck) != -1);
}

/*limpia el ultimo conjunto de caracteres ingresado*/
function borrarUlt(element) {

    var i = $(element).parents(".key-container").find(".wz-mdl").data("key") - 1;
    if ($(element).parents(".key-container").find("div.result-box").first().text().lastIndexOf(lastHandled[i][1].toLocaleUpperCase()) != -1) {

        var _text = $(element).parents(".key-container").find("div.result-box").first().text().substring(0, $(element).parents(".key-container").find("div.result-box").first().text().lastIndexOf(lastHandled[i][1].toLocaleUpperCase()));
        $(element).parents(".key-container").find("input.result-box").removeAttr("value");
        $(element).parents(".key-container").find("div.result-box").text(_text);
        $(element).parents(".key-container").find("input.result-box").val(_text);
    } else {
        var _text = $(element).parents(".key-container").find("div.result-box").first().text().substring(0, $(element).parents(".key-container").find("div.result-box").first().text().lastIndexOf(" "));
        $(element).parents(".key-container").find("input.result-box").removeAttr("value");
        $(element).parents(".key-container").find("div.result-box").text(_text);
        $(element).parents(".key-container").find("input.result-box").val(_text);
    }
    lastHandled[i][1] = lastHandled[i][0];
    lastHandled[i][0] = '.';
}
/*limpia toda la caja de texto*/
function borrarTodo(element) {
    var i = $(element).parents(".key-container").find(".wz-mdl").data("key") - 1;
    $(element).parents(".key-container").find("input.result-box").removeAttr("value");
    $(element).parents(".key-container").find("div.result-box").text("");
    $(element).parents(".key-container").find("div.result-box").val("");
    $(element).parents(".key-container").find("input.result-box").text("");
    $(element).parents(".key-container").find("input.result-box").val("");
    lastHandled[i][0] = '.';
    lastHandled[i][1] = '-';
}
/* hacer click con enter*/
function enter(event) {
    var NoTecla = (event.which) ? event.which : event.keyCode;
    if (NoTecla = 13) {
        $(event.target).click();
    }
}
/*muestra el modal para que el usuario decida si la nomeclatura tiene nombre*/
function pedirNombre(TIPO, KEY) {
    var i = Number.parseInt(KEY) - 1;

    if (lastHandled[i][1] != nomenActual[KEY]) {
        $(".wz-mdl[data-key='" + KEY + "']").find(".Pregunta").text("¿LA NOMECLATURA '" + TIPO.toUpperCase() + "' TIENE NOMBRE?");
        $(".wz-mdl[data-key='" + KEY + "']").find(".Respuesta input").val("");
        launchMdl(KEY);
        $(".wz-mdl[data-key='" + KEY + "']").find(".btn-green").first().focus();
    } else {
        $(".wz-mdl[data-key='" + KEY + "']").parents(".key-container").find("select option").prop("selected", false).trigger('chosen:updated');
        new PNotify({
            title: 'Atencion!',
            text: 'No puedes seleccionar dos nomenclaturas iguales ni más de dos letras seguidas.',
            icon: 'fa fa-times-o',
            type: 'error',
            hide: true,
            styling: 'bootstrap3'
        });
    }
}
/**/
function tieneNombre(optn, element) {
    var i = $(element).parents(".key-container").find(".wz-mdl").data("key") - 1;
    if (optn) {
        $(element).parents(".wz-mdl").find(".Sec-1").fadeOut("fast", function () {
            $(element).parents(".wz-mdl").find(".Sec-2").fadeIn();
            $(element).parents(".wz-mdl").find(".Sec-2 input").focus();
        });
        //$(".Sec-1").fadeOut().siblings(".Sec-2").fadeIn();
    } else {

        if (lastHandled[i][1] != nomenActual[Number.parseInt(i)]) {

            $(element).parents(".wz-mdl").find(".Sec-1").fadeOut("fast", function () {
                $(element).parents(".wz-mdl").find(".Sec-3").fadeIn();
                $(element).parents(".wz-mdl").find(".Sec-3 input").focus();
            });
            /* lastHandled[i][0] = lastHandled[i][1];
            lastHandled[i][1] = nomenActual;
            establecerNombre($(element).parents(".wz-mdl").find(".ok-btn")[0]);
           aqui*/
        } else {
            new PNotify({
                title: 'Atencion!',
                text: 'No puedes seleccionar dos nomenclaturas iguales ni más de dos letras seguidas.',
                icon: 'fa fa-times-o',
                type: 'error',
                hide: true,
                styling: 'bootstrap3'
            });
            return false;
        }

    }
}
function establecerNombre(element) {
    var i = $(element).parents(".key-container").find(".wz-mdl").data("key") - 1;
    if ($(element).hasClass("ok-Num")) {
        if ($(element).parents(".key-container").find(".Respuesta input[type='number']").val().length > 0) {
            lastHandled[i][0] = lastHandled[i][1];
            lastHandled[i][1] = nomenActual[Number.parseInt(i)];
            var _text = $(element).parents(".key-container").find("div.result-box").first().text() + " " + nomenActual[Number.parseInt(i)] + " " + $(element).parents(".key-container").find(".Respuesta input[type='number']").val();
        } else {
            new PNotify({
                title: 'Atencion!',
                text: 'Debes ingresar un valor.',
                icon: 'fa fa-times-o',
                type: 'error',
                hide: true,
                styling: 'bootstrap3'
            });
            return;
        }
    } else {
        if ($(element).parents(".key-container").find(".Respuesta input[type='text']").val().length > 0) {
            lastHandled[i][0] = lastHandled[i][1];
            lastHandled[i][1] = nomenActual[Number.parseInt(i)];
            var _text = $(element).parents(".key-container").find("div.result-box").first().text() + " " + nomenActual[Number.parseInt(i)] + " " + $(element).parents(".key-container").find(".Respuesta input[type='text']").val();
        } else {
            new PNotify({
                title: 'Atencion!',
                text: 'Debes ingresar un valor.',
                icon: 'fa fa-times-o',
                type: 'error',
                hide: true,
                styling: 'bootstrap3'
            });
            return;
        }
    }
    $(element).parents(".key-container").find("input.result-box").removeAttr("value");
    $(element).parents(".key-container").find("div.result-box").text(_text.toLocaleUpperCase());
    $(element).parents(".key-container").find("input.result-box").val(_text.toLocaleUpperCase());
    nomenActual[Number.parseInt(i)] = "";
    $(element).parents(".wz-mdl").find("input").val("");
    $(element).parents(".wz-mdl").fadeOut();
    $(element).parents(".key-container").find("select option").prop("selected", false).trigger('chosen:updated');
}
function hideMdl(element) {
    nomenActual[Number.parseInt($(this).parents(".key-container").find(".wz-mdl").data("key")) - 1] = "";
    $(element).parents(".wz-mdl").find("input").val("");
    $(element).parents(".wz-mdl").fadeOut();
    $(element).parents(".key-container").find("select option").prop("selected", false).trigger('chosen:updated');
}
function launchMdl(key) {
    $(".wz-mdl[data-key='" + key + "']").find(".Sec-3").attr("style", "display: none;");
    $(".wz-mdl[data-key='" + key + "']").find(".Sec-2").attr("style", "display: none;");
    $(".wz-mdl[data-key='" + key + "']").find(".Sec-1").fadeIn("fast");
    $(".wz-mdl[data-key='" + key + "']").fadeIn();
}
function launchMdlnum(key) {
    $(".wz-mdl[data-key='" + key + "']").find(".Sec-1").attr("style", "display: none;");
    $(".wz-mdl[data-key='" + key + "']").find(".Sec-2").attr("style", "display: none;");
    $(".wz-mdl[data-key='" + key + "']").find(".Sec-3").fadeIn("fast");
    $(".wz-mdl[data-key='" + key + "']").fadeIn();
}

var nada;

function soloLetras(evt, element) {
    var NoTecla = (evt.which) ? evt.which : evt.keyCode;
    var tamano = $(element).val().length;
    $(element).siblings('p[class*="help-block"]').addClass("hide");
    if (NoTecla == 32 && ($(element).val().lastIndexOf(" ") + 1 == tamano)) {
        $(element).siblings('p[class*="help-block"]').removeClass("hide");
        $(element).siblings('p[class*="help-block"]').text("No se permite ingresar dos espacios seguidos");
        return false;
    }
    if ((NoTecla < 48 || NoTecla > 57) && (NoTecla < 65 || NoTecla > 90) && (NoTecla < 96 || NoTecla > 105) && (NoTecla != 8) && (NoTecla < 106 || NoTecla > 122) && (NoTecla != 32)) {
        $(element).siblings('p[class*="help-block"]').removeClass("hide");
        $(element).siblings('p[class*="help-block"]').text("No se permiten caracteres especiales");
        return false;
    }
    if (isNaN(Number.parseInt(String.fromCharCode(evt.charCode)))) {

        if ($(element).siblings('p[class*="help-block"]').hasClass("hide")) {
            $(element).siblings('p[class*="help-block"]').addClass("hide");
        }
        return true;
    }
    $(element).siblings('p[class*="help-block"]').removeClass("hide");
    $(element).siblings('p[class*="help-block"]').text("No se permiten caracteres numéricos");
    return false;
}
function soloNumeros(evt, element) {
    //    console.log(evt);
    var NoTecla = (evt.which) ? evt.which : evt.keyCode;
    var tamano = $(element).val().length;
    $(element).siblings('p[class*="help-block"]').addClass("hide");
    if ((NoTecla < 48 || NoTecla > 57) && (NoTecla < 65 || NoTecla > 90) && (NoTecla < 96 || NoTecla > 105) && (NoTecla != 8) && (NoTecla < 106 || NoTecla > 122) && (NoTecla != 32)) {
        $(element).siblings('p[class*="help-block"]').removeClass("hide");
        $(element).siblings('p[class*="help-block"]').text("No se permiten caracteres especiales");
        return false;
    }
    if (!isNaN(Number.parseInt(String.fromCharCode(evt.charCode)))) {

        if ($(element).siblings('p[class*="help-block"]').hasClass("hide")) {
            $(element).siblings('p[class*="help-block"]').addClass("hide");
        }
        return true;
    }
    $(element).siblings('p[class*="help-block"]').removeClass("hide");
    $(element).siblings('p[class*="help-block"]').text("Solo se admiten números");
    return false;
}
function noPaste(evt) {
    $(element).siblings('p[class*="help-block"]').removeClass("hide");
    $(element).siblings('p[class*="help-block"]').text("No se permite pegar");
    return false;
}