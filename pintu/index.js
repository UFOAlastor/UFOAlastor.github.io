var pic1=document.getElementById("pic1")
var pic2=document.getElementById("pic2")
var pic3=document.getElementById("pic3")
var pic4=document.getElementById("pic4")
var bg = document.getElementById("bg-img")
a=["images/1.JPG","images/2.JPG","images/3.JPG","images/4.JPG"]
x=["images/11.jpg","images/21.jpg","images/31.jpg","images/41.jpg"]
y=["images/12.jpg","images/22.jpg","images/32.jpg","images/42.jpg"]
z=["images/13.jpg","images/23.jpg","images/33.jpg","images/43.jpg"]
k=["images/14.jpg","images/24.jpg","images/34.jpg","images/44.jpg"]
i=0;
j=1;
l=2;
m=3;
pic1.onclick = function(){
    i+=1
    pic1.src=x[parseInt(i%4)]
}
pic2.onclick = function(){
    j+=1
    pic2.src=y[parseInt(j%4)]
}
pic3.onclick = function(){
    l+=1
    pic3.src=z[parseInt(l%4)]
}
pic4.onclick = function(){
    m+=1
    pic4.src=k[parseInt(m%4)]
}
window.setInterval(function(){
  if((i%4==j%4)&&(j%4==l%4)&&(l%4==m%4)){
      pic1.onclick=null;
      pic2.onclick=null;
      pic3.onclick=null;
      pic4.onclick=null;
  }
},10)
