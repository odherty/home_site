function random_gradient() {
    
    let color1 = Math.random().toString(16).slice(2,8);
    let color2 = Math.random().toString(16).slice(2,8);
    let angle = Math.round( Math.random() * 360 );
    
    let gradient = "linear-gradient(" + angle + "deg, #" + color1 + ", #" + color2 + ")";
    
    console.log(gradient);
    $("body").css("background", gradient);
    console.log($("#main")[0].style);
    
  }
  
$( document ).ready(function() {
    random_gradient();
});