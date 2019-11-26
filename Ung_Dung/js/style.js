function VideoModal (){
    $(document).ready(function () {
        var $videoSrc;
        $('.video-btn').click(function () {
            $videoSrc = $(this).data("src");
        }); 
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })
        $('#myModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
}
function scrollNav() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      document.getElementById("navbar__logo-lg").style.height = "7rem";
      document.getElementById("navbar__logo-lg").style.top = "0rem";
    } else {
      document.getElementById("navbar__logo-lg").style.height = "12rem";
      document.getElementById("navbar__logo-lg").style.top = "1rem";
    }
  }

function HoverImage(){
    const galleryThumbnail = document.querySelectorAll(".thumbnails-list li");
    const galleryFeatured = document.querySelector(".product-gallery-featured img");
    galleryThumbnail.forEach((item) => {
        item.addEventListener("mouseover", function () {
            let image = item.children[0].src;
            galleryFeatured.src = image;
        });
    });
}
  