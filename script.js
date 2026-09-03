// Select all buttons and all content sections
const buttons = document.querySelectorAll('.PersoonsButtons button');
const contents = document.querySelectorAll('.tab-content');

// Show the first section (Profile) by default on page load
document.getElementById('profile').classList.add('active');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // 1. Hide all content sections
    contents.forEach(content => content.classList.remove('active'));

    // 2. Get the ID from the clicked button's data-target attribute
    const targetId = button.getAttribute('data-target');

    // 3. Add 'active' class to the target section to display it
    document.getElementById(targetId).classList.add('active');
  });
});

const copyNotice = document.getElementById("copyNotice");

function copyContact(contact) {
  const text = contact.dataset.copyValue;

  if (!text) {
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    copyNotice.textContent = `${text} copied`;
    copyNotice.classList.add("show");
    setTimeout(() => copyNotice.classList.remove("show"), 2000);
  });
}

document.querySelectorAll(".copy-contact").forEach((contact) => {
  contact.addEventListener("click", () => copyContact(contact));
  contact.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyContact(contact);
    }
  });
});