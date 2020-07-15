
var data;
var curentid;
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


      let h2 = data.project[i].h2;
      let h3 = data.project[i].h3;
      let thumb = data.project[i].thumb;
      let alt = data.project[i].alt;
      let title = data.project[i].title;
      let p1 = data.project[i].p1;
      let p2 = data.project[i].p2;
      let p3 = data.project[i].p3;

      let projects = `<article class="brick" id="${i}">
       
        <img class="brick-img center" src=" ${thumb}" alt="${alt}" title="${title}" loading="lazy" >
          <section class="txtwrap">
              <h3>${h3}</h3>
              <p>${p1}</p>
          </section>
        
      </article>`;

  

      cw.innerHTML += projects;





    }
  });


    document.querySelector('body').addEventListener('click', function(e) {
      // event.target is the clicked item
      if (!e.target) { return; }
    
      // Check if the event.target is a remove button
      if (e.target.matches('.brick')) {
        
        curentid=e.target.id;
        asideContent(e.target.id)

        if( modalstate == 0 ){
          modalstate = 1;
           gsap.to(".modal", {duration: 0.8, xPercent: '-100',ease: "elastic.out(1, 2)"});
        }else{
          modalstate = 0;
          gsap.to(".modal", {duration: 0.8, xPercent: '100',ease: "elastic.In(1, 2)"});
        }

      }
    });





gsap.set('.modal-content', { xPercent: '100' });

}

function asideContent(projectid){
  
  let adata=data.project[projectid]


  let ah2 = adata.h2;
  let ah3 = adata.h3;
  let athumb = adata.thumb;
  let aalt = adata.alt;
  let atitle = adata.title;
  let ap1 = adata.p1;
  let ap2 = adata.p2;
  let ap3 = adata.p3;

  
  
  console.log(modalslides[curentid])
 //gsap.set(, { visibility:"visible" });
 gsap.fromTo(modalslides[curentid],0.8,{ xPercent: -100 },{ xPercent: 0 ,ease: "elastic.out(1, 2)"});
}


asidenav.addEventListener('click', function(e) {
  // event.target is the clicked item
  if (!e.target) { return; }





    if (e.target.matches('.prev')) {
      gsap.to(modalslides[curentid], {duration: 0.8, xPercent: 100,ease: "elastic.out(1, 2)"});
      
      if (curentid === 0) {
        curentid = modalslides.length - 1;
      } else {
        curentid--;
      }

      gsap.fromTo(modalslides[curentid],0.8,{ xPercent: -100 },{ xPercent: 0 ,ease: "elastic.out(1, 2)"});
    }

    if (e.target.matches('.next')) {
     gsap.to(modalslides[curentid], {duration: 0.8, xPercent: -100,ease: "elastic.out(1, 2)"});
      if (curentid < modalslides.length - 1) {
        curentid++;
      } else {
        curentid = 0;
      }
      gsap.fromTo(modalslides[curentid],0.8,{ xPercent: 100 },{ xPercent: 0 ,ease: "elastic.out(1, 2)"});
    }
 

});


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showtime);
} else {

  showtime();

}