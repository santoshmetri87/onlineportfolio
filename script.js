// Get all top bar options
var topBarOptions = document.querySelectorAll(".top-bar a");

// Add click event listener to each option
topBarOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        // First, remove 'active' class from all options
        topBarOptions.forEach(function(opt) {
            opt.classList.remove("active");
        });

        // Then, add the 'active' class to the clicked option
        this.classList.add("active");
    });
});


function toggleSection(id){
    var sections = document.querySelectorAll(".section")
    var recommendation = document.getElementById("#recommendations")
    sections.forEach(function(sec){
        if(sec.getAttribute("id")!=="recommendations")
            sec.style.display="none"
    })
    document.getElementById(id).style.display="flex"
}


console.log("Click next being called")
var clickNextButton = document.querySelectorAll("#click-next-button")
clickNextButton.forEach(function(button){
    button.addEventListener("click", function(){
        var topBarElements = document.querySelectorAll('.list-group-item')        
        for (let i = 0; i <= topBarElements.length - 2; i++) {
            if(topBarElements[i].classList.contains('active')){
                this.classList.remove("active");
                var elementReq = topBarElements[i+1 > (topBarElements.length - 2) ? 0 : (i+1)]
                elementReq.classList.add("active")
                elementReq.click()
                return
            }
        }
    })

})
