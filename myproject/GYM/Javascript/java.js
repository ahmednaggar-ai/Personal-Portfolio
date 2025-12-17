(function(){
    $('.para').parallaxie({
        speed: 0.5,
    });
// parallaxie JQuery Efffect code
    $(window).scroll(function(){
        $(".navbar").toggleClass('scrolled',$(this).scrollTop()>50);
    })
    $(window).scroll(function(){
        $("#nav-bar").toggleClass('scrolled',$(this).scrollTop()>50);
    })
// nice scroll navbar code
$('.fullBackground').fullClip({
    images: ['images/slide2.jpg', 'images/slide1.jpg'],
    transitionTime: 1000,
    wait: 7000,
    static: false
});
    let bgImage = [
        "Images/slide1.jpg",
        "Images/slide2.jpg"
    ];
    let i=0;
    $("#next").click(function()
    {
        i++;
        if(i>bgImage.length-1)
        {
            i=0;
        }
        $("#carousel-slider").css("backgroundImage","url("+bgImage[i]+")");
    })
    $("#prev").click(function()
    {
        i--;
        if(i<0)
        {
            i=bgImage.length-1;
        }
        $("#carousel-slider").css("backgroundImage","url("+bgImage[i]+")");
    })
    // carousel slider javascript Code
    var owl = $('.owl-carousel');
owl.owlCarousel({
    items:3,
    loop:true,
    margin:30,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true
});
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[1000])
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
})
// end of owl slider jquery code
$("#scrollIcon").click(function(){
    $("html,body").animate({scrollTop: "0"},1000);
})
// end of scrollIcon jquery code
let counter1 =0;
let counter2 =0;
let counter3 =0;
let counter4 =0;
function incCounter1()
{
    counter1++;
    if(counter1 >= 781)
    {
        clearInterval(counter1cont);
    }
    
    document.getElementById("shirt").innerHTML=counter1;
}
function incCounter2(){
    counter2++;
    if(counter2 >=161)
    {
        clearInterval(counter2cont)
    }
    document.getElementById("phone").innerHTML=counter2;
}
function incCounter3(){
    counter3++;
    if(counter3 >=1751)
    {
        clearInterval(counter3cont)
    }
    document.getElementById("light").innerHTML=counter3;
}
function incCounter4()
{
    counter4++;
    if(counter4 >= 781)
    {
        clearInterval(counter4cont);
    }
    
    document.getElementById("shirt1").innerHTML=counter4;
}

let x = $("#counteroffset").offset().top;
    $(window).scroll(function(){
        let wScroll = $(window).scrollTop();
        if(wScroll > x){
            let counter1cont = setInterval(incCounter1,14.5);
            let counter2cont = setInterval(incCounter2,60);
            let counter3cont = setInterval(incCounter3,6);
            let counter4cont = setInterval(incCounter4,14.5);
        }
    })
}())
