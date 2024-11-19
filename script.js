document.addEventListener('DOMContentLoaded', () => {
    const ganttBody = document.getElementById('gantt-body');
    const addTaskButton = document.getElementById('add-task');
    const addTimelineButton = document.getElementById('add-timeline');

    // Create a new task row
    const createTaskRow = (taskName = "New Task", barStart = 10, barWidth = 20) => {
        const row = document.createElement('div');
        row.classList.add('gantt-row');

        // Task name (editable)
        const taskNameDiv = document.createElement('div');
        taskNameDiv.classList.add('task-name');
        taskNameDiv.contentEditable = "true";
        taskNameDiv.textContent = taskName;
        row.appendChild(taskNameDiv);

        // Timeline with a draggable bar
        const timelineDiv = document.createElement('div');
        timelineDiv.classList.add('gantt-timeline');

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.tabIndex = 0; // Make focusable
        bar.style.left = `${barStart}px`;
        bar.style.width = `${barWidth}px`;
        bar.textContent = "Task";

        // Dragging functionality
        let isDragging = false;
        let startX = 0;

        bar.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            bar.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                startX = e.clientX;
                bar.style.left = `${parseInt(bar.style.left, 10) + deltaX}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                bar.style.cursor = 'grab';
            }
        });

        // Resizing functionality
        bar.addEventListener('dblclick', () => {
            const newWidth = prompt("Enter new width (px):", bar.style.width.replace("px", ""));
            if (newWidth && !isNaN(newWidth)) {
                bar.style.width = `${newWidth}px`;
            }
        });

        timelineDiv.appendChild(bar);
        row.appendChild(timelineDiv);

        return row;
    };

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const newRow = createTaskRow();
        ganttBody.appendChild(newRow);
    });

    // Add a new timeline column
    addTimelineButton.addEventListener('click', () => {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = `New Date`;
        dateDiv.contentEditable = "true";
        dateDiv.style.flex = "1";
        dateDiv.style.textAlign = "center";
        document.querySelector('.gantt-dates').appendChild(dateDiv);
    });

    // Initial setup
    ganttBody.appendChild(createTaskRow("Task 1", 50, 100));
    ganttBody.appendChild(createTaskRow("Task 2", 150, 80));
});
