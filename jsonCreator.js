

$(document).ready(function(){
	$("#jsonTextArea").each(function(){
		$(this).bind('keyup', creator(this));
	});


 	$(document).on("keyup",".value",change(this));

  $(document).on("click","input:button",function(){	
		console.log($(this).attr("id"));	
	});

	var res = $('.resultArea');
	var json = null;

	function hasChild(obj){
		return obj instanceof Object;
	}

	function printKeyValue( indent, key, value, route){
	  str = '<div class="first">　　</div>';
		for(i=0;i<indent;i++){
			 str += '<div class="dummy">　　</div>';
		}
		res.append( str + '<div class="key">'+key+'</div><input type="text" class="value" id="'+route+'" value="'+value+'" >');
	}

	function printIndex(indent,obj){
	  str = '<div class="first">　　</div>';
		for(i=0;i<indent;i++){
			 str += '<div class="dummy">　　</div>';
		}
		res.append( str + '<div class="value" >'+obj+'</div>');
	}

	function print(indent,obj, route){
	  str = '<div class="first">　　</div>';
		for(i=0;i<indent;i++){
			 str += '<div class="dummy">　　</div>';
		}
		res.append( str + '<input type="text" class="value" id="'+route+'" value="'+obj+'">');
	}

	function appendButton(indent, key, route){
	  str = '<div class="first">　　</div>';
		for(i=0;i<indent;i++){
			 str += '<div class="dummy">　　</div>';
		}
		res.append( str + '<div class="key">'+key+'</div><input type="button" class="btn" value="Add" id="'+route+'" >');
	}

	
	function execution( indent, obj, route){
		if( obj instanceof Array){
			$.each(obj,function(p, val){
				if(hasChild(val)){
					console.log(route);
					printIndex(indent, p);
					execution(indent+1, val, route+"["+p+"]");			
				}else{
					printKeyValue(indent,p,val, route+"["+p+"]");
				}
			});
			appendButton( indent, obj.length, route+"["+obj.length+"]");
		}	else if(obj instanceof Object){
			for( key in obj){
				if(hasChild(obj[key])){
					printIndex(indent, key);
					execution(indent+1,obj[key], route+"."+key);
				}else{
					printKeyValue(indent, key, obj[key], route+"."+key);
				}
			}
			appendButton( indent, "key", route+".");
		} else{
			print(indent, obj, route);
		}
	}

	function creator(area){
		var txt, old = area.value;
		return function(){
				str = $(this).val();
				if(str != old){
					old = str;
					$('.dummy').remove();
					$('.value').remove();
					$('.key').remove();
					$('.first').remove();
					$('.btn').remove();

					try{
						json = JSON.parse(str);
					}catch(e){
						$('#status').empty();
						$('#status').append('<div class="alert alert-danger" role="alert"><strong>パースエラー!</strong>形式に間違いがあります!</div>');
						return;
					}
					
					$('#status').remove();

					execution( 0, json, "root");
					addCss($('.btn'));
					addCss($('.dummy'));
					$('.value').css({
						float: "left", 
						width: "200px",
					});
					addCss($('.key'));
					$('.first').css({
						"margin-left": 0,
						clear: "left"
					});
				}
		}
	}

	function transform(obj, path, val){
        path = path || '';
        obj  = obj || {};
        
				var keys = path.split('.');
        var value = obj;

				if( keys[0] === ""){
					keys.shift();	
				}

				path = [];
				for (var i = 0; i < keys.length; i++) {

					// List
					if(keys[i].match(/^.+\[\d+\]$/)){
						name = keys[i].split("[")[0];
						pos =	keys[i].match(/.+\[(\d+)\]/)[1];
						path.push(name);
						path.push(pos);
						if( i !== keys.length - 1){
							value = value[name][pos];
						}
						
					// Dict
					} else {
						path.push(keys[i]);
						if( i !== keys.length - 1){
							value = value[keys[i]];
						}
					}
        }

				for(var i = 0; i < path.length-1; i++){
					obj = obj[path[i]];
				}
				obj[path[path.length-1]] = val;
	}

	function addCss(obj) {
		obj.css({
			float: "left", 
			width: "75px",
		});
	}

	function change(input){
		return function(){
			transform(json, $(this).attr('id').substr(0), $(this).val());
			$("#jsonTextArea").val(JSON.stringify(json, null, "    "));
		}
	}

});

