// ================================
// ЧАСТЬ 1. ПОДКЛЮЧЕНИЕ HTML
// ================================

const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-form__input");
const timeInput = document.querySelector(".task-form__time");
const clockTime = document.querySelector(".clock__time");
const clockDate = document.querySelector(".clock__date");
const alphaButton = document.querySelector(".sort__btn--alpha");
const timeButton = document.querySelector(".sort__btn--time");
const deleteZone = document.querySelector(".delete-zone");
const clearButton = document.querySelector(".stats__action-btn--clear");
const resetButton = document.querySelector(".stats__action-btn--reset");
const progressCircle = document.getElementById("progressValue");
const percentText = document.getElementById("percent");
const doingCount = document.querySelector(".stats__item--doing .stats__value");
const doneCount = document.querySelector(".stats__item--done .stats__value");
const overdueCount = document.querySelector(".stats__item--overdue .stats__value");


// ================================
// ЧАСТЬ 2. НАСТРОЙКИ И ПЕРЕМЕННЫЕ
// ================================

const statuses = ["todo", "doing", "done"];
const circleLength = 2 * Math.PI * 48;


// Получаем задачи из LocalStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

let tasks = savedTasks;
let sortMode = "";
let draggedTaskId = null;



// ================================
// ЧАСТЬ 3. ЧАСЫ И ДАТА
// ================================

function updateClock() {
    const now = new Date();

    clockTime.textContent = now.toLocaleTimeString("ru-RU");

    clockDate.textContent = now.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Обновляем часы каждую секунду
updateClock();
setInterval(updateClock, 1000);



taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if(
    !taskInput.value.trim()||(!timeInput.value.trim() || taskInput.value.length > 40)){
        alert("Нельзя сделать больше 40 слов или оттавить поля пустыми");
    }
   else {
   const newData = {
        id: Date.now().toString(),
        title: title,
        time: timeInput.value,
        status: "todo"
    };
    tasks.push(newData);
    taskForm.reset();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
    
  }
});



function showTasks() {
    const statuses = ["todo", "doing", "done"];

    statuses.forEach((status) => {
        const column = document.querySelector(".column--" + status);
        if (!column) return;
        const list = column.querySelector(".column__list");
        const count = column.querySelector(".column__count");
        list.innerHTML = "";
        const columnTasks = tasks.filter((task) => task.status === status);
        
        columnTasks.forEach((item) => {
            const li = document.createElement("li");
            li.classList.add("task", "task--" + item.status);
            const title = document.createElement("span");
            title.classList.add("task__title");
            title.textContent = item.title;
            const time = document.createElement("time");
            time.classList.add("task__time");
            time.textContent = item.time;
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("task__delete");
            deleteButton.textContent = "×";
            const editButton = document.createElement("button");
            editButton.classList.add("task__edit");
            editButton.textContent = "✎";
            li.append(title, time, editButton, deleteButton);
            list.append(li);

            // Delete
            deleteButton.addEventListener("click", () => {
                tasks = tasks.filter((task) => task.id !== item.id);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showTasks();
            });

            // Edit
            editButton.addEventListener("click", () => {
                const newTitle = prompt("Измени задачу:", item.title);

                if (newTitle === null || !newTitle.trim()) return;

                item.title = newTitle.trim();

                localStorage.setItem("tasks", JSON.stringify(tasks));
                showTasks();
            });
        });

        count.textContent = columnTasks.length;
    });
}

showTasks();

































































































// // ================================
// // ЧАСТЬ 1. ПОДКЛЮЧЕНИЕ HTML
// // ================================

// const taskForm = document.querySelector(".task-form");
// const taskInput = document.querySelector(".task-form__input");
// const timeInput = document.querySelector(".task-form__time");
// const clockTime = document.querySelector(".clock__time");
// const clockDate = document.querySelector(".clock__date");
// const alphaButton = document.querySelector(".sort__btn--alpha");
// const timeButton = document.querySelector(".sort__btn--time");
// const deleteZone = document.querySelector(".delete-zone");
// const clearButton = document.querySelector(".stats__action-btn--clear");
// const resetButton = document.querySelector(".stats__action-btn--reset");
// const progressCircle = document.getElementById("progressValue");
// const percentText = document.getElementById("percent");
// const doingCount = document.querySelector(".stats__item--doing .stats__value");
// const doneCount = document.querySelector(".stats__item--done .stats__value");
// const overdueCount = document.querySelector(".stats__item--overdue .stats__value");


// // ================================
// // ЧАСТЬ 2. НАСТРОЙКИ И ПЕРЕМЕННЫЕ
// // ================================

// const statuses = ["todo", "doing", "done"];
// const circleLength = 2 * Math.PI * 48;
// const maxWords = 40;

// // Получаем задачи из LocalStorage
// const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// let tasks = savedTasks;
// let sortMode = "";
// let draggedTaskId = null;



