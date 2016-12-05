/*
	movie-list by dannibla
	movielist.github.io | @dannibla
	Free for personal and commercial use under the MIT License Copyright (c) 2016 (movielist.github.io/license)
*/

			var jsonURL = 'assets/json/movie-json.asp';
			var imgList = '';
			var Full_data='';
			var sorted_Data = [];

			// get data from json file
			$.getJSON(jsonURL, function (json) {
				Full_data=json;
				 dataload(json)
			});
			
			//hide the div
			$('#search-input').hide()
			// append data to the html page
			function dataload(json){	
					imgList='';
					$('#Image-Body').empty();
					$.each(json, function (index, value)
					{
						imgList += '<div class="col-md-2 portfolio-item animated bounceInDown movie-list"><a data-toggle="modal" data-target="#myModal" href="' + value.movie_url.replace(/ /g, '%20') + '"><img class="img-responsive" src="'+ value.movie_image.replace(/ /g, '%20') +'" alt=""></a></div>'	
					});			
					$('#Image-Body').append(imgList);			
				}

			$(document).ready(function () {
				// hide a tag in modal
					 $('#myModal a').attr('class','Modal_a');
					 
				// empty the modal window
				$('body').on('hidden.bs.modal', '.modal', function () {
					$(this).removeData('bs.modal');
				});	


			// separate the category	
			$('.movie-category').click(function(){
				sorted_Data=[];
				var original_arry=[];
				var item;
				var check_category=$(this).text();
				if(check_category != 'All Movies')
					{
							$.each(Full_data,function(index, value) {
								original_arry=value.movie_category.split(",");
														
									for(var j=0;j<original_arry.length;j++)
									{
										if(check_category === original_arry[j])
										{	
											item={}
											item['movie_url']=value.movie_url;
											item['movie_name']=value.movie_name;
											item['movie_image']=value.movie_image;									
											sorted_Data.push(item);
										}
									}																
							});
						dataload(sorted_Data);	
					}	
					else{
						dataload(Full_data);
					}				
			});
			
			// search focus $ blur function
				$('#searching').click(function(){
					$('#search-input').show();
					$('#searchMovies').focus();
					$('#search-icon').hide();
				});
					
				$('#searchMovies').blur(function(){
					$('#search-input').hide();
					$('#search-icon').show();
				});
			
			// search data functionality
			$('#searchMovies').keyup(function(){
				
				var localvariable=$(this).val().toLowerCase();			
				var temp_finals_data;
				var temp_sorted_Data=[];
				
				if(sorted_Data != ""){
						temp_finals_data=sorted_Data;
					}
					else{
						temp_finals_data=Full_data;
					}
				if(localvariable != ""){
					$.each(temp_finals_data,function(index, value)
					{						
						var temp_movie_name=value.movie_name.toLowerCase();
						var temp_year=value.movie_year;
						if((temp_movie_name.indexOf(localvariable) > -1) || (temp_year.indexOf(localvariable) > -1))
						{
							item={}
							item['movie_url']=value.movie_url;
							item['movie_name']=value.movie_name;
							item['movie_image']=value.movie_image;
							temp_sorted_Data.push(item);
						}																							
					});
					dataload(temp_sorted_Data);										
				}
				else{
					dataload(temp_finals_data);
				}				
			});
		});
		
		
		