export default function addToast(type: string, mess: string, id: string) {
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type === 'Error' ? 'error' : 'success'}`);

  const toast_icon = document.createElement('div');
  toast_icon.classList.add('toast-icon');
  toast_icon.innerHTML = `
  <span>
    ${type === 'Error' ? '<i class="fa-solid fa-xmark" />' : '<i class="fa-solid fa-check" />'}
  </span>`;
  toast.appendChild(toast_icon);

  const toast_text = document.createElement('div');
  toast_text.classList.add('toast-text');
  toast_text.innerHTML = `
    <p class="toast-text-title">${type === 'Error' ? 'Error!' : 'Success!'}</p>
    <p class="toast-text-mess">${mess}</p>
  `;
  toast.appendChild(toast_text);

  const toast_close = document.createElement('div');
  toast_close.classList.add('toast-close');
  toast_close.innerHTML = `
    <button class="btn-icon">
      <i class="fa-solid fa-xmark"></i> 
    </button>
  `;
  toast.appendChild(toast_close);

  document.getElementById(id)?.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hidden');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}
