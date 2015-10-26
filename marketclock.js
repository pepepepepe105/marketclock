jQuery(function($){
 var getDevice = (function(){
  var ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
   return 'sp';
  } else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
   return 'tab';
  } else {
   return 'other';
  }
 })();
 console.log('getDevice: ' + getDevice);

 $('head').append('<style type="text/css">#container { display: none; } #fade, #loader { display: block; }</style>');
 jQuery.event.add(window, 'load', function(){
  var pageH = $('#container').height();
  $('#fade').css('height', pageH).delay(900).fadeOut(800);
  $('#loader').delay(600).fadeOut(300);
  $('#container').css('display', 'block');
 });

 $('#parallax.parallax_00').remove();

 $('#main_slider').wrap('<div id="main_slider_wrap"></div>');

 $('.tempNews #baseMenu').remove();
 $('.tempNews #shopMenu').remove();
 $('.tempNews #parallax').remove();
 $('.tempNews #fb-root').remove();
 $('.tempNews #mainHeader').remove();
 $('.tempNews #main_navigation').remove();
 $('.tempNews #category_navigation').remove();
 $('.tempNews .blog_head_image').remove();
 $('.tempNews .blog_contents').remove();
 $('.tempNews .blog_body').remove();
 $('.tempNews .paginate-wrp').remove();
 $('.tempNews #mainFooter').remove();

 $('.tempNews .blog_title').each(function(){
  var blogTitle = $(this).find('a').text();
  $(this).find('h2').html(blogTitle);
 });

 $('img.label_image').parents('li.product_list').addClass('labeled');

 var $setElm = $('#products ul.item_lists .product_list .meta_container .detail');
 var cutFigure = '18';
 var afterTxt = '&#8230;';
 $setElm.each(function(){
  var textLength = $(this).text().length;
  var textTrim = $(this).text().substr(0, (cutFigure))
  if(cutFigure < textLength){
   $(this).html(textTrim + afterTxt).css('visibility', 'visible');
  } else if(cutFigure >= textLength){
   $(this).css('visibility', 'visible');
  }
 });

 $('#baseMenu li').on({
  'mouseenter': function(){
  var hoverMenu = $(this).attr('class');
   $(this).find('img').attr('src', 'http://www.fushigiyaonline.com/marketclock/img/' + hoverMenu + '_on.png');
  },
  'mouseleave': function(){
  var hoverMenu = $(this).attr('class');
   $(this).find('img').attr('src', '/img/shop/' + hoverMenu + '.png');
  }
 });

 $('#shopMenu p').on('click', function(){
  $('#shopMenu p').toggleClass('disnon');
  $('#shopMenu #sub_navigation').slideToggle();
 });

 $('#sub_navigation a').on('click', function(){
  setTimeout(function(){
   hashRevise();
  }, 1);
 });

 $('.image_liquid_box').imgLiquid(); 

 $('#main_slider').owlCarousel({
  navigation: false, // Show next and prev buttons
  navigationText: ['prev','next'],
  slideSpeed: 300,
  paginationSpeed: 400,
  singleItem: true,
  // "singleItem:true" is a shortcut for:
  // items: 1, 
  // itemsDesktop: false,
  // itemsDesktopSmall: false,
  // itemsTablet: false,
  // itemsMobile: false
  autoPlay: 5000,
  stopOnHover: true,
  lazyLoad: true,
  mouseDrag: false,
  touchDrag: false,
  transitionStyle: 'fadeUp'
 });
/*
 $('#main_slider').owlCarousel({
  nav: false,
  center: true,
  items: 1,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  responsive: {
   768: {
    items: 2
   }
  }
 });
*/

 $(window).scroll(function(e){
  parallax();
 });
 function parallax(){
  var scrolled = $(window).scrollTop();
  $('#parallax').css('top',0-(scrolled*0.2)+'px');
 };

 $(window).resize(function() {
  tempNewsLayout();
 });
 function tempNewsLayout(){
  $('.tempNews .main #about .blog_inner').each(function(){
   var brotherHeight = $(this).find('.blog_title').height() + 10;
   $(this).find('.blog_publish').css('margin-top', '-' + brotherHeight + 'px');
   $(this).find('.publish_date').css({
    'height': brotherHeight + 'px',
    'line-height':  brotherHeight + 'px'
   });
  });
 };

 $(window).on('load', function(){
  tempNewsLayout();
  masonryLayout();
  hashRevise();
 });
 function masonryLayout(){
  var $container = $('.item_lists');
  $container.imagesLoaded(function(){
   setTimeout(function(){
    $('#products ul.item_lists li.product_list a div.item_meta').each(function(){
     var parentHeight = $(this).parents('li.product_list').height();
     $(this).css('height', parentHeight + 'px');
    });
    $('#products ul.item_lists li.product_list a div.soldout_meta').each(function(){
     var parentHeight = $(this).parents('li.product_list').height();
     $(this).css('height', parentHeight + 'px');
    });

    $container.stop().animate({
     opacity: 1.0
    }, 500);
    if(screen.width >= 768){
     $container.masonry({
      columnWidth: 192,
      itemSelector: '.product_list',
      isFitWidth: true
     });
    } else {
     $container.masonry({
      itemSelector: '.product_list',
      isFitWidth: true
     });
    }
   }, 500);
  });
 };
 function hashRevise(){
  var urlHash = location.hash;
  console.log('urlHash: ' + urlHash);
  if(urlHash == '#category_navigation'){
   var st = $(window).scrollTop();
   var sh = $('#shopMenu').height();
   var targetY = st - sh;
   console.log('st: ' + st + '  sh: ' + sh + '  targetY: ' + targetY);
   $(window).scrollTop(targetY);
  }
 };

 if(getDevice == 'sp' || getDevice == 'tab'){
  $(window).on('orientationchange resize', function(){
   location.reload();
  });
 }
});
