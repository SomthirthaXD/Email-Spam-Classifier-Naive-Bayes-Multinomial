const textarea = document.querySelector("#Textarea");
const checkButton = document.getElementsByClassName('replace')[0];
const load = document.querySelector('.buttonload');
const preloader = document.querySelector("#preloader");
const toast = document.getElementById('toast');

//could have used load eventListener in window object
//but mann nahi kiya :)
setTimeout(() => {
    preloader.style.transform = 'scale(30)';
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden'
}, 2500)

const fetchFormData = () => {
    checkButton.style.display = "none";
    load.style.display = "block";
    sendToSpamFilterMessage(textarea.value);
}

const sendToSpamFilterMessage = (str) => {

    toBeSerialized = { message: str }
    fetch('http://localhost:5000/spamcheck', {
        method: "POST",
        body: JSON.stringify(toBeSerialized),
    }).then(res => res.json())
        .then(data => {
            toast.style.top = '5%';
            toast.innerText = data.ServerMessage;
            setTimeout(() => toast.style.top = '-25%', 3000)
            checkButton.style.display = "block";
            load.style.display = "none";
        });
};

function scrollAnimate() {
    Array.from(document.getElementsByClassName("images")).map(item => (
        item.style.top = `${window.innerWidth > 1200 ? (-50 + window.scrollY / 5.1) : (-50 + window.scrollY / 4.45)}%`));
    document.querySelector('#image1').style.left = `${50 - window.scrollY / 30}%`
    document.querySelector('#image2').style.right = `${50 - window.scrollY / 30}%`

    document.getElementById('icon1').style.top = `${10 + window.scrollY / 90}%`
    document.getElementById('icon2').style.top = `${window.innerWidth > 1200 ? (16 + window.scrollY / 20) : (16 - window.scrollY / 20)}%`
    document.querySelector('#icon4').style.top = `${window.innerWidth > 1200 ? 32 + window.scrollY / 27 : 52 - window.scrollY / 17}%`
    document.getElementById('icon5').style.top = `${window.innerWidth > 1200 ? (75 - window.scrollY / 20) : 75 - window.scrollY / 5}%`
    document.getElementById('icon7').style.top = `${window.innerWidth > 1200 ? (47 - window.scrollY / 85) : (47 - window.scrollY / 45)}%`
    document.getElementById('icon6').style.top = `${window.innerWidth > 1200 ? 60 - window.scrollY / 55 : 60 - window.scrollY / 20}%`
    document.getElementById('heading').style.left = `${window.innerWidth > 1200 ? (-20 + window.scrollY / 35) : (-20 + window.scrollY / 32)}%`

    Array.from(document.querySelectorAll('.contributors_details')).map(item => {
        item.style.bottom = `${window.innerWidth > 1200 ? (-570 + window.scrollY / 1.3) : (-540 + window.scrollY)}px`;
    })
    document.querySelectorAll('.contributors_details')[0].style.left = `${50 - window.scrollY / 25}%`
    document.querySelectorAll('.contributors_details')[1].style.right = `${50 - window.scrollY / 25}%`
}

window.addEventListener("scroll", scrollAnimate);


