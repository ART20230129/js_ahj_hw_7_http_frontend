// eslint-disable-next-line import/no-cycle
import { closeModalWindows, displayTickets, displayFullDescription } from './windowsController';

export function loadAllTickets() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:7070/?method=allTickets');

  // код ниже позволит обработать полученный ответ от сервера во Frontend (из задания)
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) { // анализируем HTTP-статус ответа
      try {
        const tickets = JSON.parse(xhr.responseText);
        displayTickets(tickets); // вывод тикетов функция
      } catch (error) {
        console.error(error);
      }
    }
  });
  xhr.send();
}

export function addTicket(shortDescriptionInput, fullDescriptionInput) {
  // console.log('shortDescriptionInput:', shortDescriptionInput);
  // console.log('fullDescriptionInput:', fullDescriptionInput);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:7070/?method=createTicket');

  /* Теперь напишем заголовок запроса, чтобы сервер понимал, какие данные мы ему пришлём и как ему их обрабатывать.
        Так как у нас JSON, то это и пропишем в заголовке: */
  xhr.setRequestHeader('Content-Type', 'application/json'); // устанавливаем заголовок — выбираем тип контента,
  // который отправится на сервер,
  // в нашем случае мы явно пишем, что это JSON

  // код ниже позволит обработать полученный ответ от сервера во Frontend (из задания)
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) { // анализируем HTTP-статус ответа
      try {
        // eslint-disable-next-line no-unused-vars
        const ticket = JSON.parse(xhr.responseText);
        loadAllTickets();
        closeModalWindows();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const newTicket = {
    name: shortDescriptionInput,
    description: fullDescriptionInput,
    status: false,
  };

  // преобразуем наши данные JSON в строку и отправляем JSON на сервер
  xhr.send(JSON.stringify(newTicket));
}

export function updateTicketStatus(ticketId, сheckedStatus) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:7070/?method=checkTicket&ticketId=${ticketId}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) { // анализируем HTTP-статус ответа
      try {
        // eslint-disable-next-line no-unused-vars
        const ticket = JSON.parse(xhr.responseText);
        loadAllTickets();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const updatedStatusTicket = {
    id: ticketId,
    status: сheckedStatus, // используем обновленное состояние чекбокса в качестве булевого значения
  };

  xhr.send(JSON.stringify(updatedStatusTicket));
}

export function deleteTicket(ticketId) {
  // console.log('ticketId:', ticketId);
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `http://localhost:7070/?method=deleteTicket&deleteId=${ticketId}`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) { // анализируем HTTP-статус ответа
      try {
        // eslint-disable-next-line no-unused-vars
        const tickets = JSON.parse(xhr.responseText);
        loadAllTickets(); // вывод тикетов функция
      } catch (error) {
        console.error(error);
      }
    }
  });
  xhr.send();
}

export function editTicket(editTicketId, shortDescriptionInput, fullDescriptionInput) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:7070/?method=updateTicket&editTicketId=${editTicketId}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) { // анализируем HTTP-статус ответа
      try {
        // eslint-disable-next-line no-unused-vars
        const editedTicket = JSON.parse(xhr.responseText);
        loadAllTickets();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const editedTicket = {
    id: editTicketId,
    name: shortDescriptionInput,
    description: fullDescriptionInput,
    status: false,
  };

  xhr.send(JSON.stringify(editedTicket));
}
export function fullDescriptionFunction(ticketId) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:7070/?method=ticketById&id=${ticketId}`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) { // анализируем HTTP-статус ответа
      try {
        const ticket = JSON.parse(xhr.responseText);
        // console.log('ticket ', ticket);
        displayFullDescription(ticket);
      } catch (error) {
        console.error(error);
      }
    }
  });
  xhr.send();
}
