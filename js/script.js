var flg = true;
window.onload = function() {
  setInterval(chgPaletsColor,1000);
}
document.onkeydown = function() {
  if (flg) {
    flg = false;
  }else{
    flg = true;
  }
}
document.touchmove = function() {
  if (flg) {
    flg = false;
  }else{
    flg = true;
  }
}
document.getElementById("palet1").addEventListener("click",clipColorcode,false);
document.getElementById("palet2").addEventListener("click",clipColorcode,false);
document.getElementById("palet3").addEventListener("click",clipColorcode,false);
document.getElementById("palet4").addEventListener("click",clipColorcode,false);

function chgPaletsColor() {
  if(flg) {
    var elements = document.getElementsByClassName("palet");
    for(var i=elements.length; i--;) {
      var element = elements[i] ;
      rgb = getRandColor();
      element.style.backgroundColor = rgb;
      element.title = rgb;
    }
  }
}

function getRandColor() {
  //0xは16進数を表す
  var rgb = ( Math.floor(Math.random() * 0xffffff)).toString(16);//16進数に変換
  for ( i = 6 - rgb.length; i > 0 ; i-- ) {
    rgb = "0" + rgb;//足りない桁をうめて６桁（文字）にする
  }
  return "#" + rgb;
}

function clipColorcode(event) {
  var eventStyle = event.target.style;
  var bgColor = eventStyle.backgroundColor;
  var rgb = bgColor.replace("rgb(","").replace(")","").split(",");
  for(var i = 0; i < rgb.length; i++) {
  	// 数値変換して16進数変換
  	rgb[i] = parseInt(rgb[i]).toString(16);
  	//
  	if(rgb[i].length < 2) {
      rgb[i] = "0" + rgb[i];
    }
  }
  hexRGB = "#" + rgb.join("");
  var result = copy2clipbord(hexRGB);
  if (!result) {
  	alert("このブラウザは対応していません。");
  }
}

function copy2clipbord(string){
// https://qiita.com/simiraaaa/items/2e7478d72f365aa48356
  
  var temp = document.createElement('div');
  temp.appendChild(document.createElement('pre')).textContent = string;
  
  var s = temp.style;
  s.position = 'fixed';
  s.left = '-100%';
  
  document.body.appendChild(temp);
  document.getSelection().selectAllChildren(temp);
  var result = document.execCommand('copy');
  
  document.body.removeChild(temp);
  // true なら実行できている falseなら失敗か対応していないか
  return result;
}