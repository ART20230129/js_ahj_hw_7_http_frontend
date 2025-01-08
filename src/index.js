import './css/style.css';
import { openModalWindows, closeModalWindows } from './js/windowsController.js';
import { loadAllTickets, addTicket, editTicket } from './js/app.js';

document.addEventListener('DOMContentLoaded', () => {
  const addTicketBtn = document.querySelector('.addTicket');
  const cancelButton = document.querySelector('.cancelButton');
  const ticketForm = document.querySelector('.ticketForm');

  addTicketBtn.addEventListener('click', openModalWindows);
  cancelButton.addEventListener('click', closeModalWindows);
  ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const shortDescriptionInput = document.getElementById('shortDescription');
    const fullDescriptionInput = document.getElementById('fullDescription');
    const editTicketId = document.getElementById('editTicketId');

    if (editTicketId.value) { // Если editTicketId не пустой, вызываем editTicket
      // console.log('editTicketId.value:', editTicketId.value);
      editTicket(
        editTicketId.value,
        shortDescriptionInput.value,
        fullDescriptionInput.value,
      );
    } else {
      // Если editTicketId пустой, вызываем addTicket
      addTicket(shortDescriptionInput.value, fullDescriptionInput.value);
    }

    closeModalWindows();
  });
  loadAllTickets();
});
