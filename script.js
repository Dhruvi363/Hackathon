// Array to store created study groups
let studyGroups = [];

// Function to render study groups
function renderStudyGroups() {
  const groupList = document.getElementById('groupList');
  groupList.innerHTML = ''; // Clear existing groups

  studyGroups.forEach((group, index) => {
    const groupCard = document.createElement('div');
    groupCard.className = 'group-card';
    groupCard.innerHTML = `
      <h3>${group.name}</h3>
      <p>Focus: ${group.focus}</p>
      <button class="join-button" data-index="${index}">Join</button>
      <button class="details-button" data-index="${index}">Details</button>
    `;
    groupList.appendChild(groupCard);
  });

  // Add event listeners to the "Join" buttons
  document.querySelectorAll('.join-button').forEach(button => {
    button.addEventListener('click', () => {
      showJoinedPopup();
    });
  });

  // Add event listeners to the "Details" buttons
  document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', () => {
      const groupIndex = button.getAttribute('data-index');
      const group = studyGroups[groupIndex];
      showGroupDetails(group);
    });
  });
}

// Function to show "Joined" popup
function showJoinedPopup() {
  const popup = document.getElementById('joinedPopup');
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000); // Hide after 2 seconds
}

// Function to show group details in a modal
function showGroupDetails(group) {
  document.getElementById('groupNameTitle').textContent = group.name;

  // Display goals with checkboxes
  const goalsList = document.getElementById('groupGoals');
  goalsList.innerHTML = group.goals
    .map(
      (goal) => `
      <li>
        <input type="checkbox" id="goal-${group.goals.indexOf(goal)}" onchange="updateProgress()">
        <label for="goal-${group.goals.indexOf(goal)}">${goal}</label>
      </li>
    `
    )
    .join('');

  // Display tasks with checkboxes
  const tasksList = document.getElementById('groupTasks');
  tasksList.innerHTML = group.tasks
    .map(
      (task) => `
      <li>
        <input type="checkbox" id="task-${group.tasks.indexOf(task)}" onchange="updateProgress()">
        <label for="task-${group.tasks.indexOf(task)}">${task}</label>
      </li>
    `
    )
    .join('');

  // Initialize progress bar
  updateProgress();

  // Show the modal
  document.getElementById('groupDetailsModal').style.display = 'flex';
}

// Function to update progress bar
function updateProgress() {
  const goals = document.querySelectorAll('#groupGoals input[type="checkbox"]');
  const tasks = document.querySelectorAll('#groupTasks input[type="checkbox"]');
  const totalItems = goals.length + tasks.length;

  let completedItems = 0;
  goals.forEach((checkbox) => {
    if (checkbox.checked) completedItems++;
  });
  tasks.forEach((checkbox) => {
    if (checkbox.checked) completedItems++;
  });

  const progress = Math.round((completedItems / totalItems) * 100);
  const progressFill = document.getElementById('groupProgressFill');
  const progressText = document.getElementById('groupProgressText');

  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}% completed`;
}

// Create Group Form Submission
document.getElementById('createGroupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const groupName = document.getElementById('groupName').value;
  const groupFocus = document.getElementById('groupFocus').value;
  const groupGoals = document.getElementById('groupGoalsInput').value.split('\n').filter(goal => goal.trim() !== '');
  const groupTasks = document.getElementById('groupTasksInput').value.split('\n').filter(task => task.trim() !== '');

  // Add the new group to the array
  studyGroups.push({
    name: groupName,
    focus: groupFocus,
    goals: groupGoals,
    tasks: groupTasks
  });

  // Render the updated list of groups
  renderStudyGroups();

  // Reset the form
  document.getElementById('createGroupForm').reset();
});

// Open Login/Signup Modal
document.getElementById('getStarted').addEventListener('click', () => {
  document.getElementById('loginModal').style.display = 'flex';
});

document.getElementById('openModal').addEventListener('click', () => {
  document.getElementById('loginModal').style.display = 'flex';
});

// Close Modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  });
});

// Close Modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});