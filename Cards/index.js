var filter = (filter) => {
    const cards = document.getElementsByClassName("col-sm-12");
    for (let i = 0; i < cards.length; i++) {
        // let subtitle = cards[i].querySelector(".card .card-body .card-subtitle");
        let subtitle = cards[i].querySelector(".card .card-body .group1");
        if (subtitle.innerText.indexOf(filter) > -1) {
            cards[i].classList.remove("d-none")
        } else {
            cards[i].classList.add("d-none")
        }
    }
}

var clearAll = () => {
    cards = document.getElementsByClassName("col-sm-12")
    for (i = 0; i < cards.length; i++) {
        cards[i].classList.remove("d-none")
    }
}

var filter2 = (filter) => {
    const cards = document.getElementsByClassName("col-sm-12");
    for (let i = 0; i < cards.length; i++) {
        let subtitle = cards[i].querySelector(".card .card-body .group2");
        if (subtitle.innerText.indexOf(filter) > -1) {
            cards[i].classList.remove("d-none")
        } else {
            cards[i].classList.add("d-none")
        }
    }
}
