const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// 一覧表示
const showTasks = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks");

        // タスクが1つもない場合
        if (tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
            return;
        }

        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task;

            return `<div class="single-task">
            <h5>
                <span><i class="fas fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <a href="#" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`
        })
        .join("");
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
}

showTasks();

// 新規作成
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDOM.value;

    try {
        await axios.post("/api/v1/tasks", { name: name });
        showTasks();
        taskInputDOM.value = "";

        // 入力後の文字追加
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "タスクを追加しました";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

// 削除
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    const parentElement = element.parentElement;
    if (parentElement.classList.contains("delete-btn")) {
        const id = parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});
