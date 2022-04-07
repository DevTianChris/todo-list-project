const newTodo = document.querySelector('.new-todo');
const newInProgress = document.querySelector('.new-inprogress');
const newCompleted = document.querySelector('.new-completed');


newTodo.addEventListener('click', e => {
    const plusButton = e.currentTarget;
    const todoContainer = document.querySelector('.todo');

    boxPopUp(todoContainer, plusButton);
});

newInProgress.addEventListener('click', e => {
    const plusButton = e.currentTarget;
    const inProgressContainer = document.querySelector('.inprogress');

    boxPopUp(inProgressContainer, plusButton);
});

newCompleted.addEventListener('click', e => {
    const plusButton = e.currentTarget;
    const completedContainer = document.querySelector('.completed');

    boxPopUp(completedContainer, plusButton);
});

function boxPopUp(container, plusButton) {
    plusButton.style.display = 'none';
    const divButton = container.querySelector('.add');
    divButton.classList.add('new-box');

    const form = document.createElement('form');
    form.innerHTML = `<h1>Title</h1>
                    <input type="text" id="title" name="nama" value="" maxlength="50" required>
                    <h1>Description</h1>
                    <input type="text" id="desc" name="desc" value="">
                    <h1>Sub-Desc</h1>
                    <input type="text" id="sub-desc" name="sub-desc" value="">
                    <input type="submit" value="Create" name="submit" id="submit-btn">
                    <button class="close-btn">Cancel</button>`
    divButton.appendChild(form);

    const title = form.querySelector('#title');
    const desc = form.querySelector('#desc');
    const subDesc = form.querySelector('#sub-desc');

    form.addEventListener('submit', e => {
        e.preventDefault();
        newCard(container, title.value, desc.value, subDesc.value);
        cardCounter(container);
        title.value = '';
        desc.value = '';
        subDesc.value = '';
        divButton.removeChild(form);
        plusButton.style.display = 'block';
        divButton.classList.remove('new-box');
    });

    const closeBtn = form.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        divButton.removeChild(form);
        plusButton.style.display = 'block';
        divButton.classList.remove('new-box');
    })
}


function cardCounter(container) {
    const indexNumber = container.querySelector('.number');
    let num = 0;
    container.childNodes.forEach(element => {
        if (element.hasChildNodes()) {
            return num++;
        }
    });
    num -= 2;
    indexNumber.textContent = num;
}

function newCard(container, title, desc, subDesc) {
    const div = document.createElement('div');
    div.classList.add('desc-card');

    div.innerHTML = `<h1>${title}</h1>
    <p class="description">${desc}</p>
    <p class="sub-desc">${subDesc}</p>`

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    if (container.classList.contains('todo')) {
        btnContainer.innerHTML = `<button class="ip newCard-btn">Inprogress</button>
                            <button class="cpd newCard-btn">Completed</button>`

        div.appendChild(btnContainer);

        const inprogressBtn = btnContainer.querySelector('.ip');
        const completedBtn = btnContainer.querySelector('.cpd');

        inprogressBtn.addEventListener('click', e => {
            const element = e.currentTarget.parentElement.parentElement;
            const title = element.querySelector('h1').innerText;
            const desc = element.querySelector('.description').innerText;
            const subDesc = element.querySelector('.sub-desc').innerText;
            const inprogressContainer = document.querySelector('.inprogress');

            element.remove();
            cardCounter(container);
            newCard(inprogressContainer, title, desc, subDesc);
            cardCounter(inprogressContainer);
        }); 

        completedBtn.addEventListener('click', e => {
            const element = e.currentTarget.parentElement.parentElement;
            const title = element.querySelector('h1').innerText;
            const desc = element.querySelector('.description').innerText;
            const subDesc = element.querySelector('.sub-desc').innerText;
            const completedContainer = document.querySelector('.completed');

            element.remove();
            cardCounter(container);
            newCard(completedContainer, title, desc, subDesc);
            cardCounter(completedContainer);
        });
    } else if (container.classList.contains('inprogress')) {
        btnContainer.innerHTML = `<button class="td newCard-btn">To Do</button>
                            <button class="cpd newCard-btn">Completed</button>`

        div.appendChild(btnContainer);

        const todoBtn = btnContainer.querySelector('.td');
        const completedBtn = btnContainer.querySelector('.cpd')

        todoBtn.addEventListener('click', e => {
            const element = e.currentTarget.parentElement.parentElement;
            const title = element.querySelector('h1').innerText;
            const desc = element.querySelector('.description').innerText;
            const subDesc = element.querySelector('.sub-desc').innerText;
            const todoContainer = document.querySelector('.todo');

            element.remove();
            cardCounter(container);
            newCard(todoContainer, title, desc, subDesc);
            cardCounter(todoContainer);
        });

        completedBtn.addEventListener('click', e => {
            const element = e.currentTarget.parentElement.parentElement;
            const title = element.querySelector('h1').innerText;
            const desc = element.querySelector('.description').innerText;
            const subDesc = element.querySelector('.sub-desc').innerText;
            const completedContainer = document.querySelector('.completed');

            element.remove();
            cardCounter(container);
            newCard(completedContainer, title, desc, subDesc);
            cardCounter(completedContainer);
        });
    } else {
        btnContainer.innerHTML = `<button class="td newCard-btn">To Do</button>
                            <button class="ip newCard-btn">Inprogress</button>`
        div.appendChild(btnContainer);

        const todoBtn = btnContainer.querySelector('.td');
        const inprogressBtn = btnContainer.querySelector('.ip');

        todoBtn.addEventListener('click', e => {
            const element = e.currentTarget.parentElement.parentElement;
            const title = element.querySelector('h1').innerText;
            const desc = element.querySelector('.description').innerText;
            const subDesc = element.querySelector('.sub-desc').innerText;
            const todoContainer = document.querySelector('.todo');

            element.remove();
            cardCounter(container);
            newCard(todoContainer, title, desc, subDesc);
            cardCounter(todoContainer);
        });

        inprogressBtn.addEventListener('click', e => {
            const element = e.currentTarget.parentElement.parentElement;
            const title = element.querySelector('h1').innerText;
            const desc = element.querySelector('.description').innerText;
            const subDesc = element.querySelector('.sub-desc').innerText;
            const inprogressContainer = document.querySelector('.inprogress');

            element.remove();
            cardCounter(container);
            newCard(inprogressContainer, title, desc, subDesc);
            cardCounter(inprogressContainer);
        }); 
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class','delete-btn');
    deleteBtn.textContent = 'Delete';
    btnContainer.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', e => {
        const element = e.currentTarget.parentElement.parentElement;
        element.remove();
        cardCounter(container);
    })

    container.appendChild(div);
}







