define(["jquery",
        "knockout",
        "datatables",
        "tabletools",
        "datatable-resize"],function(jQuery,ko){

	ko.bindingHandlers.dataTable = {
        init: function(element, valueAccessor){
            var binding = ko.utils.unwrapObservable(valueAccessor());
            
            // If the binding is an object with an options field,
            // initialise the dataTable with those options. 
            if(binding.options){
            	if(binding.options.selected_row !== undefined){
            		binding.options.rowCallback = function( row, data ) {
                    	$(row).data('row-data',data);
                    };
            	}
                var oTable = jQuery(element).dataTable(binding.options);
                if(binding.options.selected_row !== undefined){
                	jQuery(element).delegate("tbody tr","click", function(e){
                		jQuery(element).find("tr").removeClass("selected");
                		jQuery(e.currentTarget).addClass("selected");
                		var data = jQuery(e.currentTarget).data('row-data');
                        binding.options.selected_row(data);
                	});
                }
                // init tabletools
                var oTools = new jQuery.fn.dataTable.TableTools( oTable, {
                    "sSwfPath": "static/bower_components/datatables-tabletools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        {
                            "sExtends": "copy",
                            "sButtonText": 'Copy <i class="fa fa-clipboard fa-fw"></i>'
                        },
                        {
                            "sExtends": "csv",
                            "sButtonText": 'CSV <i class="fa fa-file-text-o fa-fw"></i>',
                            "sFileName": "CasaConnect - *.csv"
                        },
                        {
                            "sExtends": "xls",
                            "sButtonText": 'Excel <i class="fa fa-file-excel-o fa-fw"></i>',
                            "sFileName": "CasaConnect - *.xls"
                        },
                        {
                            "sExtends": "pdf",
                            "sButtonText": 'PDF <i class="fa fa-file-pdf-o fa-fw"></i>',
                            "sPdfOrientation": "landscape",
                            "sFileName": "CasaConnect - *.pdf",
                            "sTitle": "CasaConnect: Export",
                            "sPdfMessage": "This is a pdf export of CasaConnect data.",
                            "sPdfSize": "A3"
                        }
                    ]
                } );
                
                // add tabletools to dom
                $( '#export-buttons' ).empty();
                $( oTools.fnContainer() ).appendTo('#export-buttons');
            }
        },
        update: function(element, valueAccessor){
            var binding = ko.utils.unwrapObservable(valueAccessor());
            
            // If the binding isn't an object, turn it into one. 
            if(!binding.data){
            	return;
                binding = { data: valueAccessor() }
            }
            
            // Clear table
            jQuery(element).dataTable().fnClearTable();
            
            // Rebuild table from data source specified in binding
            jQuery(element).dataTable().fnAddData(binding.data);
        }
    };

});