const express = require('express');
const router = express.Router();

var PdfPrinter = require('./pdfmake/src/printer');
var fonts = {
	Roboto: {
		normal: './pdfmake/examples/fonts/Roboto-Regular.ttf',
		bold: './pdfmake/examples/fonts/Roboto-Medium.ttf',
		italics: './pdfmake/examples/fonts/Roboto-Italic.ttf',
		bolditalics: './pdfmake/examples/fonts/Roboto-MediumItalic.ttf'
	}
};
var printer = new PdfPrinter(fonts);
var fs = require('fs');


//recuperamos la vista
router.get('/almacen', function(req, res, next){
      res.render('almacen',{title:"Almacen"});
});

//PDF 1. Balance General
function balanceGral(cajaBancos,cuentasPorCobrar,IVAAcreditable,almacenArtTerm,
		almacenMateriales,terreno,edifInsta,maqEquipo,mueblesEnseres,eqTrans,
		pagosAnticipado,gastosAmortizacion,IVAPorEnterar,imptosPorPagar,
		proveedores,PTUPorPagar,prestamosBancarios,capitalSocial,reservaLegal,utilidadAcum,
		totalActivoAMenosAnio,totalActivoAMasAnio,totalAplicacionDif,totalSumaDerechos,
		totalPasivoAMenosAnio,totalPasivoAMasAnio,totalAccionistas,totalSumaObligaciones) {
	var balance = {
	  	//content: [
				content: [
					{text: 'Balance General', style: 'header', alignment: 'center'},
		  		{
		  			style: 'tableExample',
						width: 'auto',
		  			table: {
          	widths: [ '*', '*', '*', '*' ],
							alignment:'center',
		  				body:
							[
							[{text: 'Posicion financiera inicial', style: 'tableHeader', colSpan: 4, alignment: 'center'},{},{},{}],
							//[{text: '', style: 'tableHeader', colSpan: 4, alignment: 'center'}],
							[{text:'A menos de un año', style: 'NameBold'}, '', {text:'A menos de un año', style: 'NameBold'},''],
							//[{text: '', style: 'tableHeader', colSpan: 4, alignment: 'center'}],
							['Caja y bancos', '$ '+cajaBancos+'', 'IVA por enterar','$ '+IVAPorEnterar+''],
							['Cuentas por cobrar', '$ '+cuentasPorCobrar+'', 'Impuesto por pagar','$ '+imptosPorPagar+''],
							['IVA acreditable', '$ '+IVAAcreditable+'', 'Proveedores','$ '+proveedores+''],
							['Almacén de artículo terminado', '$ '+almacenArtTerm+'', 'PTU por pagar','$ '+PTUPorPagar+''],
							['Almacén de materiales','$ '+almacenMateriales+'','Préstamos bancarios','$ '+prestamosBancarios+''],
							[{text:'TOTAL', style: 'NameBold'},'$ '+totalActivoAMenosAnio+'',{text:'TOTAL', style: 'NameBold'},'$ '+totalPasivoAMenosAnio+''],
							[{text:'A más de un año', style: 'NameBold'}, '', {text:'A más de un año', style: 'NameBold'},''],
							['Terreno','$ '+terreno+'','Préstamos totales','$ '+prestamosBancarios+''],
							['Edificios e instalaciones','$ '+edifInsta+'','',''],
							['Maquinaria y equipo','$ '+maqEquipo+'','',''],
							['Muebles y enseres','$ '+mueblesEnseres+'','',''],
							['Equipo de transporte','$ '+eqTrans+'','',''],
							[{text:'TOTAL', style: 'NameBold'},'$ '+totalActivoAMasAnio+'',{text:'TOTAL', style: 'NameBold'},'$ '+totalPasivoAMasAnio+''],
							[{text:'De aplicación diferida', style: 'NameBold'}, '', {text:'Con los accionistas', style: 'NameBold'},''],
							['Pagos hechos por anticipado','$ '+pagosAnticipado+'','Capital social','$ '+capitalSocial+''],
							['Gastos por amortizar','$ '+gastosAmortizacion+'','Reserva legal','$ '+reservaLegal+''],
							['','','Utilidad acumulada','$ '+utilidadAcum+''],
							[{text:'TOTAL', style: 'NameBold'},'$ '+totalAplicacionDif+'',{text:'TOTAL', style: 'NameBold'},'$ '+totalAccionistas+''],
							[{text:'Suman los derechos' ,style: 'NameBold'},'$ '+totalSumaDerechos+'','Suman las obligaciones','$ '+totalSumaObligaciones+''],
							[{text:'Diferencia',style: 'NameBold'},'$ '+totalSumaObligaciones+'','','']

							]
		  			},
		  			layout: 'lightHorizontalLines'
		  		}
		],
		styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		NameBold: {
			bold: true,
			margin: [0, 0, 0, 15],
			fontSize: 13,
			color: 'black'
		}
		}
	};
	return balance;
}

