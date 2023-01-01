class Todo {
    constructor() {
        this.tasks = [];
    }
    init() {
        const fromStorage1 = localStorage.getItem('todo');
        const fromStorage2 = localStorage.getItem('todo__arr');
        console.log(JSON.parse(fromStorage2));
        if (fromStorage1 && fromStorage2) {
            document.querySelector('.todo__items').innerHTML = fromStorage1
            this.tasks = JSON.parse(fromStorage2)
        };
        document.querySelector('.todo__options').addEventListener('change', this.update);
        document.addEventListener('click', this.action.bind(this))
    }
    update() {
        const options = document.querySelector('.todo__options').value
        document.querySelector('.todo__items').dataset.todoOption = options
        if (options !== 'active') {
            document.querySelector('.todo__text').disabled = true
        } else {
            document.querySelector('.todo__text').disabled = false
        }
    }
    action(e) {
        const target = e.target;
        if (target.classList.contains('todo__add')) {
            this.add();
            this.saveToLocalStorage();
            document.querySelector('.todo__text').value = '';
        } else if (target.classList.contains('todo__action')) {
            const action = target.dataset.todoAction;
            const itemState = document.querySelector('.todo__items').dataset.todoOption;
            target.closest('.todo__item').dataset.todoState = action;
            if (action === 'deleted' && itemState === 'deleted') {
                target.closest('.todo__item').remove()
            }
            this.changeArray(target, action);
            this.saveToLocalStorage();
        }
    }
    add() {
        const text = document.querySelector('.todo__text').value
        if (!text.length) {
            return
        }
        this.tasks.push({task: text, action: 'active'});
        document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(text));
    }
    changeArray(target, action) {
        const text = target.closest('.todo__item').textContent
        const splitText = text.replace(/\s/g,'');
        this.tasks.find(obj => obj.task === splitText).action = action;

    }
    saveToLocalStorage() {
        localStorage.setItem('todo__arr', JSON.stringify(this.tasks));
        localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
    }
    create(task) {
        return `<li class="todo__item" data-todo-state="active">
        <span class="todo__task">${task}</span>
        <button class="todo__action todo__action_restore" data-todo-action="active"></button>
        <button class="todo__action todo__action_complete" data-todo-action="completed"></button>
        <button class="todo__action todo__action_delete" data-todo-action="deleted"></button></li>`;
    }
}

let todo = new Todo();

todo.init();
// localStorage.clear()