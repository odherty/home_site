        $(document).ready(function () {
			$('.accordion .term').click(function () {
				
				//Hide all dropdown panels.
				/*if (.is(':hidden')) {
					//Hide all dropdown panels.
					$('.accordion p').slideUp('fast');
				}
				
				var acc_text = $(this).next('p');
			   //Toggle the paragraph below the term that was clicked.
			   $(this).next('p').slideToggle('fast');*/
			   
			  // var acc_text = $(this).next('p');
				 var parent = $(this).parent();
			     var acc_text = $(".accordion_text",parent);
				 var arrow = $("img:first", parent);
			     var upImg = '/abacus/images/arrow.png';
				 var downImg = '/abacus/images/arrow1.png';

			   
			   
				 if (acc_text.is(':hidden')) {
				
					//Hide all dropdown panels.
					arrow.attr('src', downImg);
					acc_text.slideDown();
				} else {
					
						arrow.attr('src',upImg );
					acc_text.slideUp();
				
				}
			   
			   
			   
            });
        });
