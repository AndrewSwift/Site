//------------------------------------------------------- config

	var aspect = 3/2;		// width and height of main page
	var ref_height = 1000;	// reference height of design

	var content_x = 410;	// left edge of main content box

//------------------------------------------------------- global variables
// need x offset, y offset and scale

	var win_w = $(window).width();
	var win_h = $(window).height();

	var scale = 0;
	var offset_x = 0;
	var offset_y = 0;

	if (win_w/win_h > aspect){ // screen is too wide
		offset_y= 0;
		scale = win_h / ref_height;

		offset_x = Math.round((win_w - (scale * aspect * ref_height)) / 2);
	}
	else{ // screen is too narrow
		offset_x = 0;
		scale = win_w / (ref_height * aspect);

		offset_y = Math.round((win_h - (scale * ref_height)) / 2);
	}

//------------------------------------------------------- fix font size
// all other font sizes are a percentage of this one, NOT of their parent containers

	$('body').css('font-size',scale*1.9+'em');

//------------------------------------------------------- startup

	// fix background size
	stylestr = 	'left:0'												+'px;'+
				'top:'		+ offset_y									+'px;'+
				'width:'	+ win_w										+'px;'+
				'height:'	+ Math.round(ref_height * scale)			+'px;';

	$('#background').attr('style', stylestr);
	
	// draw black bars top & bottom if page too narrow
	cinema(offset_y, ref_height, scale);

	// place main box with all non-scrolling content
	stylestr = 	'left:'		+ offset_x									+'px;'+
				'top:'		+ offset_y									+'px;'+
				'width:'	+ Math.round(ref_height * aspect * scale)	+'px;'+
				'height:'	+ Math.round(ref_height * scale)			+'px;';

	$('#placement').attr('style', stylestr);

throw new Error('script.js: '+Math.round(ref_height * scale));

	// draw main scrolling content
	content(offset_x + (content_x * scale), ref_height * scale);

	fontsize = math.round(100*conversion);
	$('body').css('font','normal '+fontsize+'px/'+fontsize+'px abel');

	dimlogo   = ['#logo',  'width' ,350,'right',1500-380,'top',374];

	dimombreg = ['#ombreg','height',667,'right',1500-410,'top',250 ];
	dimombred = ['#ombred','height',667,'left' ,1410    ,'top',250 ];

	dimombreh = ['#ombreh','width',1700,'left',-100,     'top' ,440];
	dimombreb = ['#ombreb','width',1700,'left',-100,     'top' ,780];

	dimmenu    = ['#menu   ','width',170,'right',1500-380,'top',525];
	dimcontact = ['#contact','height',25,'right',1500-380,'top',815];

	desslogo(dimlogo);
	desslogo(dimombreg);
	desslogo(dimombred);
	desslogo(dimombreh);
	desslogo(dimombreb);
	desslogo(dimmenu);
	desslogo(dimcontact);

//------------------------------------------------------- clicks on logo & accueil

	$(document).ready(function() {
		// if you click on welcome image it scrolls a little
		$("#accueil").click(function(event){
		    $('html, body').animate({scrollTop:workh/5}, 300);
		});

		// if you click on logo it goes back to home page
		$("#logo").click(function(event){
			window.location = '/';
		});
	});

//------------------------------------------------------- fin

