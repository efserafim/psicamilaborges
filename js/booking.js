// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Calendly booking modality switching
(function() {
  const loadingElement = document.getElementById('calendly-loading');
  const calendlyWidget = document.getElementById('calendly-widget');
  const modalityBtns = document.querySelectorAll('.modality-btn');

  const urls = {
    presencial: calendlyWidget.getAttribute('data-url-presencial'),
    online: calendlyWidget.getAttribute('data-url-online')
  };
  
  function hideLoading() {
    if (loadingElement && loadingElement.style.display !== 'none') {
      loadingElement.classList.add('fade-out');
      setTimeout(function() {
        loadingElement.style.display = 'none';
      }, 500);
    }
  }

  modalityBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const modality = this.getAttribute('data-modality');
      const newUrl = urls[modality];
      
      if (newUrl) {

        modalityBtns.forEach(function(b) {
          b.classList.remove('active');
        });

        this.classList.add('active');

        calendlyWidget.setAttribute('data-url', newUrl);
        sessionStorage.setItem('selectedModality', modality);
        window.location.href = window.location.href.split('?')[0] + '?modality=' + modality;
      }
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const selectedModality = urlParams.get('modality') || sessionStorage.getItem('selectedModality') || 'presencial';

  if (urls[selectedModality]) {
    calendlyWidget.setAttribute('data-url', urls[selectedModality]);
  }

  modalityBtns.forEach(function(btn) {
    if (btn.getAttribute('data-modality') === selectedModality) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  window.addEventListener('message', function(e) {
    if (e.data.event && e.data.event.indexOf('calendly') === 0) {
      hideLoading();
    }
  });

  setTimeout(hideLoading, 3000);
})();