router.post('/balance_general', (req, res, next) => {
  Promise.resolve()
  .then(function () {
		//recuperamos los objetos de balance
		var cajaBancos = req.body.cajaBancos;
		var cuentasPorCobrar = req.body.cuentasPorCobrar;
		var IVAAcreditable = req.body.IVAAcreditable;
		var almacenArtTerm = req.body.almacenArtTerm;
		var almacenMateriales = req.body.almacenMateriales;

		var terreno = req.body.terreno;
		var edifInsta = req.body.edifInsta;
		var maqEquipo = req.body.maqEquipo;
		var mueblesEnseres = req.body.mueblesEnseres;
		var eqTrans = req.body.eqTrans;

		var pagosAnticipado = req.body.pagosAnticipado;
		var gastosAmortizacion = req.body.gastosAmortizacion;

		var IVAPorEnterar = req.body.IVAPorEnterar;
		var imptosPorPagar = req.body.imptosPorPagar;
		var proveedores = req.body.proveedores;
		var PTUPorPagar = req.body.PTUPorPagar;
		var prestamosBancarios = req.body.prestamosBancarios;

		var capitalSocial = req.body.capitalSocial;
		var reservaLegal = req.body.reservaLegal;
		var utilidadAcum = req.body.utilidadAcum;
		var totalActivoAMenosAnio = req.body.totalActivoAMenosAnio;
		var totalActivoAMasAnio = req.body.totalActivoAMasAnio;
		var totalAplicacionDif = req.body.totalAplicacionDif;
		var totalSumaDerechos = req.body.totalSumaDerechos;
		var totalPasivoAMenosAnio = req.body.totalPasivoAMenosAnio;
		var totalPasivoAMasAnio = req.body.totalPasivoAMasAnio;
		var totalAccionistas = req.body.totalAccionistas;
		var totalSumaObligaciones = req.body.totalSumaObligaciones;

    return balanceGral(cajaBancos,cuentasPorCobrar,IVAAcreditable,almacenArtTerm,
				almacenMateriales,terreno,edifInsta,maqEquipo,mueblesEnseres,eqTrans,
				pagosAnticipado,gastosAmortizacion,IVAPorEnterar,imptosPorPagar,
				proveedores,PTUPorPagar,prestamosBancarios,capitalSocial,reservaLegal,utilidadAcum,
				totalActivoAMenosAnio,totalActivoAMasAnio,totalAplicacionDif,totalSumaDerechos,
				totalPasivoAMenosAnio,totalPasivoAMasAnio,totalAccionistas,totalSumaObligaciones);
  })
  .then(function (almacenArtTermIni) {
		var pdfDoc = printer.createPdfKitDocument(almacenArtTermIni);
		pdfDoc.pipe(fs.createWriteStream('./periodos/balance_general.pdf'));
		pdfDoc.end();
    res.json({success: true, msg:"Operacion exitosa"});
  })
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 2. Almacén de Artículos Terminado Inicial

function almacenArtTermIni(almacenProducto,encabezadoA,primeraFila,ultimaFila){
	var almacenArtTermIni = {
			content: [
					{text: 'Almacén de Artículos Terminado Inicial', style: 'header', alignment: 'center'},
							tablaAlmacenArtTerm(almacenProducto,['Producto', 'Unidades', 'Costo','Total'], encabezadoA, primeraFila, ultimaFila)//aqui va el nombre de cada objeto json que se quiere leer
				],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	}
	};
	return almacenArtTermIni;
}

function tablaAlmacenArtTerm(data, columns, encabezadoA, primeraFila, ultimaFila) {
		return {
				table: {
					widths: [ 'auto', '*', 'auto', '*' ],
					headerRows: 2,
					alignment: 'center',
						body: construyeTablaAlmacenArtTerm(data, columns, encabezadoA, primeraFila, ultimaFila)
				}
		};
}

function construyeTablaAlmacenArtTerm(data, columns, encabezadoA, primeraFila, ultimaFila) {
		var body = [];

		body.push(encabezadoA);
		body.push(primeraFila);

		data.forEach(function(row) {
				var dataRow = [];

				columns.forEach(function(column) {
						dataRow.push(row[column].toString());
				})

				body.push(dataRow);
		});
			body.push(ultimaFila);
		return body;
}

router.post('/almacen_art_term_ini', (req, res, next) => {
  Promise.resolve()
  .then(function () {
//recuperamos un json de arreglos de objetos json
		var almacenArray = req.body;
		var almacenProducto	= almacenArray.Producto;//extraemos el arreglo que deseamos enviar al pdf

		var SumaUnidades = almacenArray.ResultadosProducto.SumaUnidades;
		var SumaCosto = almacenArray.ResultadosProducto.SumaCosto;
		var SumaTotal = almacenArray.ResultadosProducto.SumaTotal;

//console.log("SumaUnidades:"+ SumaUnidades);
		var encabezadoA = [{text: 'Almacén de Artículo Terminado Inicial', style: 'tableHeader', colSpan: 4, alignment: 'center'},{},{},{}];
		var primeraFila = ['Producto', 'Unidades', 'Costo Unitario de Producción','TOTAL'];//encabezado del pdf que se mostrará
		var ultimaFila = ['TOTAL', ''+SumaUnidades+'', ''+SumaCosto+'',''+SumaTotal+''];//ultima fila del pdf, es el total

		return almacenArtTermIni(almacenProducto,encabezadoA,primeraFila,ultimaFila);//arreglo de objetos que se mostrará && encabezado del pdf && filas del total del pdf
  })
  .then(function (almacenArtTermIni) {
		var pdfDoc = printer.createPdfKitDocument(almacenArtTermIni);
		pdfDoc.pipe(fs.createWriteStream('./periodos/almacen_de_articulo_terminado_inicial.pdf'));
		pdfDoc.end();
    res.json({success: true, msg:"Operacion exitosa"});
  })
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 3. Almacén de Materiales Inicial
function almacenMatIni(almacenMateriales, encabezadoA, primeraFilaA){
	var almacenMatIni = {
			content: [
				//PDF 1
					{text: 'Almacén de Materiales Inicial', style: 'header', alignment: 'center'},
							tablaAlmacenMatIni(almacenMateriales,['Material', 'Unidades', 'Costo','Total'],encabezadoA, primeraFilaA)//aqui va el nombre de cada objeto json que se quiere leer
				],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		NameBold: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	}
	};
	return almacenMatIni;
}

function tablaAlmacenMatIni(data, columns, encabezadoA, primeraFilaA) {
		return {
				table: {
					widths: [ 'auto', '*', 'auto', '*' ],
					headerRows: 2,
					alignment: 'center',
						body: construyeTablaAlmacenMatIni(data, columns, encabezadoA, primeraFilaA)
				}
		};
}

function construyeTablaAlmacenMatIni(data, columns, encabezadoA, primeraFilaA){
	var body = [];
	body.push(encabezadoA);
	body.push(primeraFilaA);

	data.forEach(function(row) {
			var dataRow = [];

			columns.forEach(function(column) {
					dataRow.push(row[column].toString());
			})
			//console.log("dataRow:"+dataRow); saca 4 arreglos
			body.push(dataRow);
	});
	return body;
}

router.post('/almacen_mat_ini', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				var almacenArray = req.body;
				var almacenMateriales	= almacenArray.Materiales;//extraemos el arreglo que deseamos enviar al pdf
				var encabezadoA = [{text: 'Almacén de Materiales Inicial', style: 'tableHeader', colSpan: 4, alignment: 'center'},{},{},{}];
				var primeraFilaA = [{text:'Producto',style: 'NameBold'}, 'Unidades', 'Costo Unitario','TOTAL'];//encabezado del pdf que se mostrará
				//{text:'Diferencia',style: 'NameBold'}
				//var ultimaFila = ['', '', '',''];//ultima fila del pdf, es el total
		    return almacenMatIni(almacenMateriales,encabezadoA,primeraFilaA);//arreglo de objetos que se mostrará && encabezado del pdf && filas del total del pdf
	})
	.then(function (almacenMatIni) {
		var pdfDoc = printer.createPdfKitDocument(almacenMatIni);
		pdfDoc.pipe(fs.createWriteStream('./periodos/almacen_de_material_inicial.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 4. Presupuesto Global De Ventas e IVA

function presupuestoGlobalVentas(presupuestoVentas,primeraFila,ultimaFila) {
	var presGlobalVentas = {
		content: [
				{text: 'Presupuesto Global De Ventas e IVA', style: 'header', alignment: 'center'},
						tablaPresupuestoGlobalVentas(presupuestoVentas,['Producto','UnidadesVender','PrecioVenta','VentasPesos','IVA','Importe'], primeraFila, ultimaFila)//aqui va el nombre de cada objeto json que se quiere leer
			],
	styles: {
	  header: {
	    fontSize: 18,
	    bold: true,
	    margin: [0, 0, 0, 10]
	  },
	  subheader: {
	    fontSize: 16,
	    bold: true,
	    margin: [0, 10, 0, 5]
	  },
	  tableExample: {
	    margin: [0, 5, 0, 15]
	  },
	  tableHeader: {
	    bold: true,
	    fontSize: 13,
	    color: 'black'
	  },
		NameBold: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	}
	};
	return presGlobalVentas;
}
function tablaPresupuestoGlobalVentas(data, columns, primeraFila, ultimaFila) {
		return {
				table: {
					widths: [ '*', '*', '*', '*','*', '*' ],
					headerRows: 2,
					alignment: 'center',
						body: construyeTablaPresupuestoGlobalVentas(data, columns, primeraFila, ultimaFila)
				}
		};
}

function construyeTablaPresupuestoGlobalVentas(data, columns, primeraFila, ultimaFila){
	var body = [];

	body.push(primeraFila);

	data.forEach(function(row) {
			var dataRow = [];

			columns.forEach(function(column) {
					dataRow.push(row[column].toString());
			})

			body.push(dataRow);
	});
		body.push(ultimaFila);
	return body;
}

router.post('/pres_global_ventas', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				var presupuestoVentas = req.body.PresupuestoVentas;
				var presupuestoResultados = req.body.PresupuestoResultados;

				var SumaUnidadesVender = presupuestoResultados.SumaUnidadesVender;
				var SumaPrecioVenta = presupuestoResultados.SumaPrecioVenta;
				var SumaVentasPesos = presupuestoResultados.SumaVentasPesos;
				var SumaIVA = presupuestoResultados.SumaIVA;
				var SumaImporte = presupuestoResultados.SumaImporte;
				//var primeraFila = [{text:'Producto', style: 'NameBold'}, {text:'Unidades a Vender', style: 'NameBold'}, {text:'Precio de Venta', style: 'NameBold'},{text:'Ventas en $', style: 'NameBold'}, {text:'IVA (15 %)', style: 'NameBold'},{text:'Importe', style: 'NameBold'}];
				var primeraFila = ['Producto','Unidades a Vender','Precio de Venta','Ventas en $','IVA (15 %)','Importe'];
				var ultimaFila = ['TOTAL', ''+SumaUnidadesVender+'', ''+SumaPrecioVenta+'',''+SumaVentasPesos+'',''+SumaIVA+'', ''+SumaImporte+''];

		    return presupuestoGlobalVentas(presupuestoVentas,primeraFila,ultimaFila);
	})
	.then(function (presGlobalVentas) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalVentas);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_ventas_e_iva.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 5 Presupuesto Global de Producción

function presupuestoGlobalProd(presupuestoProduccionUnidades,encabezadoA,tituloFilaA,primeraFilaA,ultimaFilaA,
	presupuestoProduccionValores,encabezadoB,tituloFilaB,primeraFilaB,segundaFilaB,ultimaFilaB) {
	var presGlobalProd = {
			content: [
				{text: 'Presupuesto Global de Producción', style: 'header', alignment: 'center'},
tablaPresGlobalProdU(presupuestoProduccionUnidades,['Producto','UnidadesVender','InventarioFinal','InventarioInicial','UnidadesProducir'],encabezadoA,tituloFilaA,primeraFilaA,ultimaFilaA),
tablaPresGlobalProdV(presupuestoProduccionValores,['Producto','MateriaPrimaCU','MateriaPrimaCT','CostoTransformacionCU','CostoTransformacionCT','CostoProduccionUnitario','CostoProduccionTotal'],encabezadoB,tituloFilaB,primeraFilaB,segundaFilaB,ultimaFilaB)//aqui va el nombre de cada objeto json que se quiere leer

				],
	styles: {
	  header: {
	    fontSize: 18,
	    bold: true,
	    margin: [0, 0, 0, 10]
	  },
	  subheader: {
	    fontSize: 16,
	    bold: true,
	    margin: [0, 10, 0, 5]
	  },
	  tableExample: {
	    margin: [0, 5, 0, 15]
	  },
	  tableHeader: {
	    bold: true,
	    fontSize: 13,
	    color: 'black'
	  },
		NameBold: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	}
			};
	return presGlobalProd;
}

function tablaPresGlobalProdU(data1, columns1,encabezadoA,tituloFilaA,primeraFilaA,ultimaFilaA) {
		return {
			style: 'tableExample',
			width: 'auto',
				table: {
					widths: [ '*', '*', '*', '*','*'],
					headerRows: 2,
					alignment: 'center',
						body:construyeTablaPresGlobalProdU(data1, columns1,encabezadoA,tituloFilaA,primeraFilaA,ultimaFilaA)
				}
		};
}

function tablaPresGlobalProdV(data2, columns2,encabezadoB,tituloFilaB,primeraFilaB,segundaFilaB,ultimaFilaB) {
		return {
			style: 'tableExample',
			width: 'auto',
		table: {
			widths: [ '*', '*', '*', '*', '*', '*', '*'],
			headerRows: 2,
			alignment: 'center',
				body:construyeTablaPresGlobalProdV(data2, columns2,encabezadoB,tituloFilaB,primeraFilaB,segundaFilaB,ultimaFilaB)
		}
	};
}

function construyeTablaPresGlobalProdU(data, columns,encabezadoA,tituloFilaA,primeraFilaA,ultimaFilaA){

	var body = [];

	body.push(encabezadoA);
	body.push(tituloFilaA);
	body.push(primeraFilaA);

	data.forEach(function(row) {
			var dataRow = [];

			columns.forEach(function(column) {
					dataRow.push(row[column].toString());
			})

			body.push(dataRow);
	});
		body.push(ultimaFilaA);
	return body;
}


function construyeTablaPresGlobalProdV(data, columns,encabezadoB,tituloFilaB,primeraFilaB,segundaFilaB,ultimaFilaB){

	var body = [];

	body.push(encabezadoB);
	body.push(tituloFilaB);
	body.push(primeraFilaB);
	body.push(segundaFilaB);

	data.forEach(function(row) {
			var dataRow = [];

			columns.forEach(function(column) {
					dataRow.push(row[column].toString());
			})

			body.push(dataRow);
	});
		body.push(ultimaFilaB);
	return body;
}


router.post('/pres_global_prod', (req, res, next) => {
  Promise.resolve()
	.then(function () {

				//Unidades
				var presupuestoProduccionUnidades = req.body.PresupuestoProduccionUnidades;
				var totalPresupuestoProduccionUnidades = req.body.TotalPresupuestoProduccionUnidades;
				//Valores
				var presupuestoProduccionValores = req.body.PresupuestoProduccionValores;
				var totalPresupuestoProduccionValores = req.body.TotalPresupuestoProduccionValores;
				//Totales de Unidades
				var TotalUnidadesVender = totalPresupuestoProduccionUnidades.TotalUnidadesVender;
				var TotalInventarioFinal = totalPresupuestoProduccionUnidades.TotalInventarioFinal;
				var TotalInventarioInicial = totalPresupuestoProduccionUnidades.TotalInventarioInicial;
				var TotalUnidadesProducir = totalPresupuestoProduccionUnidades.TotalUnidadesProducir;
				//Totales de Valores
				var totalMateriaPrimaCU = totalPresupuestoProduccionValores.TotalMateriaPrimaCU;
				var totalMateriaPrimaCT = totalPresupuestoProduccionValores.TotalMateriaPrimaCT;
				var totalCostoTransformacionCU = totalPresupuestoProduccionValores.TotalCostoTransformacionCU;
				var totalCostoTransformacionCT = totalPresupuestoProduccionValores.TotalCostoTransformacionCT;
				var totalCostoProduccionUnitario = totalPresupuestoProduccionValores.TotalCostoProduccionUnitario;
				var totalCostoProduccionTotal = totalPresupuestoProduccionValores.TotalCostoProduccionTotal;
				//console.log("TotalUnidadesVender: "+TotalUnidadesVender);
				//console.log("TotalInventarioFinal: "+TotalInventarioFinal);
				//Filas Unidades
				var encabezadoA = [{text: 'Presupuesto Global de Producción', style: 'tableHeader', colSpan: 5, alignment: 'center'},{},{},{},{}];
				var tituloFilaA = [{text: 'UNIDADES', style: 'tableHeader', colSpan: 5, alignment: 'center'},{},{},{},{}];
				var primeraFilaA = ['Producto','Unidades a Vender','Inventario Final','Inventario Inicial','Unidades a Producir'];
				var ultimaFilaA = ['TOTAL', ''+TotalUnidadesVender+'', ''+TotalInventarioFinal+'',''+TotalInventarioInicial+'',''+TotalUnidadesProducir+''];
				//Filas Valores
				var encabezadoB = [{text: 'Presupuesto Global de Producción', style: 'tableHeader', colSpan: 7, alignment: 'center'},{},{},{},{},{},{}];
				var tituloFilaB = [{text: 'VALORES', style: 'tableHeader', colSpan: 7, alignment: 'center'},{},{},{},{},{},{}];
				var primeraFilaB = [{text:'Producto', rowSpan: 2},{text:'Materia Prima', colSpan: 2},{},{text:'Costo de Transformación', colSpan: 2},{},{text:'Costo de Producción Unitario', rowSpan: 2},{text:'Costo de Producción Total', rowSpan: 2}];
				var segundaFilaB =['','Costo Unitario','Costo Total','Costo Unitario','Costo Total','','']
				var ultimaFilaB = ['TOTAL', ''+totalMateriaPrimaCU+'', ''+totalMateriaPrimaCT+'',''+totalCostoTransformacionCU+'',''+totalCostoTransformacionCT+'', ''+totalCostoProduccionUnitario+'', ''+totalCostoProduccionTotal+''];
				//colSpan:2 combina 2 celdas de columnas, la que ocupa y uno hacia la derecha
				//rowSpan:2 combina 2 celdas de filas , la que ocupa y uno hacia abajo
		    return presupuestoGlobalProd(presupuestoProduccionUnidades,encabezadoA,tituloFilaA,primeraFilaA,ultimaFilaA,presupuestoProduccionValores,encabezadoB,tituloFilaB,primeraFilaB,segundaFilaB,ultimaFilaB);
	})
	.then(function (presGlobalProd) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalProd);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_produccion.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 6 Presupuesto Global de Consumo de Materias Primas
function presupuestoGlobalConsumoMP(presGlobalConsumoMP,encabezadoA,primeraFilaA,ultimaFilaA){
	var presGlobalCMP = {
			content: [
					{text: 'Presupuesto Global de Consumo de Materias Primas', style: 'header', alignment: 'center'},
							tablaPresGlobalConsumoMP(presGlobalConsumoMP,['Producto', 'Material', 'CantidadUnitaria','CostoUnitario','UnidadesProducir','Cantidad','Importe'],encabezadoA,primeraFilaA,ultimaFilaA)//aqui va el nombre de cada objeto json que se quiere leer
				],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	}
	};
	return presGlobalCMP;
}

function tablaPresGlobalConsumoMP(data, columns,encabezadoA,primeraFilaA,ultimaFilaA) {
		return {
				table: {
					widths: [ '*', '*', '*', '*', '*', '*', '*'],
					headerRows: 2,
					alignment: 'center',
						body: construyeTablaPresGlobalConsumoMP(data, columns,encabezadoA,primeraFilaA,ultimaFilaA)
				}
		};
}

function construyeTablaPresGlobalConsumoMP(data, columns, encabezadoA, primeraFilaA, ultimaFilaA) {
		var body = [];

		body.push(encabezadoA);
		body.push(primeraFilaA);

		data.forEach(function(row) {
				var dataRow = [];

				columns.forEach(function(column) {
						dataRow.push(row[column].toString());
				})

				body.push(dataRow);
		});
			body.push(ultimaFilaA);
		return body;
}


router.post('/pres_global_consumo_mp', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				//presupuesto
				var presGlobalConsumoMP = req.body.PresupuestoGlobalMP;
				//Totales
				var totalPresupuestoGlobalMP = req.body.TotalPresupuestoGlobalMP

				var totalCantidad = totalPresupuestoGlobalMP.TotalCantidad;
				var totalImporte = totalPresupuestoGlobalMP.TotalImporte;

				var encabezadoA = [{text: 'Presupuesto Global de Consumo de Materias Primas', style: 'tableHeader', colSpan: 7, alignment: 'center'},{},{},{},{},{},{}];
				var primeraFilaA = ['Producto','Material','Cantidad Unitaria','Costo Unitario','Unidades a Producir','Cantidad','Importe'];
				var ultimaFilaA = ['TOTAL', '', '','','',''+totalCantidad+'',''+totalImporte+''];


		    return presupuestoGlobalConsumoMP(presGlobalConsumoMP,encabezadoA,primeraFilaA,ultimaFilaA);
	})
	.then(function (presGlobalCMP) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalCMP);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_materias_primas.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 7. Presupuesto Global de Compras de Materia Primas e IVA
function presupuestoGlobalComprasMP(presGlobalComprasUnidades,encabezadoA,tituloFilaA,primeraFilaA,
																	presGlobalComprasValor,encabezadoB,tituloFilaB,primeraFilaB) {
	var presGlobalCMP = {
			content: [
{text: 'Presupuesto Global de Compras de Materias Primas e IVA', style: 'header', alignment: 'center'},
		tablaPresGlobalComprasMPU(presGlobalComprasUnidades,['Materiales','ConsumoMP','InventarioFinalMP','InventarioInicialMP','UnidadesComprar'],encabezadoA,tituloFilaA,primeraFilaA),
		tablaPresGlobalComprasMPV(presGlobalComprasValor,['Material','CantidadComprar','CostoUnitario','Importe','IVAAcreditable','TotalPagar'],encabezadoB,tituloFilaB,primeraFilaB)

				],
	styles: {
	  header: {
	    fontSize: 18,
	    bold: true,
	    margin: [0, 0, 0, 10]
	  },
	  subheader: {
	    fontSize: 16,
	    bold: true,
	    margin: [0, 10, 0, 5]
	  },
	  tableExample: {
	    margin: [0, 5, 0, 15]
	  },
	  tableHeader: {
	    bold: true,
	    fontSize: 13,
	    color: 'black'
	  },
		NameBold: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	}
			};
	return presGlobalCMP;
}

function tablaPresGlobalComprasMPU(data1, columns1,encabezadoA,tituloFilaA,primeraFilaA) {
		return {
			style: 'tableExample',
			width: 'auto',
				table: {
					widths: [ '*', '*', '*', '*','*'],
					headerRows: 2,
					alignment: 'center',
						body:construyeTablaPresGlobalComprasU(data1, columns1,encabezadoA,tituloFilaA,primeraFilaA)
				}
		};
}

function tablaPresGlobalComprasMPV(data2, columns2,encabezadoB,tituloFilaB,primeraFilaB) {
		return {
			style: 'tableExample',
			width: 'auto',
		table: {
			widths: [ '*', '*', '*', '*', '*', '*'],
			headerRows: 2,
			alignment: 'center',
				body:construyeTablaPresGlobalComprasV(data2, columns2,encabezadoB,tituloFilaB,primeraFilaB)
		}
	};
}

function construyeTablaPresGlobalComprasU(data, columns,encabezadoA,tituloFilaA,primeraFilaA){

	var body = [];

	body.push(encabezadoA);
	body.push(tituloFilaA);
	body.push(primeraFilaA);

	data.forEach(function(row) {
			var dataRow = [];

			columns.forEach(function(column) {
					dataRow.push(row[column].toString());
			})

			body.push(dataRow);
	});

	return body;
}


function construyeTablaPresGlobalComprasV(data, columns,encabezadoB,tituloFilaB,primeraFilaB){

	var body = [];

	body.push(encabezadoB);
	body.push(tituloFilaB);
	body.push(primeraFilaB);

	data.forEach(function(row) {
			var dataRow = [];

			columns.forEach(function(column) {
					dataRow.push(row[column].toString());
			})

			body.push(dataRow);
	});
	return body;
}

router.post('/pres_global_compras_mp', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				//Unidades
				var presGlobalComprasUnidades = req.body.PresGlobalComprasUnidades;
				//Valores
				var presGlobalComprasValor = req.body.PresGlobalComprasValor;

				var encabezadoA = [{text: 'Presupuesto Global de Compras de Materia Primas e IVA', style: 'tableHeader', colSpan: 5, alignment: 'center'},{},{},{},{}];
				var tituloFilaA = [{text: 'EN UNIDADES', style: 'tableHeader', colSpan: 5, alignment: 'center'},{},{},{},{}];
				var primeraFilaA = ['Materiales','Consumo de Materias Primas','Inventario Final de Materias Primas','Inventario Inicial de Materias Primas','Unidades a Comprar'];

				var encabezadoB = [{text: 'Presupuesto Global de Compras de Materia Primas e IVA', style: 'tableHeader', colSpan: 6, alignment: 'center'},{},{},{},{},{}];
				var tituloFilaB = [{text: 'EN VALOR', style: 'tableHeader', colSpan: 6, alignment: 'center'},{},{},{},{},{}];
				var primeraFilaB = ['Material','Cantidad a Comprar','Costo Unitario','Importe','IVA Acreditable','Total a Pagar'];

		    return presupuestoGlobalComprasMP(presGlobalComprasUnidades,encabezadoA,tituloFilaA,primeraFilaA,
																					presGlobalComprasValor,encabezadoB,tituloFilaB,primeraFilaB);
	})
	.then(function (presGlobalCMP) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalCMP);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_compras_de_materias_primas.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 8. Presupuesto Global de Costo de Transformación

function presupuestoGlobalCostoTrans(presGlobalCT,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA) {
	var presGlobalCtoTrans = {

		content: [
				{text: 'Presupuesto Global de Costo de Transformación', style: 'header', alignment: 'center'},
						tablaPresGlobalCtoTrans(presGlobalCT,['Producto','UnidadesProducir','CtoUniTotal','CtoTrans','MenosDepre','MenosNeto','NoIVASYS','NoIVAPrevision','Neto','IVA','TotalPagar'],encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA)
			],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		NameBold: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		tamLetter:{
			fontSize: 8
		}
	}
	};
	return presGlobalCtoTrans;
}

function tablaPresGlobalCtoTrans(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA) {
		return {

				table: {
					widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
					style: 'tamLetter',
          alignment: 'center',
						body: construyeTablaPresGlobalCtoTrans(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA)
				}
		};
}

function construyeTablaPresGlobalCtoTrans(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA){
	var body = [];

	body.push(encabezadoA);
	body.push(primeraFilaA);
	body.push(segundaFilaA);

	data.forEach(function(row) {
//console.log("filas: " +row);
			var dataRow = [];

			columns.forEach(function(column) {
				//	console.log("row[column].toString() "+{text:row[column].toString(), style: 'tamLetter' });
					dataRow.push({text:row[column].toString(), style: 'tamLetter' });
			})
			//console.log("dataRow: " +dataRow);
			body.push(dataRow);
			//console.log(dataRow);
	});
		body.push(ultimaFilaA);
		//console.log(ultimaFilaA);
	return body;
}

router.post('/pres_global_costo_trans', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				//Unidades
				var presGlobalCT = req.body.PresGlobalCT;
				var totalPresGlobalCT = req.body.TotalPresGlobalCT;

				var totalUnidadesProducir = totalPresGlobalCT.TotalUnidadesProducir;
				var ctoTrans = totalPresGlobalCT.CtoTrans;
				var totalMenosDepre = totalPresGlobalCT.TotalMenosDepre;
				var totalMenosNeto = totalPresGlobalCT.TotalMenosNeto;
				var totalNoIVASYS = totalPresGlobalCT.TotalNoIVASYS;
				var totalNoIVAPrevision = totalPresGlobalCT.TotalNoIVAPrevision;
				var totalNeto = totalPresGlobalCT.TotalNeto;
				var totalIVA = totalPresGlobalCT.TotalIVA;
				var totalAPagar = totalPresGlobalCT.TotalAPagar;

				var encabezadoA = [{text: 'Presupuesto Global de Costo de Transformación', style: 'tableHeader', colSpan: 11, alignment: 'center'},{},{},{},{},{},{},{},{},{},{}];
				var primeraFilaA = //[{text:'Producto',style: 'tamLetter', rowSpan:2},{text:'Unidades a Producir', style: 'tamLetter'},{text:'Costo Unitario Total', style: 'tamLetter'},{text:'Costo de Transformación', style: 'tamLetter'},{text:'Menos', colSpan:2, style: 'tamLetter'},{},{text:'Menos partidas que no incluyen IVA', colSpan:2, style: 'tamLetter'},{},'','',''];
				[{text:'Producto', rowSpan:2, style: 'tamLetter'},{text:'Unidades a Producir', rowSpan:2, style: 'tamLetter'},
				{text:'Costo Unitario Total', rowSpan:2, style: 'tamLetter'},{text:'Costo de Transformación', rowSpan:2, style: 'tamLetter'},
				{text:'Menos', colSpan:2, style: 'tamLetter'},{},{text:'Menos partidas que no incluyen IVA', colSpan:2, style: 'tamLetter'},
				{},{text:'Neto', rowSpan:2, style: 'tamLetter'},{text:'IVA', rowSpan:2, style: 'tamLetter'},{text:'Total a Pagar', rowSpan:2, style: 'tamLetter'}];
				var segundaFilaA = [{},{},{},{},{text: 'Depreciaciones', style: 'tamLetter'},{text:'Neto', style: 'tamLetter'},{text:'Sueldos y Salarios', style: 'tamLetter'},{text:'Previsión Social', style: 'tamLetter'},{},{},{}];
				var ultimaFilaA = [{text:'TOTAL', style: 'tamLetter'},{text:''+totalUnidadesProducir+'', style: 'tamLetter'},
				'',{text:''+ctoTrans+'', style: 'tamLetter'},{text:''+totalMenosDepre+'', style: 'tamLetter'},{text:''+totalMenosNeto+'', style: 'tamLetter'},{text:''+totalNoIVASYS+'', style: 'tamLetter'},
				{text:''+totalNoIVAPrevision+'', style: 'tamLetter'},{text:''+totalNeto+'', style: 'tamLetter'},{text:''+totalIVA+'', style: 'tamLetter'},{text:''+totalAPagar+'', style: 'tamLetter'}];

		    return presupuestoGlobalCostoTrans(presGlobalCT,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA);
	})
	.then(function (presGlobalCtoTrans) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalCtoTrans);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_costo_de_transformacion.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 9. Presupuesto Global de Costo de Distribución

function presupuestoGlobalCostoDist(presGlobalCT,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA) {
	var presGlobalCtoDist = {

		content: [
				{text: 'Presupuesto Global de Costo de Distribución', style: 'header', alignment: 'center'},
						tablaPresGlobalCtoDist(presGlobalCT,['Producto','UnidadesVender','CtoUniTotal','CtoDist','MenosDepre','MenosNeto','NoIVASYS','NoIVAPrevision','Neto','IVA','TotalPagar'],encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA)
			],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		NameBold: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		tamLetter:{
			fontSize: 8
		}
	}
	};
	return presGlobalCtoDist;
}

