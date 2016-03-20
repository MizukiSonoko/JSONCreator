

$(document).ready(function(){
	$("#jsonTextArea").each(function(){
		$(this).bind('keyup', creator(this));
	});


 	$(document).on("keyup",".value",change(this));

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

	function execution( indent, obj, route){
		if( obj instanceof Array){
			$.each(obj,function(p, val){
				if(hasChild(val)){
					printIndex(indent, p);
					execution(indent+1, val, route+"["+p+"]");			
				}else{
					print(indent+1,val, route);
				}
			});
		}	else if(obj instanceof Object){
			for( key in obj){
				if(hasChild(obj[key])){
					printIndex(indent, key);
					execution(indent+1,obj[key], route+"."+key);
				}else{
					printKeyValue(indent, key, obj[key], route+"."+key);
				}
			}
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

					try{
						json = JSON.parse(str);
					}catch(e){
						return;
					}

					execution( 0, json, "");
					$('.dummy').css({
    				float: "left", 
    				width: "75px",
					});
					$('.value').css({
						float: "left", 
    				width: "75px",
					});
					$('.key').css({
						float: "left", 
    				width: "75px",
					});
					$('.first').css({
						"margin-left": 0,
						clear: "left"
					});
				}
		}
	}

	function change(input){
		return function(){
			console.log($(this).attr('id'));
			console.log(json);
			eval("json"+$(this).attr('id') +' = "'+$(this).val()+'"');
			$("#jsonTextArea").val(JSON.stringify(json, null, "    "));
		}
	}

});

