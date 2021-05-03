// Get Dom
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();


let ticketPrice = +movieSelect.value;


const updateSelectionCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex))
}

function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex)
    localStorage.setItem('selectedMoviePrice',moviePrice)
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMOvieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMOvieIndex !== null) {
        movieSelect.selectedIndex = selectedMOvieIndex;
    }
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        updateSelectionCount();
    }
});

movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, +e.target.value)
    updateSelectionCount();
});

updateSelectionCount(); 