function tablaPresGlobalCtoDist(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA) {
		return {

				table: {
					widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
					style: 'tamLetter',
          alignment: 'center',
						body: construyeTablaPresGlobalCtoDist(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA)
				}
		};
}

function construyeTablaPresGlobalCtoDist(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA){
	var body = [];

	body.push(encabezadoA);
	body.push(primeraFilaA);
	body.push(segundaFilaA);

	data.forEach(function(row) {
//console.log("filas: " +row);
			var dataRow = [];

			columns.forEach(function(column) {
				//	console.log("row[column].toString() "+{text:row[column].toString(), style: 'tamLetter' });
					dataRow.push({text:row[column].toString(), style: 'tamLetter' });
			})
			//console.log("dataRow: " +dataRow);
			body.push(dataRow);
			//console.log(dataRow);
	});
		body.push(ultimaFilaA);
		//console.log(ultimaFilaA);
	return body;
}

router.post('/pres_global_costo_dist', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				//Unidades
				var presGlobalCD = req.body.PresGlobalCD;
				//Totales
				var totalPresGlobalCD = req.body.TotalPresGlobalCD;

				var totalUnidadesVender = totalPresGlobalCD.TotalUnidadesVender;
				var ctoDist = totalPresGlobalCD.CtoDist;
				var totalMenosDepre = totalPresGlobalCD.TotalMenosDepre;
				var totalMenosNeto = totalPresGlobalCD.TotalMenosNeto;
				var totalNoIVASYS = totalPresGlobalCD.TotalNoIVASYS;
				var totalNoIVAPrevision = totalPresGlobalCD.TotalNoIVAPrevision;
				var totalNeto = totalPresGlobalCD.TotalNeto;
				var totalIVA = totalPresGlobalCD.TotalIVA;
				var totalAPagar = totalPresGlobalCD.TotalAPagar;

				var encabezadoA = [{text: 'Presupuesto Global de Costo de Distribución', style: 'tableHeader', colSpan: 11, alignment: 'center'},{},{},{},{},{},{},{},{},{},{}];
				var primeraFilaA = //[{text:'Producto',style: 'tamLetter', rowSpan:2},{text:'Unidades a Producir', style: 'tamLetter'},{text:'Costo Unitario Total', style: 'tamLetter'},{text:'Costo de Transformación', style: 'tamLetter'},{text:'Menos', colSpan:2, style: 'tamLetter'},{},{text:'Menos partidas que no incluyen IVA', colSpan:2, style: 'tamLetter'},{},'','',''];
				[{text:'Producto', rowSpan:2, style: 'tamLetter'},{text:'Unidades a Vender', rowSpan:2, style: 'tamLetter'},
				{text:'Costo Unitario Total', rowSpan:2, style: 'tamLetter'},{text:'Costo de Distribución', rowSpan:2, style: 'tamLetter'},
				{text:'Menos', colSpan:2, style: 'tamLetter'},{},{text:'Menos partidas que no incluyen IVA', colSpan:2, style: 'tamLetter'},
				{},{text:'Neto', rowSpan:2, style: 'tamLetter'},{text:'IVA', rowSpan:2, style: 'tamLetter'},{text:'Total a Pagar', rowSpan:2, style: 'tamLetter'}];
				var segundaFilaA = [{},{},{},{},{text: 'Depreciaciones', style: 'tamLetter'},{text:'Neto', style: 'tamLetter'},{text:'Sueldos y Salarios', style: 'tamLetter'},{text:'Previsión Social', style: 'tamLetter'},{},{},{}];
				var ultimaFilaA = [{text:'TOTAL', style: 'tamLetter'},{text:''+totalUnidadesVender+'', style: 'tamLetter'},
				'',{text:''+ctoDist+'', style: 'tamLetter'},{text:''+totalMenosDepre+'', style: 'tamLetter'},{text:''+totalMenosNeto+'', style: 'tamLetter'},{text:''+totalNoIVASYS+'', style: 'tamLetter'},
				{text:''+totalNoIVAPrevision+'', style: 'tamLetter'},{text:''+totalNeto+'', style: 'tamLetter'},{text:''+totalIVA+'', style: 'tamLetter'},{text:''+totalAPagar+'', style: 'tamLetter'}];

		    return presupuestoGlobalCostoDist(presGlobalCD,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA);
	})
	.then(function (presGlobalCtoDist) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalCtoDist);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_costo_de_distribucion.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 10. Presupuesto Global de Costo de Administración