// // ================================
// // ЧАСТЬ 3. ЧАСЫ И ДАТА
// // ================================

// function updateClock() {
//     const now = new Date();

//     clockTime.textContent = now.toLocaleTimeString("ru-RU");

//     clockDate.textContent = now.toLocaleDateString("ru-RU", {
//         day: "numeric",
//         month: "long",
//         year: "numeric"
//     });
// }

// // Обновляем часы каждую секунду
// updateClock();
// setInterval(updateClock, 1000);





// // ================================
// // ЧАСТЬ 5. СОХРАНЕНИЕ ЗАДАЧ
// // ================================

// function saveTasks() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     showTasks();
// }


// // ================================
// // ЧАСТЬ 6. ПОДСЧЁТ СЛОВ
// // ================================

// function countWords(text) {
//     if (text.trim() === "") {
//         return 0;
//     }

//     return text.trim().split(/\s+/).length;
// }


// // ================================
// // ЧАСТЬ 7. ПРОВЕРКА ЗАДАЧИ
// // ================================

// function checkTitle(title) {
//     const wordsCount = countWords(title);

//     if (title.trim() === "") {
//         alert("Введите текст задачи!");
//         return false;
//     }

//     if (wordsCount > maxWords) {
//         alert("Слишком длинная задача! Максимум " + maxWords + " слов.");
//         return false;
//     }

//     return true;
// }


// // ================================
// // ЧАСТЬ 8. TODO ADD
// // Добавление новой задачи
// // ================================

// function addTask(event) {
//     event.preventDefault();

//     const title = taskInput.value.trim();

//     // Проверяем текст перед добавлением
//     if (!checkTitle(title)) {
//         return;
//     }

//     // Создаём объект задачи
//     const newTask = {
//         id: Date.now().toString(),
//         title: title,
//         time: timeInput.value,
//         deadline: makeDeadline(timeInput.value),
//         status: "todo"
//     };

//     // Добавляем задачу в массив
//     tasks.push(newTask);

//     // Очищаем поля формы
//     taskInput.value = "";
//     timeInput.value = "";

//     // Сохраняем и отображаем задачи
//     saveTasks();
// }

// // Связываем форму с функцией добавления
// taskForm.addEventListener("submit", addTask);




// // ================================
// // ЧАСТЬ 9. EDIT BTN
// // Изменение текста задачи
// // ================================

// function editTask(id) {
//     for (let i = 0; i < tasks.length; i++) {

//         if (tasks[i].id === id) {
//             const newTitle = prompt(
//                 "Измени задачу:",
//                 tasks[i].title
//             );

//             // Если нажали Cancel
//             if (newTitle === null) {
//                 return;
//             }

//             const cleanTitle = newTitle.trim();

//             // Проверяем новый текст
//             if (checkTitle(cleanTitle)) {
//                 tasks[i].title = cleanTitle;
//                 saveTasks();
//             }

//             return;
//         }
//     }
// }



// // ================================
// // ЧАСТЬ 10. DELETE BTN
// // Удаление одной задачи
// // ================================

// function deleteTask(id) {
//     tasks = tasks.filter(function (task) {
//         return task.id !== id;
//     });

//     saveTasks();
// }



// // ================================
// // ЧАСТЬ 11. MOVE TASK
// // Перемещение задачи между колонками
// // ================================

// function moveTask(id, newStatus) {
//     for (let i = 0; i < tasks.length; i++) {
//         if (tasks[i].id === id) {
//             tasks[i].status = newStatus;
//         }
//     }

//     saveTasks();
// }







// // Кнопки сортировки
// alphaButton.addEventListener("click", function () {
//     setSortMode("alpha");
// });

// timeButton.addEventListener("click", function () {
//     setSortMode("time");
// });





// // ================================
// // ЧАСТЬ 13. CREATE TASK ELEMENT
// // Создание HTML-карточки
// // ================================

// function createTaskElement(task) {

//     // Создаём карточку
//     const li = document.createElement("li");
//     li.className = "task task--" + task.status;
//     li.draggable = true;


//     // ================================
//     // TITLE — текст задачи
//     // ================================

//     const title = document.createElement("span");
//     title.className = "task__title";
//     title.textContent = task.title;

//     li.append(title);


//     // ================================
//     // TIME — время задачи
//     // ================================

//     if (task.time !== "") {
//         const time = document.createElement("span");

//         time.className = "task__time";
//         time.textContent = task.time;

//         li.append(time);
//     }


//     // ================================
//     // EDIT BTN — кнопка редактирования
//     // ================================

//     const editButton = document.createElement("button");

//     editButton.className = "task__edit";
//     editButton.textContent = "✎";
//     editButton.title = "Изменить";

//     editButton.addEventListener("click", function () {
//         editTask(task.id);
//     });

//     li.append(editButton);


//     // ================================
//     // DELETE BTN — кнопка удаления
//     // ================================

//     const deleteButton = document.createElement("button");

