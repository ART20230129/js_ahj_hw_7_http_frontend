// eslint-disable-next-line import/no-cycle
import {
  deleteTicket, updateTicketStatus, editTicket, fullDescriptionFunction,
} from './app';

export function openModalWindows() { // открытие модального окна создания новой задачи
  // Проверяем наличие других открытых модальных окон
  const deleteModal = document.querySelector('.delete-modal');
  const styleModal = deleteModal.style.display;
  if (styleModal === 'block') {
    return;
  }

  const modalOpen = document.querySelector('.modalOpen');
  const shortDescriptionInput = document.getElementById('shortDescription');
  const fullDescriptionInput = document.getElementById('fullDescription');
  const editTicketId = document.getElementById('editTicketId');
  const windowTitle = document.querySelector('.windowTitle');
  windowTitle.textContent = 'Добавить задачу';

  modalOpen.style.display = 'block'; // показ модального окна
  // очищаем поля формы
  shortDescriptionInput.value = '';
  fullDescriptionInput.value = '';
  editTicketId.value = '';
}

export function closeModalWindows() { // "выключение" модального окна создания новой задачи
  const modalOpen = document.querySelector('.modalOpen');
  modalOpen.style.display = 'none';
}

export function displayTickets(tickets) { // отрисовываем задачи на экране
  // console.log("tickets", tickets);
  const taskList = document.querySelector('.tasks');
  taskList.innerHTML = '';

  tickets.forEach((ticket) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('tasks__item');

    const checkboxLabel = document.createElement('label');
    checkboxLabel.classList.add('container');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox-one');
    checkbox.type = 'checkbox';
    checkbox.checked = ticket.status; // устанавливаем статус чекбокса
    // (булевое значение поля 'статус' тикета на сервере)
    checkbox.dataset.ticketId = ticket.id;
    checkbox.addEventListener('change', () => { // обработка изменения статуса чекбокса
      const { ticketId } = checkbox.dataset;
      const сheckedStatus = checkbox.checked;
      // console.log(сheckedStatus);
      updateTicketStatus(ticketId, сheckedStatus);
    });

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(checkmark);

    const taskItemMessage = document.createElement('div');
    taskItemMessage.classList.add('task__item-message');
    const shortDescription = document.createElement('p');
    shortDescription.textContent = ticket.name;
    taskItemMessage.appendChild(shortDescription);

    // При нажатии на taskItemMessage появляется полное описание задачи
    taskItemMessage.addEventListener('click', (event) => {
      showFullDescription(event, ticket);
    });

    // отрисовка даты создания задачи
    const dateTime = document.createElement('div');
    dateTime.classList.add('date-time');
    const date = new Date(ticket.created);
    dateTime.textContent = date.toLocaleString();

    const taskItemEdit = document.createElement('div');
    taskItemEdit.classList.add('task__item-edit');
    const editLink = document.createElement('a');
    const editIcon = document.createElement('span');
    editIcon.classList.add('symbols-edit');
    editIcon.textContent = '';
    editLink.appendChild(editIcon);
    taskItemEdit.appendChild(editLink);
    editLink.addEventListener('click', () => { // открытие модального окна редактирования задачи
      openEditModal(ticket);
    });

    const taskItemCancel = document.createElement('div');
    taskItemCancel.classList.add('task__item-cancel');
    const cancelLink = document.createElement('a');
    const cancelIcon = document.createElement('span');
    cancelIcon.classList.add('symbols-delete');
    cancelIcon.textContent = '';
    cancelLink.appendChild(cancelIcon);
    taskItemCancel.appendChild(cancelLink);
    cancelLink.addEventListener('click', () => {
      openDeleteModal(ticket.id);
    });

    taskItem.appendChild(checkboxLabel);
    taskItem.appendChild(taskItemMessage);
    taskItem.appendChild(dateTime);
    taskItem.appendChild(taskItemEdit);
    taskItem.appendChild(taskItemCancel);

    taskList.appendChild(taskItem);
  });
}

let taskItemMessage;
export function showFullDescription(event, ticket) { // показываем подробности выбранной задачи
  // console.log('ticket.id:', ticket.id);
  taskItemMessage = event.currentTarget;
  const modalFullDescription = taskItemMessage.querySelector('.modal-full-descriptions');

  if (modalFullDescription) { // если полное описание окрыто, от при клике убираем
    modalFullDescription.remove();
  } else {
    fullDescriptionFunction(ticket.id);
  }
}

export function displayFullDescription(ticket) {
  // console.log('IdTicket ', ticket);
  let modalFullDescription = taskItemMessage.querySelector('.modal-full-descriptions');
  // создаем  и вставляем элемент в котором будет отражено полное содержание задачи
  modalFullDescription = document.createElement('div');
  modalFullDescription.classList.add('modal-full-descriptions');
  modalFullDescription.textContent = ticket.description;
  const shortDescription = taskItemMessage.querySelector('p');
  shortDescription.insertAdjacentElement('afterend', modalFullDescription);
}

export function openEditModal(ticket) { // открытие окна редактирования
  // console.log('ticket:', ticket);

  // Проверяем наличие других открытых модальных окон
  const deleteModal = document.querySelector('.delete-modal');
  const styleModalDelete = deleteModal.style.display;
  const modalOpenAdd = document.querySelector('.modalOpen');
  const styleModal = modalOpenAdd.style.display;
  if (styleModalDelete && styleModal === 'block') {
    return;
  }

  const modalOpen = document.querySelector('.modalOpen');
  const shortDescriptionInput = document.getElementById('shortDescription');
  const fullDescriptionInput = document.getElementById('fullDescription');
  const editTicketIdInput = document.getElementById('editTicketId');
  const windowTitle = document.querySelector('.windowTitle');
  windowTitle.textContent = 'Изменить задачу';
  modalOpen.style.display = 'block'; // открытие модального окна

  shortDescriptionInput.value = ticket.name;
  fullDescriptionInput.value = ticket.description;
  editTicketIdInput.value = ticket.id;

  editTicket(editTicketIdInput, shortDescriptionInput, fullDescriptionInput);
}

export function openDeleteModal(ticketId) {
  // console.log('ticketId:', ticketId);

  // Проверяем наличие других открытых модальных окон
  const modalOpen = document.querySelector('.modalOpen');
  const styleModal = modalOpen.style.display;
  if (styleModal === 'block') {
    return;
  }

  const deleteModal = document.querySelector('.delete-modal');
  deleteModal.style.display = 'block';
  const cancelBtn = deleteModal.querySelector('.cancelButton');
  cancelBtn.addEventListener('click', closeDeleteModal);
  const okBtn = deleteModal.querySelector('.okButton');
  okBtn.addEventListener('click', () => {
    deleteTicket(ticketId);
    closeDeleteModal();
  });
}

export function closeDeleteModal() {
  const deleteModal = document.querySelector('.delete-modal');
  deleteModal.style.display = 'none';
}