function presupuestoGlobalCostoAdmin(presGlobalCT,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA) {
	var presGlobalCtoDist = {

		content: [
				{text: 'Presupuesto Global de Costo de Administración', style: 'header', alignment: 'center'},
						tablaPresGlobalCtoAdmin(presGlobalCT,['Producto','UnidadesVender','CtoUniTotal','CtoAdmin','MenosDepre','MenosNeto','NoIVASYS','NoIVAPrevision','Neto','IVA','TotalPagar'],encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA)
			],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		NameBold: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		tamLetter:{
			fontSize: 8
		}
	}
	};
	return presGlobalCtoDist;
}

function tablaPresGlobalCtoAdmin(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA) {
		return {

				table: {

					widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
					style: 'tamLetter',
          alignment: 'center',
						body: construyeTablaPresGlobalCtoAdmin(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA)
				}
		};
}

function construyeTablaPresGlobalCtoAdmin(data,columns,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA){
	var body = [];

	body.push(encabezadoA);
	body.push(primeraFilaA);
	body.push(segundaFilaA);

	data.forEach(function(row) {
console.log("row: " +row);
			var dataRow = [];

			columns.forEach(function(column) {
					console.log("column: "+column);
					dataRow.push({text:row[column].toString(), style: 'tamLetter' });
			})
			console.log("dataRow: " +dataRow);
			body.push(dataRow);
			//console.log(dataRow);
	});
		body.push(ultimaFilaA);
		//console.log(ultimaFilaA);
	return body;
}

