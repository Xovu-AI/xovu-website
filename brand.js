/* XOVU brand drawing: XO dot mark, lockup and theme toggle. Colors come from CSS (currentColor and --cell). */
(function(){
  var $=function(s){return document.querySelector(s)};
  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var P=8.9,R=3.5,X0=10,Y0=32.2;
  var f2=function(n){return Math.round(n*100)/100};
  var DX=function(c){return f2(X0+c*P)},DY=function(r){return f2(Y0+r*P)};
  var XG=['10001','01010','00100','01010','10001'],OG=['0110','1001','1001','1001','0110'];
  var CELLS=[];
  XG.forEach(function(row,r){row.split('').forEach(function(b,i){CELLS.push({c:i,r:r,on:b==='1'})})});
  OG.forEach(function(row,r){row.split('').forEach(function(b,i){CELLS.push({c:6+i,r:r,on:b==='1'})})});
  function svg(vb,inner){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+vb+'" aria-hidden="true">'+inner+'</svg>'}

  function dots(state,withCells,fill){
    if(RM)state='idle';
    var s='',E='.45 0 .55 1',F=fill||'currentColor';
    if(withCells)CELLS.forEach(function(d){if(!d.on)s+='<circle cx="'+DX(d.c)+'" cy="'+DY(d.r)+'" r="'+R+'" style="fill:var(--cell)"/>'});
    CELLS.filter(function(d){return d.on}).forEach(function(d){
      var cx=DX(d.c),cy=DY(d.r),b;
      if(state==='thinking'){b=f2(d.c*.1+d.r*.025-1.4);
        s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+F+'"><animate attributeName="opacity" values="1;.16;1" keyTimes="0;.5;1" calcMode="spline" keySplines="'+E+';'+E+'" dur="1.4s" begin="'+b+'s" repeatCount="indefinite"/><animate attributeName="r" values="'+R+';2.4;'+R+'" keyTimes="0;.5;1" calcMode="spline" keySplines="'+E+';'+E+'" dur="1.4s" begin="'+b+'s" repeatCount="indefinite"/></circle>'}
      else if(state==='done'){b=f2(.05+d.c*.045+d.r*.01);
        s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+F+'"><animate attributeName="r" values="'+R+';4.9;'+R+';'+R+'" keyTimes="0;.07;.16;1" dur="2.6s" begin="'+b+'s" repeatCount="indefinite"/></circle>'}
      else if(state==='attention'&&d.c===2&&d.r===2){
        s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="'+F+'" stroke-width="1.1"><animate attributeName="r" values="'+R+';12" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="1.6s" repeatCount="indefinite"/></circle><circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+F+'"><animate attributeName="r" values="'+R+';4.4;'+R+'" keyTimes="0;.3;1" dur="1.6s" repeatCount="indefinite"/></circle>'}
      else s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+F+'"/>';
    });
    return s;
  }

  var FONT={X:['10001','10001','01010','00100','01010','10001','10001'],O:['01110','10001','10001','10001','10001','10001','01110'],V:['10001','10001','10001','10001','01010','01010','00100'],U:['10001','10001','10001','10001','10001','10001','01110']};
  function dotText(str,p,r){
    p=p||6;r=r||2.5;var col=0,max=0,s='';
    str.split('').forEach(function(ch){var g=FONT[ch];if(!g){col+=3;return}
      g.forEach(function(row,y){row.split('').forEach(function(b,x){if(b==='1'){s+='<circle cx="'+f2(r+(col+x)*p)+'" cy="'+f2(r+y*p)+'" r="'+r+'"/>';if(col+x>max)max=col+x}})});col+=6});
    return {inner:'<g fill="currentColor">'+s+'</g>',w:f2(max*p+2*r),h:f2(6*p+2*r)};
  }
  function lockup(){
    var ts=56,gap=16,s=f2(P*.86*ts/100/6),t=dotText('XOVU'),wh=f2(t.h*s),ww=f2(t.w*s);
    return svg('0 0 '+f2(ts+gap+ww)+' '+ts,
      '<g transform="scale('+f2(ts/100)+')"><rect width="100" height="100" rx="22.5" fill="currentColor"/><g transform="translate(50 50) scale(.86) translate(-50 -50)">'+dots('idle',false,'var(--bg)').replace(/fill="var\(--bg\)"/g,'style="fill:var(--bg)"')+'</g></g>'+
      '<g transform="translate('+(ts+gap)+' '+f2((ts-wh)/2)+') scale('+s+')">'+t.inner+'</g>');
  }

  document.querySelectorAll('.logo').forEach(function(el){el.innerHTML=lockup()});

  var mark=$('#mark'),state='idle',held=false,timer=null;
  function draw(){if(mark)mark.innerHTML=svg('0 18 100 64',dots(state,true))}
  function show(st){if(st===state)return;state=st;draw()}
  function ambient(){clearInterval(timer);var seq=['idle','thinking','idle','attention','idle','done'],i=0;show(seq[0]);
    timer=setInterval(function(){if(!held){i=(i+1)%seq.length;show(seq[i])}},2800)}
  if(mark){draw();ambient()}
  window.XOMark={show:function(st){held=true;show(st)},release:function(){held=false}};

  /* theme: follows the device until the visitor picks one */
  var root=document.documentElement,btn=$('#toggle'),label=$('#toggleLabel');
  var mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
  function current(){return root.dataset.theme||(mq&&mq.matches?'dark':'light')}
  function sync(){if(!btn)return;var d=current()==='dark';btn.setAttribute('aria-pressed',d?'true':'false');
    btn.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');if(label)label.textContent=d?'Light':'Dark'}
  if(btn){btn.addEventListener('click',function(){root.dataset.theme=current()==='dark'?'light':'dark';sync()});
    if(mq&&mq.addEventListener)mq.addEventListener('change',sync);sync()}
})();
