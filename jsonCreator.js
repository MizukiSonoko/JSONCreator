

$(document).ready(function(){
	$("#jsonTextArea").each(function(){
		$(this).bind('keyup', creator(this));
	});


 	$(document).on("keyup","#value",change(this));

	var res = $('.resultArea');
	var json = null;

	function hasChild(obj){
		return obj instanceof Object;
	}

	function printKeyValue( indent, key, value){
	  str = '<div class="first">　　</div>';
		for(i=0;i<indent;i++){
			 str += '<div class="dummy">　　</div>';
		}
		res.append( str + '<div class="key">'+key+'</div><input type="text" class="value" id="value" value="'+value+'" >');
	}

	function printIndex(indent,obj){
	  str = '<div class="first">　　</div>';
		for(i=0;i<indent;i++){
			 str += '<div class="dummy">　　</div>';
		}
		res.append( str + '<div class="value" >'+obj+'</div>');
	}

	function print(indent,obj){
	  str = '<div class="first">　　</div>';
		for(i=0;i<indent;i++){
			 str += '<div class="dummy">　　</div>';
		}
		res.append( str + '<input type="text" class="value" value="'+obj+'">');
	}

	function execution( indent, obj){
		if( obj instanceof Array){
			$.each(obj,function(p, val){
				if(hasChild(val)){
					printIndex(indent, p);
					execution(indent+1, val);			
				}else{
					print(indent+1,val);
				}
			});
		}	else if(obj instanceof Object){
			for( key in obj){
				if(hasChild(obj[key])){
					print(indent, key);
					execution(indent+1,obj[key]);
				}else{
					printKeyValue(indent, key, obj[key]);
				}
			}
		} else{
			print(indent, obj);
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
					execution( 0, json);
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
			console.log("=======");
			console.log($(this).val());	
		}
	}

});