router.post('/pres_global_costo_admin', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				//Unidades
				var presGlobalCA = req.body.PresGlobalCA;
				//Totales
				var totalPresGlobalCA = req.body.TotalPresGlobalCA;

				var totalUnidadesVender = totalPresGlobalCA.TotalUnidadesVender;
				var ctoAdmin = totalPresGlobalCA.CtoAdmin;
				var totalMenosDepre = totalPresGlobalCA.TotalMenosDepre;
				var totalMenosNeto = totalPresGlobalCA.TotalMenosNeto;
				var totalNoIVASYS = totalPresGlobalCA.TotalNoIVASYS;
				var totalNoIVAPrevision = totalPresGlobalCA.TotalNoIVAPrevision;
				var totalNeto = totalPresGlobalCA.TotalNeto;
				var totalIVA = totalPresGlobalCA.TotalIVA;
				var totalAPagar = totalPresGlobalCA.TotalAPagar;

				var encabezadoA = [{text: 'Presupuesto Global de Costo de Administración', style: 'tableHeader', colSpan: 11, alignment: 'center'},{},{},{},{},{},{},{},{},{},{}];
				var primeraFilaA = //[{text:'Producto',style: 'tamLetter', rowSpan:2},{text:'Unidades a Producir', style: 'tamLetter'},{text:'Costo Unitario Total', style: 'tamLetter'},{text:'Costo de Transformación', style: 'tamLetter'},{text:'Menos', colSpan:2, style: 'tamLetter'},{},{text:'Menos partidas que no incluyen IVA', colSpan:2, style: 'tamLetter'},{},'','',''];
				[{text:'Producto', rowSpan:2, style: 'tamLetter'},{text:'Unidades a Vender', rowSpan:2, style: 'tamLetter'},
				{text:'Costo Unitario Total', rowSpan:2, style: 'tamLetter'},{text:'Costo de Administración', rowSpan:2, style: 'tamLetter'},
				{text:'Menos', colSpan:2, style: 'tamLetter'},{},{text:'Menos partidas que no incluyen IVA', colSpan:2, style: 'tamLetter'},
				{},{text:'Neto', rowSpan:2, style: 'tamLetter'},{text:'IVA', rowSpan:2, style: 'tamLetter'},{text:'Total a Pagar', rowSpan:2, style: 'tamLetter'}];
				var segundaFilaA = [{},{},{},{},{text: 'Depreciaciones', style: 'tamLetter'},{text:'Neto', style: 'tamLetter'},{text:'Sueldos y Salarios', style: 'tamLetter'},{text:'Previsión Social', style: 'tamLetter'},{},{},{}];
				var ultimaFilaA = [{text:'TOTAL', style: 'tamLetter'},{text:''+totalUnidadesVender+'', style: 'tamLetter'},
				'',{text:''+ctoAdmin+'', style: 'tamLetter'},{text:''+totalMenosDepre+'', style: 'tamLetter'},{text:''+totalMenosNeto+'', style: 'tamLetter'},{text:''+totalNoIVASYS+'', style: 'tamLetter'},
				{text:''+totalNoIVAPrevision+'', style: 'tamLetter'},{text:''+totalNeto+'', style: 'tamLetter'},{text:''+totalIVA+'', style: 'tamLetter'},{text:''+totalAPagar+'', style: 'tamLetter'}];

		    return presupuestoGlobalCostoAdmin(presGlobalCA,encabezadoA,primeraFilaA,segundaFilaA,ultimaFilaA);
	})
	.then(function (presGlobalCtoAdmin) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalCtoAdmin);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_costo_de_administración.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 11. Presupuesto Global de Otros Gastos
