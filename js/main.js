
var data;
var curentid=0;
let cw = document.querySelector('.content-wrap');
let modal = document.querySelector('.modal');

let modalslide=document.querySelector('.modal-slide');
let modalslides=document.querySelectorAll('.modal-content');
let asidenav=document.querySelector('.asidenav')
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');



let modalstate = 0;
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


window.addEventListener('resize', () => {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function showtime() {

  function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {

      if (rawFile.readyState === 4 && rawFile.status == "200") {

        callback(rawFile.responseText);

      }

    }
    rawFile.send(null);
  }


  readTextFile("../projects.json", function (text) {
    
    data = JSON.parse(text);

    for (i = 0; i < data.project.length; i++) {


   
      let h3 = data.project[i].h3;
      let thumb = data.project[i].thumb;
      let alt = data.project[i].alt;
      let title = data.project[i].title;
      let p1 = data.project[i].p1;
     

      let projects = `<article class="brick" id="${i}">
       
        <img class="brick-img center" src=" ${thumb}" alt="${alt}" title="${title}" loading="lazy" >
          <section class="txtwrap">
              <h3>${h3}</h3>
              <p>${p1}</p>
          </section>
        
      </article>`;

  

      cw.innerHTML += projects;



//let  date   = data.project[i].Date;
// <!--  <p>Date: ${date}<br>-->
let  client = data.project[i].Client;
let  role   = data.project[i].Role;
let  uRL    = data.project[i].URL;
let  uRLtxt = data.project[i].URLtxt;
let  h2     = data.project[i].h2;
let  ptxt   = data.project[i].ptxt;
let  images = data.project[i].images;
let  alts   = data.project[i].alts;
let  titles = data.project[i].titles;
let  fcaps  = data.project[i].fcaps;
let  iframe  = data.project[i].iframe;
let  motion  = data.project[i].motion;

//======================================================================================//
let modalslidecontent=`<section class="modal-content">
<article>
    <aside class="info">
            <p>Client: ${client}<br>
            Role: ${role}<br>
            URL: <a href="${uRL}" target="_blank">${uRLtxt}</a>
        </p>
    </aside>
    <h2>${h2}</h2>
    <p>${ptxt}</p>
    <figure class="figure fadein">`
    
    if(images.length>0){
      console.log(images+'--'+images.length)
    for (let i = 0; i < images.length; i++) { 
      modalslidecontent=modalslidecontent+`<img class="center" src="${images[i]}" alt="${alts[i]}" title="${titles[i]}" loading="lazy" onload="className='fadein'" width="100%" height="auto">
       <figcaption>${fcaps[i]}</figcaption>`
    } 
  }

  if(iframe.length>0){
    for (let i = 0; i < iframe.length; i++) { 
      modalslidecontent=modalslidecontent+`<div class="icontainer"><iframe class='responsive-iframe' src="${iframe}"></div>"
       <figcaption>${fcaps[i]}</figcaption>`
    } 
  }

  if(motion.length>0){
    for (let i = 0; i < motion.length; i++) { 
      modalslidecontent=modalslidecontent+`<video width="850" controls>
      <source src="${motion}" type="video/mp4">
      Your browser does not support HTML video.
    </video>
       <figcaption>${fcaps[i]}</figcaption>`
    } 
  }

modalslidecontent=modalslidecontent+`</figure></article></section>`
modalslide.innerHTML += modalslidecontent;;
//======================================================================================//

modalslides=document.querySelectorAll('.modal-content');

  if(modalslides.length==data.project.length){
    gsap.set('.modal-content', { xPercent: '-100' });
  }
 


    }
  });



  document.querySelector('.close').addEventListener('click', function(e) {
    gsap.to(".modal", {duration: 0.8, xPercent: '100',ease: "elastic.In(1, 2)"});
    modalstate = 0;
  })


    document.querySelector('body').addEventListener('click', function(e) {
      // event.target is the clicked item
      if (!e.target) { return; }
    
      // Check if the event.target is a remove button
      if (e.target.matches('.brick')) {
        
       // curentid=e.target.id;
    
        if( modalstate == 0 ){
           modalstate = 1;
           asidenavgoto(e.target.id)
    
           gsap.to(".modal", {duration: 0.8, xPercent: '-100',ease: "elastic.out(1, 2)"});
          
        }else{

          asidenavgoto(e.target.id)
        }
        
        /*else{
          modalstate = 0;
          gsap.to(".modal", {duration: 0.8, xPercent: '100',ease: "elastic.In(1, 2)"});
        }
        */
      }
    });







}




window.addEventListener('click', function(e) {
  // event.target is the clicked item
  //if (!e.target) { return; }

console.log("whaaaat")

    if (e.target.matches('.prev')) {
      


      gsap.to(modalslides[curentid], {duration: 0.8, xPercent: 100,ease: "elastic.out(1, 2)"});
      
      if (curentid === 0) {
        curentid = modalslides.length - 1;
      } else {
        curentid--;
      }

      let curmf=modalslides[curentid].querySelectorAll('figure');
      gsap.set(curmf, { visibility: "visible" });

      gsap.fromTo(modalslides[curentid],0.8,{ xPercent: -100 },{ xPercent: 0 ,ease: "elastic.out(1, 2)"});
    }

    if (e.target.matches('.next')) {

    
      gsap.to(modalslides[curentid], {duration: 0.8, xPercent: -100,ease: "elastic.out(1, 2)"});
      if (curentid < modalslides.length - 1) {
        curentid++;
      } else {
        curentid = 0;
      }
      let curmf=modalslides[curentid].querySelectorAll('figure');
      gsap.set(curmf, { visibility: "visible" });

      gsap.fromTo(modalslides[curentid],0.8,{ xPercent: 100 },{ xPercent: 0 ,ease: "elastic.out(1, 2)"});
    }
 

});





  function asidenavgoto(brickid){

    let curmf=modalslides[brickid].querySelectorAll('figure');
    gsap.set(curmf, { visibility: "visible" });
    modalslides[curentid].scrollTop=0;
      gsap.to(modalslides[curentid], {duration: 0.8, xPercent: -100,ease: "elastic.out(1, 2)"});
     
      curentid=brickid; 

      gsap.fromTo(modalslides[curentid],0.8,{ xPercent: 100 },{ xPercent: 0 ,ease: "elastic.out(1, 2)"});

  }









if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showtime);
} else {

  showtime();

}




