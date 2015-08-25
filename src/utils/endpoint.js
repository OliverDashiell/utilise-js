define(
    ['jquery',
	 'knockout', 
	 './notify'],
    function($, ko, notify){

    	var endpoint = {};
        var url_root = '/casaremote/v2/api/';

        var handle_success = function(callback, surpress, response) {
            // console.log(response);

            // notify of warnings
            if(!surpress) {
                if(response.message) {
                    notify.warning("Warning: "+response.message);
                }
            }

            callback(response.result);
        }
        var handle_error = function(callback, surpress, jqXHR, textStatus, errorThrown){
            // console.log(jqXHR);

            // decode response
            var response = $.parseJSON(jqXHR.responseText);
            
            if(!surpress) {
                // capitalise text status
                textStatus = textStatus.charAt(0).toUpperCase() + textStatus.slice(1);
            
                // display server error or default
                if(response && response.error) {
                    notify.error(textStatus+": "+response.error);
                }
                else {
                    notify.error(textStatus+": "+errorThrown);
                }

                // display warnings
                if(response && response.message) {
                    notify.warning("Warning: "+response.message);
                }
            }

            // prepare callback args
            var result, message, error = null;
            if(response) {
                // set arguments
                if(response.result)  result  = response.result;
                if(response.message) message = response.message;
                if(response.error)   error   = response.error;
            }

            // execute callback
            callback(result,message,error);
        }

       // ---- DATA CALLS ---- // 

        endpoint.get = function(endpoint, data, callback, surpress) {
            // default surpression state
            if (typeof(surpress)==='undefined') surpress = false;

            $.ajax({
                url: url_root+endpoint,
                context: this,
                data: data,
                success: handle_success.bind(this,callback,surpress)
            }).error(handle_error.bind(this,callback,surpress));
        };

        endpoint.post = function(endpoint, data, callback, surpress) {
            // default surpression state
            if (typeof(surpress)==='undefined') surpress = false;

            // --- Firefox Support on POST --- //
            // Must not use content type of application/json with ajax request
            // Must send data as url-encoded field
            $.ajax({
                url: url_root+endpoint,
                contentType: 'application/json',
                method: 'POST',
                dataType: 'json',
                context: this,
                data: ko.toJSON(data),
                processData: false,
                success: handle_success.bind(this,callback,surpress)
            }).error(handle_error.bind(this,callback,surpress));
        };

        endpoint.put = function(endpoint, data, callback, surpress) {
            // default surpression state
            if (typeof(surpress)==='undefined') surpress = false;

            $.ajax({
                url: url_root+endpoint,
                contentType: 'application/json',
                method: 'PUT',
                dataType: 'json',
                context: this,
                data: ko.toJSON(data),
                processData: false,
                success: handle_success.bind(this,callback,surpress)
            }).error(handle_error.bind(this,callback,surpress));
        };

        endpoint.trash = function(endpoint, data, callback, surpress) {
            // default surpression state
            if (typeof(surpress)==='undefined') surpress = false;

            $.ajax({
                url: url_root+endpoint,
                contentType: 'application/json',
                method: 'DELETE',
                dataType: 'json',
                context: this,
                data: ko.toJSON(data),
                processData: false,
                success: handle_success.bind(this,callback,surpress)
            }).error(handle_error.bind(this,callback,surpress));
        };

        endpoint.custom_call = function(url, method, data, callback, surpress) {
            // default surpression state
            if (typeof(surpress)==='undefined') surpress = false;
            
            var content_type = 'application/json';
            var process = true;
            if(method = 'GET'){
                content_type = 'application/x-www-form-urlencoded; charset=UTF-8';
                process = false;
            }

            $.ajax({
                url: url,
                contentType: content_type,
                method: method,
                dataType: 'json',
                context: this,
                data: ko.toJSON(data),
                processData: process,
                success: handle_success.bind(this,callback,surpress)
            }).error(handle_error.bind(this,callback,surpress));
        }

		return endpoint;
	}
);