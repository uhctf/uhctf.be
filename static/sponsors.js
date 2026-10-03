
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
const sponsor_carrousel = document.querySelectorAll('.uhctf_sponsors_slideshow');
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
    let current_idx = 0;
    let paused = false;
    let timer = null;

    const next_slide = () => {
        current_idx = (current_idx + 1) % slide_imgs.length;
        show_only_img_with_idx(slide_imgs, current_idx);
        timer = window.setTimeout(next_slide, SPONSOR_SLIDESHOW_SPEED);
    };

    // Click (or Enter/Space) toggles pause (WCAG 2.2.2); the state is exposed via aria-pressed
    slide_element.setAttribute('role', 'button');
    slide_element.setAttribute('tabindex', '0');
    const update_state = () => {
        slide_element.setAttribute('aria-label',
            paused ? 'Sponsor slideshow paused, activate to resume' : 'Sponsor slideshow, activate to pause');
        slide_element.setAttribute('aria-pressed', paused ? 'true' : 'false');
    };
    const toggle = () => {
        paused = !paused;
        window.clearTimeout(timer);
        if (!paused) {
            timer = window.setTimeout(next_slide, SPONSOR_SLIDESHOW_SPEED);
        }
        update_state();
    };
    slide_element.addEventListener('click', toggle);
    slide_element.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });
    update_state();

    show_only_img_with_idx(slide_imgs, current_idx);
    if (!paused) timer = window.setTimeout(next_slide, SPONSOR_SLIDESHOW_SPEED);
});

// Make the theme's dropdown menu trigger usable with the keyboard
document.querySelectorAll('.menu__trigger').forEach(trigger => {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
        }
    });
});

