const bookElement=document.getElementById("book");
const pageCounter=document.getElementById("pageCounter");
const previousButton=document.getElementById("previousPage");
const nextButton=document.getElementById("nextPage");
const pageFlip=new St.PageFlip(bookElement,{width:480,height:620,size:"stretch",minWidth:280,maxWidth:960,minHeight:360,maxHeight:640,drawShadow:true,flippingTime:950,usePortrait:false,startPage:0,autoSize:true,maxShadowOpacity:.35,showCover:true,mobileScrollSupport:false,clickEventForward:true,useMouseEvents:true});
pageFlip.loadFromHTML(document.querySelectorAll("#book .page"));
function updateControls(){const current=pageFlip.getCurrentPageIndex();const total=pageFlip.getPageCount();if(current===0)pageCounter.textContent="Portada";else if(current>=total-1)pageCounter.textContent="Final del álbum";else pageCounter.textContent=`Páginas ${current}–${Math.min(current+1,total-1)} de ${total-1}`;previousButton.disabled=current===0;nextButton.disabled=current>=total-1;}
pageFlip.on("flip",updateControls);pageFlip.on("init",updateControls);
previousButton.addEventListener("click",()=>pageFlip.flipPrev());
nextButton.addEventListener("click",()=>pageFlip.flipNext());
