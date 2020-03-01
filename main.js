const container = document.querySelector(".container");
const seats = document.querySelectorAll(`.row .seat:not(.occupied)`);
const count = document.getElementById("count");
const total = document.getElementById(`total`);
const movieSelect = document.getElementById(`movie`);

let ticketPrice = +movieSelect.value;

populateUI();
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
//Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if(selectedSeats !== null && selectedSeats.length > -1){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    })
  }
  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex
  }
  
}
//Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

updateSelectedCount();