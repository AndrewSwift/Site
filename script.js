//------------------------------------------------------- config

	aspect = 3/2;		// width and height of main page
	ref_height = 1000;	// reference height of design

//------------------------------------------------------- global variables
// need x offset, y offset and scale

	win_w = $(window).width();
	win_h = $(window).height();

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

throw new Error("offset_y="+offset_y);

//------------------------------------------------------- old global variables


	// to see if window changes size, we need to keep
	// a record of its size at all times
	realw = $(window).width();
	realh = $(window).height();

	// if the screen is too narrow, we use an artificial height
	// and put black bars above and below

	if (realw/realh>aspect){ // screen is too wide
		workw = Math.round(realh*aspect);
		workh = realh;
		extrax = Math.round((realw-workw)/2);
		extray = 0;
	}
	else{ // screen is too narrow
		workw = realw;
		workh = Math.round(workw/1.5);
		extray = Math.round((realh-workh)/2);
		extrax = 0;
	}

	conversion = workh/1000;


//------------------------------------------------------- startup

	cinema(realw,realh,workh);
	dessiner(realw,workh);

	fontsize = Math.round(100*conversion);
	$('body').css('font','normal '+fontsize+'px/'+fontsize+'px Abel');

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

