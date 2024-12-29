$(document).ready(function () {
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function (json) {

        let html_text = json.quoteText;
        let html_author = (json.quoteAuthor === null || json.quoteAuthor === "") ?
            "- Anonymous" :
            "-" + json.quoteAuthor;

        $(".quote-text").html(html_text);
        $(".quote-author").html(html_author);
    });
});

function getQuote() {
    FB.AppEvents.logEvent('getQuote');
    let html_text = "";
    let html_author = "";
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function (json) {
        html_text = json.quoteText;
        html_author = (json.quoteAuthor === null || json.quoteAuthor === "") ?
            "- Anonymous" :
            "-" + json.quoteAuthor;
        $(".quote-text").html(html_text);
        $(".quote-author").html(html_author);
    });
}

// document.addEventListener("keydown", event => {
//     let content = document.getElementById('content');

//     switch (event.key) {
//         case "Enter":
//             if (navigator.onLine) {
//                 getQuote();

//                 content.scrollTo(0, 0);
//             } else {
//                 showSnackbar();
//             }
//             return;
//         case "ArrowDown":
//             content.scrollBy(0, 150);
//             return;
//         case "ArrowUp":
//             content.scrollBy(0, -150);
//             return;
//         default:
//             return;
//     }
// });

// function showSnackbar() {
//     var x = document.getElementById("snackbar");
//     x.className = "show";
//     setTimeout(function () {
//         x.className = x.className.replace("show", "");
//     }, 3000);
// }

document.addEventListener("DOMContentLoaded", () => {
    getKaiAd({
        publisher: 'bc247e7b-cd8a-4dda-be8c-e766a729f6b8',
        app: 'Daily Inspiration',
        slot: 'diFirstOpenFS',
        onerror: err => console.error(err),
        onready: ad => {
            ad.call('display');
        }
    })
});