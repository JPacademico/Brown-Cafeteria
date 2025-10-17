document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('orderModal');
  const closeModal = document.getElementById('closeModal');
  const cancelOrder = document.getElementById('cancelOrder');
  const orderForm = document.getElementById('orderForm');
  const menuCards = document.querySelectorAll('.menu-item-card');
  const toast = document.getElementById('toast');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const coffeeIcon = document.getElementById('coffeeIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  menuCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      openOrderModal(this);
    });
  });

  function closeOrderModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
  }

  function openOrderModal(card) {
    const productImage = card.querySelector('.menu-item-media img');
    const productName = card.querySelector('.menu-item-content h3');
    const productDescription = card.querySelector('.menu-item-content p');
    const productPrice = card.querySelector('.menu-item-content .price');

    document.getElementById('modalProductImage').src = productImage.src;
    document.getElementById('modalProductImage').alt = productImage.alt;
    document.getElementById('modalProductName').textContent = productName.textContent;
    document.getElementById('modalProductDescription').textContent = productDescription.textContent;
    document.getElementById('modalProductPrice').textContent = productPrice.textContent;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function resetForm() {
    orderForm.reset();
    document.getElementById('quantity').value = 1;
  }

  closeModal.addEventListener('click', closeOrderModal);
  cancelOrder.addEventListener('click', closeOrderModal);

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeOrderModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeOrderModal();
  });

  orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    formData.append('produto', document.getElementById('modalProductName').textContent);
    formData.append('horario', new Date().toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));

    processOrder(formData);
  });

  async function processOrder(formData) {
    showToast('loading', 'Enviando pedido...', 'Aguarde enquanto processamos seu pedido.');
    
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyPr32sDDfU0HHcLuyuaimnsHXF5hxvBSQ8eqohf1ZrW5JzfZfiYgMzR0wIkWaDQF-b/exec';

      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formData
      });

      if (response.ok || response.status === 0) {
        const orderData = {
          product: {
            name: formData.get('produto'),
            description: document.getElementById('modalProductDescription').textContent,
            price: document.getElementById('modalProductPrice').textContent
          },
          quantity: formData.get('quantidade'),
          tableNumber: formData.get('mesa'),
          orderType: formData.get('viagem')
        };
        
        showToast('success', 'Pedido enviado!', `Seu pedido de ${orderData.product.name} foi registrado com sucesso.`);
        closeOrderModal();
      } else {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

    } catch (error) {
      showToast('error', 'Erro no pedido', 'Houve um problema ao enviar seu pedido. Tente novamente.');
    }
  }

  function showToast(type, title, message) {
    toast.className = `toast ${type}`;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    loadingSpinner.style.display = type === 'loading' ? 'block' : 'none';
    coffeeIcon.style.display = type === 'loading' ? 'none' : 'block';
    
    toast.classList.add('show');
    
    if (type !== 'loading') setTimeout(() => toast.classList.remove('show'), 5000);
  }
});
 
