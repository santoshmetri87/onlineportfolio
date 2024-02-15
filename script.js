// Get all top bar options
var topBarOptions = document.querySelectorAll(".top-bar a");

// Summary is selected by default
topBarOptions[0].classList.add("active");

// Add click event listener to each option
topBarOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        // First, remove 'active' class from all options
        topBarOptions.forEach(function(opt) {
            opt.classList.remove("active");
            if(this.style.display === "none") {
                this.style.display = "block";
            } else {
                this.style.display = "none";
            }
        });

        // Then, add the 'active' class to the clicked option
        this.classList.add("active");

        //enable the respective card
        if(this.style.display === "none") {
            this.style.display = "block";
        } else {
            this.style.display = "none";
        }
    });
});


function toggleSection(id){
    var sections = document.querySelectorAll(".section")
    sections.forEach(function(sec){
        sec.style.display="none"
    })
    document.getElementById(id).style.display="flex"
}
