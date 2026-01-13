//  This script is designated from the hamburger menu for responsive design
function myFunction() {
    // Local Variable
    var x = document.getElementById('myNav');
    
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}