function presupuestoGlobalOtrosGas(presGlobalOG,encabezadoA,primeraFilaA,ultimaFilaA){
	var presGlobalOtrosGas = {
			content: [
					{text: 'Presupuesto Global de Otros Gastos', style: 'header', alignment: 'center'},
							tablaPresGlobalOtrosGas(presGlobalOG,['Producto', 'DesProducto', 'DesMercado', 'PartMercado', 'Total'],encabezadoA,primeraFilaA,ultimaFilaA)
				],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	}
	};
	return presGlobalOtrosGas;
}

function tablaPresGlobalOtrosGas(data, columns, encabezadoA, primeraFilaA, ultimaFilaA) {
		return {
				table: {
					widths: [ '*', '*', '*', '*', '*' ],
					alignment: 'center',
						body: construyeTablaPresGlobalOtrosGas(data, columns, encabezadoA, primeraFilaA, ultimaFilaA)
				}
		};
}

function construyeTablaPresGlobalOtrosGas(data, columns, encabezadoA, primeraFilaA, ultimaFilaA) {
		var body = [];

		body.push(encabezadoA);
		body.push(primeraFilaA);

		data.forEach(function(row) {
				var dataRow = [];

				columns.forEach(function(column) {
						dataRow.push(row[column].toString());
				})

				body.push(dataRow);
		});
		body.push(ultimaFilaA);
		return body;
}

