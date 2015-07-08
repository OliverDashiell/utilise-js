define(
	['jquery', 
	 'notifyjs'],
	function($){

		// ---- Build Notifyjs Class ---- //

		var notify = {};
		var notify_html = 
			"<div class='text-wrapper'>" +
				"<div class='title' data-notify-html='title'/>" +
				"<div class='text' data-notify-html='text'/>" +
			"</div>";

    	$.notify.addStyle("error", {
		    html:
		        "<div>" + 
		        	"<div class='icon-wrapper'>" +
		        		"<i class='fa fa-times-circle fa-2x fa-fw'></i>" + 
		        	"</div>" +
		            notify_html +
		        "</div>",
		    classes: {
		        error: {
		            "background-color": "#FD999B",
		            "border": "1px solid #D34144"
		        }
		    }
		});

  		$.notify.addStyle("success", {
		    html:
		        "<div>" + 
		        	"<div class='icon-wrapper'>" +
		        		"<i class='fa fa-check-circle fa-2x fa-fw'></i>" + 
		        	"</div>" +
		            notify_html +
		        "</div>",
		    classes: {
		        success: {
		            "background-color": "#ABE78B",
		            "border": "1px solid #66B939"
		        }
		    }
		});

		$.notify.addStyle("info", {
		    html:
		        "<div>" + 
		        	"<div class='icon-wrapper'>" +
		        		"<i class='fa fa-info-circle fa-2x fa-fw'></i>" + 
		        	"</div>" +
		            notify_html +
		        "</div>",
		    classes: {
		        info: {
		            "background-color": "#789CBE",
		            "border": "1px solid #315F8A"
		        }
		    }
		});

		$.notify.addStyle("warning", {
		    html:
		        "<div>" + 
		        	"<div class='icon-wrapper'>" +
		        		"<i class='fa fa-warning fa-2x fa-fw'></i>" + 
		        	"</div>" +
		            notify_html +
		        "</div>",
		    classes: {
		        warning: {
		            "background-color": "#FFC181",
		            "border": "1px solid #FF9324"
		        }
		    }
		});

		$.notify.addStyle("debug", {
		    html:
				"<div>" + 
					"<div class='icon-wrapper'>" +
						"<i class='fa fa-question-circle fa-2x fa-fw'></i>" + 
		        	"</div>" +
		            notify_html +
		        "</div>",
		    classes: {
		        debug: {
		        	"background-color": "#AA78C1",
		            "border": "1px solid #70308E"
		        }
		    }
		});

  		// ---- Notifyjs trigger notifications ---- //

		notify.notify = function(title, message, type, duration, position){
			/*
		     * display an info message
		     * types: info, success, warning, error, debug
		     */
			if(type==='warning'){
				$.notify(
					{
						title: title || 'Warning',
						text: message
					},
					{
						className: 'warning',
			    		style: 'warning',
			        	autoHideDelay:  duration || 5000,
		        		globalPosition: position || 'top right'
			    	}
			    );
			} else if (type==='error'){
				$.notify(
					{
						title: title || 'Error',
						text: message
					},
					{
						className: 'error',
			    		style: 'error',
			        	autoHideDelay:  duration || 5000,
		        		globalPosition: position || 'top right'
			    	}
			    );
			} else if (type==='success'){
				$.notify(
					{
						title: title || 'Success',
						text: message
					},
					{
						className: 'success',
			    		style: 'success',
			        	autoHideDelay:  duration || 5000,
		        		globalPosition: position || 'top left'
			    	}
			    );
			}  else if (type==='debug'){
				// will only activate debug warnings if global debug is active
				if(window.debug === true){
					$.notify(
						{
							title: title || 'Debug',
							text: message
						},
						{
							className: 'debug',
				    		style: 'debug',
				        	autoHideDelay:  duration || 5000,
		        			globalPosition: position || 'bottom right'
				    	}
				    );
				}
			} else {
				$.notify(
					{
						title: title || 'Info',
						text: message
					},
					{
						className: 'info',
			    		style: 'info',
			        	autoHideDelay:  duration || 5000,
		        		globalPosition: position || 'top left'
			    	}
			    );
			}
		};


		// ---- Notifyjs trigger shortcuts ---- //

		notify.success = function(message, duration){
			$.notify(
				{
					title: 'Success',
					text: message
				},
				{
		    		className: 'success',
		    		style: 'success',
		        	autoHideDelay:  duration || 5000,
	        		globalPosition: 'top left'
		    	}
		    );
		}

		notify.error = function(message){
			$.notify(
				{
					title: 'Error',
					text: message
				},
				{
		    		className: 'error',
		    		style: 'error',
		        	autoHide:  false
		    	}
		    );
		}

		notify.warning = function(message){
			$.notify(
				{
					title: 'Warning',
					text: message
				},
				{
		    		className: 'warning',
		    		style: 'warning',
		        	autoHideDelay: 8000
		    	}
		    );
		}

		notify.info = function(message){
			$.notify(
				{
					title: 'Info',
					text: message
				},
				{
		    		className: 'info',
		    		style: 'info',
		        	autoHideDelay: 8000,
		        	globalPosition: 'top left'
		    	}
		    );
		}

		notify.debug = function(message){
			// will only activate debug warnings if global debug is active
			if(window.debug === true){
				$.notify(
					{
						title: 'Debug',
						text: message
					},
					{
			    		className: 'debug',
			    		style: 'debug',
		        		autoHide:  false,
	        			globalPosition: 'bottom right'
			    	}
			    );
			}
		}

		return notify;

	}
);