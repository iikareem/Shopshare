
//let showform = document.querySelector('.search-form');
//document.querySelector('#search-btn').onclick=()=>{
 //   showform.classList.toggle('active');
//}
document.getElementById("search-btn").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("search-box").parentNode.classList.toggle("show");
  });

function validateForm() {
    let x = document.forms["contactform"]["namrform"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
    }

    function ValidateEmail() {
        let x = document.forms["contactform"]["emailform"].value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test())
        {
            alert("You have entered an valid email address!")
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)

        }
    



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}