//     deleteButton.className = "task__delete";
//     deleteButton.textContent = "×";
//     deleteButton.addEventListener("click", function () {
//         deleteTask(task.id);
//     });

//     li.append(deleteButton);


//     // ================================
//     // DRAG START — начало перетаскивания
//     // ================================

//     li.addEventListener("dragstart", function () {
//         draggedTaskId = task.id;

//         li.classList.add("task--dragging");
//         deleteZone.classList.add("delete-zone--active");
//     });


//     // ================================
//     // DRAG END — конец перетаскивания
//     // ================================

//     li.addEventListener("dragend", function () {
//         draggedTaskId = null;

//         li.classList.remove("task--dragging");
//         deleteZone.classList.remove("delete-zone--active");
//     });

//     return li;
// }



// // ================================
// // ЧАСТЬ 14. SHOW TASKS
// // Распределение задач по колонкам
// // ================================

// function showTasks() {

//     for (let i = 0; i < statuses.length; i++) {
//         const status = statuses[i];

//         const column = document.querySelector(".column--" + status);
//         const list = column.querySelector(".column__list");
//         const count = column.querySelector(".column__count");

//         // Фильтруем задачи по статусу
//         let columnTasks = tasks.filter(function (task) {
//             return task.status === status;
//         });

      

//         // Очищаем старые карточки
//         list.innerHTML = "";

//         // Создаём карточки заново
//         for (let j = 0; j < columnTasks.length; j++) {
//             list.append(createTaskElement(columnTasks[j]));
//         }

//         // Показываем количество задач в колонке
//         count.textContent = columnTasks.length;
//     }

//     showStats();
// }



// // ================================
// // ЧАСТЬ 15. SHOW STATS
// // Статистика задач
// // ================================

// function showStats() {
//     let doing = 0;
//     let done = 0;
//     let overdue = 0;

//     for (let i = 0; i < tasks.length; i++) {

//         if (tasks[i].status === "doing") {
//             doing++;
//         }

//         if (tasks[i].status === "done") {
//             done++;
//         }

       
//     }

//     // Вычисляем процент выполнения
//     let percent = 0;

//     if (tasks.length > 0) {
//         percent = Math.round((done / tasks.length) * 100);
//     }

//     doingCount.textContent = doing;
//     doneCount.textContent = done;
//     overdueCount.textContent = overdue;

//     percentText.textContent = percent + "%";

//     // Обновляем круговой индикатор
//     progressCircle.style.strokeDasharray = circleLength;

//     progressCircle.style.strokeDashoffset =
//         circleLength * (1 - percent / 100);
// }



// // ================================
// // ЧАСТЬ 16. DRAG & DROP
// // Перемещение между TODO, DOING, DONE
// // ================================

// for (let i = 0; i < statuses.length; i++) {
//     const status = statuses[i];

//     const column = document.querySelector(".column--" + status);

//     // Разрешаем перетаскивание над колонкой
//     column.addEventListener("dragover", function (event) {
//         event.preventDefault();
//         column.classList.add("column--over");
//     });

//     // Убираем стиль при уходе с колонки
//     column.addEventListener("dragleave", function () {
//         column.classList.remove("column--over");
//     });

//     // Отпускаем карточку в колонку
//     column.addEventListener("drop", function (event) {
//         event.preventDefault();

//         column.classList.remove("column--over");

//         if (draggedTaskId !== null) {
//             moveTask(draggedTaskId, status);
//         }
//     });
// }



// // ================================
// // ЧАСТЬ 17. DELETE ZONE
// // Удаление перетаскиванием в корзину
// // ================================

// deleteZone.addEventListener("dragover", function (event) {
//     event.preventDefault();
//     deleteZone.classList.add("delete-zone--over");
// });

// deleteZone.addEventListener("dragleave", function () {
//     deleteZone.classList.remove("delete-zone--over");
// });

// deleteZone.addEventListener("drop", function (event) {
//     event.preventDefault();

//     deleteZone.classList.remove("delete-zone--over");

//     if (draggedTaskId !== null) {
//         deleteTask(draggedTaskId);
//     }
// });


// // ================================
// // ЧАСТЬ 18. CLEAR DONE
// // Очистка выполненных задач
// // ================================

// clearButton.addEventListener("click", function () {
//     tasks = tasks.filter(function (task) {
//         return task.status !== "done";
//     });

//     saveTasks();
// });


// // ================================
// // ЧАСТЬ 19. RESET ALL
// // Удаление всех задач
// // ================================

// resetButton.addEventListener("click", function () {
//     if (confirm("Удалить все задачи?")) {
//         tasks = [];
//         saveTasks();
//     }
// });





// // ================================
// // ЧАСТЬ 21. ПЕРВЫЙ ЗАПУСК
// // ================================

// // Показываем задачи при загрузке страницы
// showTasks();

// // Обновляем отображение каждые 30 секунд
// setInterval(showTasks, 30000);