$(function() {
  $("ul").hide(); 

  $(".open-close-handle").click(function(data) {
    var className = "." + data.target.dataset.role;
    $(className).toggle();
    if (this.innerHTML === "[ + ]") {
      $(this).html("[ - ]");
    } else {
      $(this).html("[ + ]");
    }
  });
});