router.post('/pres_global_otros_gas', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				//Unidades
				var presGlobalOG = req.body.PresGlobalOG;

				//Totales
				var totalPresGlobalOG = req.body.TotalPresGlobalOG;

				var totalDesProducto = totalPresGlobalOG.TotalDesProducto;
				var totalDesMercado = totalPresGlobalOG.TotalDesMercado;
				var partMercado = totalPresGlobalOG.PartMercado;
				var sumaTotal = totalPresGlobalOG.SumaTotal;

				var encabezadoA = [{text: 'Presupuesto Global de Otros Gastos', style: 'tableHeader', colSpan: 5, alignment: 'center'},{},{},{},{}];
				var primeraFilaA = ['Producto','Desarrollo de Producto','Desarrollo de Mercado','Participación de Mercado','Total'];
				var ultimaFilaA = ['TOTAL', ''+totalDesProducto+'', ''+totalDesMercado+'',''+partMercado+'',''+sumaTotal+''];

		    return presupuestoGlobalOtrosGas(presGlobalOG,encabezadoA,primeraFilaA,ultimaFilaA);
	})
	.then(function (presGlobalOtrosGas) {
		var pdfDoc = printer.createPdfKitDocument(presGlobalOtrosGas);
		pdfDoc.pipe(fs.createWriteStream('./periodos/presupuesto_global_de_otros_gastos.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});

//PDF 12. Costo de Producción y Ventas

function costoProduccionVentas(ctoProdVentas,encabezadoA,primeraFilaA,ultimaFilaA){
	var costoProdVentas = {
			content: [
					{text: 'Presupuesto Global de Otros Gastos', style: 'header', alignment: 'center'},
							tablaCtoProdVentas(ctoProdVentas,['Producto','IIMP', 'Compras', 'IFMP', 'MPConsumida', 'ManoObraGastosProd', 'CtoProd', 'IIProdTer', 'IFProdTer', 'CtoVentas'],encabezadoA,primeraFilaA,ultimaFilaA)
				],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		},
		tamLetter:{
			fontSize: 8
		}
	}
	};
	return costoProdVentas;
}

function tablaCtoProdVentas(data, columns, encabezadoA, primeraFilaA, ultimaFilaA) {
		return {
				table: {
					widths: [ '*', '*', '*', '*', '*', '*', '*', '*', '*', '*' ],
					alignment: 'center',
						body: construyeTablaCtoProdVentas(data, columns, encabezadoA, primeraFilaA, ultimaFilaA)
				}
		};
}

function construyeTablaCtoProdVentas(data, columns, encabezadoA, primeraFilaA, ultimaFilaA) {
		var body = [];

		body.push(encabezadoA);
		body.push(primeraFilaA);

		data.forEach(function(row) {
				var dataRow = [];

				columns.forEach(function(column) {
						dataRow.push({text:row[column].toString(), style: 'tamLetter' });
				})

				body.push(dataRow);
		});
		body.push(ultimaFilaA);
		return body;
}

router.post('/costo_prod_ventas', (req, res, next) => {
  Promise.resolve()
	.then(function () {
				//Unidades
				var ctoProdVentas = req.body.CtoProdVentas;
				//Totales
				var totalCtoProdVentas = req.body.TotalCtoProdVentas;

				var totalIIMP = totalCtoProdVentas.TotalIIMP;
				var totalCompras = totalCtoProdVentas.TotalCompras;
				var totalIFMP = totalCtoProdVentas.TotalIFMP;
				var totalMPConsumida = totalCtoProdVentas.TotalMPConsumida;
				var totalManoObraGastosProd = totalCtoProdVentas.TotalManoObraGastosProd;
				var totalCtoProd = totalCtoProdVentas.TotalCtoProd;
				var totalIIProdTer = totalCtoProdVentas.TotalIIProdTer;
				var totalIFProdTer = totalCtoProdVentas.TotalIFProdTer;
				var totalCtoVentas = totalCtoProdVentas.TotalCtoVentas;

				var encabezadoA = [{text: 'Costo de Producción y Ventas', style: 'tableHeader', colSpan: 10, alignment: 'center'},{},{},{},{},{},{},{},{},{}];
				var primeraFilaA = [{text:'Producto', style: 'tamLetter'},{text:'I.I de Materia Prima', style: 'tamLetter'},
				{text:'Compras', style: 'tamLetter'},{text:'I.F de Materia Prima', style: 'tamLetter'},
				{text:'Materia Prima Consumida', style: 'tamLetter'},
				{text:'Mano de Obra y gastos indirectos de producción', style: 'tamLetter'},
				{text:'Costo de Producción', style: 'tamLetter'},{text:'I.I de Producto Terminado', style: 'tamLetter'},
				{text:'I.F de Producto Terminado', style: 'tamLetter'},{text:'Costo de Ventas', style: 'tamLetter'}];
				var ultimaFilaA = [{text:'TOTAL', style: 'tamLetter'}, {text:''+totalIIMP+'', style: 'tamLetter'},
				{text:''+totalCompras+'', style: 'tamLetter'},{text:''+totalIFMP+'', style: 'tamLetter'},
				{text:''+totalMPConsumida+'', style: 'tamLetter'},{text:''+totalManoObraGastosProd+'', style: 'tamLetter'},
				{text:''+totalCtoProd+'', style: 'tamLetter'}, {text:''+totalIIProdTer+'', style: 'tamLetter'},
				{text:''+totalIFProdTer+'', style: 'tamLetter'},{text:''+totalCtoVentas+'', style: 'tamLetter'}];

		    return costoProduccionVentas(ctoProdVentas,encabezadoA,primeraFilaA,ultimaFilaA);
	})
	.then(function (costoProdVentas) {
		var pdfDoc = printer.createPdfKitDocument(costoProdVentas);
		pdfDoc.pipe(fs.createWriteStream('./periodos/costo_de_produccion_y_ventas.pdf'));
		pdfDoc.end();
		res.json({success: true, msg:"Operacion exitosa"});
	})
    .catch(function (err) {
      console.error("got error: " + err);
      if (err instanceof Error) {
        res.status(400).send("Error general");
        console.log(err);
      } else {
        res.status(200).json({ "code": 1000, "message": err });
      }
    });
});



module.exports = router;
