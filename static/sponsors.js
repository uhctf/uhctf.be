
// Stolen from the Internet, sue me :)
function shuffle(elems) {
    allElems = (function () {
        var ret = [], l = elems.length;
        while (l--) { ret[ret.length] = elems[l]; }
        return ret;
    })();

    var shuffled = (function () {
        var l = allElems.length, ret = [];
        while (l--) {
            var random = Math.floor(Math.random() * allElems.length),
                randEl = allElems[random].cloneNode(true);
            allElems.splice(random, 1);
            ret[ret.length] = randEl;
        }
        return ret;
    })(), l = elems.length;

    while (l--) {
        elems[l].parentNode.insertBefore(shuffled[l], elems[l].nextSibling);
        elems[l].parentNode.removeChild(elems[l]);
    }
}

// Shuffle sponsor lists
const sponsor_carrousel = document.querySelectorAll('.uhctf_sponsors');
sponsor_carrousel.forEach(carrousel => {
    const carr_images = carrousel.querySelectorAll('.uhctf_sponsor');
    shuffle(carr_images);
});

// Make the actual slideshow

function show_only_img_with_idx(slide_imgs, active_idx) {
    for (let [img_idx, element] of slide_imgs.entries()) {
        if (img_idx == active_idx) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
}

const SPONSOR_SLIDESHOW_SPEED = 5000;
const slideshows = document.querySelectorAll('.uhctf_sponsor_slideshow');
slideshows.forEach(slide_element => {
    shuffle(slide_element);
    const slide_imgs = slide_element.querySelectorAll('img');
    const next_slide = async () => {
        current_idx = (current_idx + 1) % slide_imgs.length;
        show_only_img_with_idx(slide_imgs, current_idx);
        window.setTimeout(next_slide, SPONSOR_SLIDESHOW_SPEED);
    };
    let current_idx = 0;
    show_only_img_with_idx(slide_imgs, current_idx);
    window.setTimeout(next_slide, SPONSOR_SLIDESHOW_SPEED);
});
