document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const map = L.map('map', {
    attributionControl: false,
    scrollWheelZoom: false
  }).setView([40.6405, -8.6538], 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const redIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5817/5817087.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const parkings = [
    { name: "Parque Mercado Manuel Firmino", coords: [40.6412, -8.6534] },
    { name: "Parque Rossio", coords: [40.6400, -8.6515] },
    { name: "Parque Fórum Aveiro", coords: [40.6393, -8.6502] },
    { name: "Parque do Cais da Fonte Nova", coords: [40.6419, -8.6460] },
    { name: "Parque da Baixa de Santo António", coords: [40.6398, -8.6555] },
    { name: "Parque do Centro Cultural e de Congressos de Aveiro", coords: [40.6405, -8.6468] },
    { name: "Parque de Remadores Olímpicos", coords: [40.6410, -8.6500] },
    { name: "Parque Nossa Senhora dos Aflitos", coords: [40.6385, -8.6542] },
    { name: "Parque Nascente da Estação da CP", coords: [40.6408, -8.6550] },
    { name: "Parque da Fonte Nova", coords: [40.6415, -8.6475] },
    { name: "Parque do Parque de Exposições de Aveiro", coords: [40.6422, -8.6488] }
  ];

  // Adiciona marcadores e opções ao select
  const select = document.getElementById('local');
  if (select) {
    parkings.forEach(parking => {
      L.marker(parking.coords, { icon: redIcon }).addTo(map)
        .bindPopup(parking.name);

      const option = document.createElement('option');
      option.value = parking.name;
      option.textContent = parking.name;
      select.appendChild(option);
    });
  }

  // Inicialização de hora com setas
  function createHourPicker(idPrefix) {
    const container = document.getElementById(idPrefix + '-container');
    if (!container) return;
    
    let hour = 8;

    const display = document.createElement('span');
    display.textContent = hour + ":00";
    display.className = "hour-display";
    display.id = idPrefix + "-display";

    const leftBtn = document.createElement('button');
    leftBtn.textContent = '←';
    leftBtn.onclick = () => {
      if (hour > 0) hour--;
      display.textContent = hour + ":00";
    };

    const rightBtn = document.createElement('button');
    rightBtn.textContent = '→';
    rightBtn.onclick = () => {
      if (hour < 23) hour++;
      display.textContent = hour + ":00";
    };

    container.appendChild(leftBtn);
    container.appendChild(display);
    container.appendChild(rightBtn);
  }

  // Verificar se estamos na página que tem esses elementos
  if (document.getElementById('horaEntrada-container')) {
    createHourPicker('horaEntrada');
  }
  if (document.getElementById('horaSaida-container')) {
    createHourPicker('horaSaida');
  }
});

// POP-UP de Reporte
if (document.querySelector('.send-button')) {
  document.querySelector('.send-button').addEventListener('click', function (e) {
    e.preventDefault();
    const btn = this;
    btn.disabled = true;
    btn.classList.add('spin');

    setTimeout(() => {
      btn.classList.remove('spin');
      btn.textContent = '✔️';
      showReportPopup("O seu relatório foi enviado para a administração.");
    }, 600);
  });
}

// POP-UP de Avisos
if (document.querySelector('.send-button-admin')) {
  document.querySelector('.send-button-admin').addEventListener('click', function (e) {
    e.preventDefault();
    const btn = this;
    btn.disabled = true;
    btn.classList.add('spin');

    // Adicionar estilo de rotação
    btn.style.transition = 'transform 0.6s ease';
    btn.style.transform = 'rotate(360deg)';

    setTimeout(() => {
      btn.classList.remove('spin');
      btn.textContent = '✔️';
      showReportPopup("O seu aviso foi publicado.");
    }, 600);
  });
}

// POP-UP de Reserva
if (document.querySelector('.reservation-form')) {
  document.querySelector('.reservation-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Verificar se os campos de hora estão nos seletores ou campos de texto
    let horaEntrada, horaSaida;
    
    // Verificar se estamos na página HTML original ou na versão modificada
    const horaEntradaDisplay = document.getElementById('horaEntrada-display');
    const horaSaidaDisplay = document.getElementById('horaSaida-display');
    
    if (horaEntradaDisplay && horaSaidaDisplay) {
      // Versão com botões de seta
      horaEntrada = horaEntradaDisplay.textContent;
      horaSaida = horaSaidaDisplay.textContent;
      
      // Verificar se as horas são iguais
      if (horaEntrada === horaSaida) {
        showReportPopup("Não é possível fazer reserva com horário de entrada e saída iguais!");
        return;
      }
    } else {
      // Versão com menus suspensos
      horaEntrada = document.getElementById('horaentrada').value;
      horaSaida = document.getElementById('checkout').value;
      
      // Verificar se as horas são iguais
      if (horaEntrada === horaSaida) {
        showReportPopup("Não é possível fazer reserva com horário de entrada e saída iguais!");
        return;
      }
    }

    const local = document.getElementById('local').value;
    
    let imageSrc = '';

    if (local.includes('Mercado Manuel Firmino')) {
      imageSrc = 'parque1.jpg';
    } else if (local.includes('Rossio')) {
      imageSrc = 'parque2.jpg';
    } else if (local.includes('Fórum Aveiro')) {
      imageSrc = 'parque3.jpg';
    } else if (local.includes('Cais da Fonte Nova')) {
      imageSrc = 'parque4.jpg';
    } else if (local.includes('Baixa de Santo António')) {
      imageSrc = 'parque5.jpg';
    } else if (local.includes('Centro Cultural e de Congressos')) {
      imageSrc = 'parque6.jpg';
    } else if (local.includes('Remadores Olímpicos')) {
      imageSrc = 'parque7.jpg';
    } else if (local.includes('Nossa Senhora dos Aflitos')) {
      imageSrc = 'parque8.jpg';
    } else if (local.includes('Nascente da Estação')) {
      imageSrc = 'parque9.jpg';
    } else if (local.includes('Fonte Nova')) {
      imageSrc = 'parque10.jpg';
    } else if (local.includes('Parque de Exposições')) {
      imageSrc = 'parque11.jpg';
    } else {
      imageSrc = 'parque-default.jpg';
    }

    const popupContent = `
      <strong>Reserva para:</strong><br>
      ${local}
      <img src="${imageSrc}" alt="Imagem do parque" />
    `;
    showReservationPopup(popupContent, local, imageSrc, horaEntrada, horaSaida);
  });
}

function showReportPopup(content) {
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay report-popup';
  popupOverlay.innerHTML = `
      <div class="popup-box report-box">
          ${content}
          <br><br>
          <button onclick="this.parentElement.parentElement.remove()">Ok!</button>
      </div>
  `;
  document.body.appendChild(popupOverlay);
  popupOverlay.style.display = 'flex';
}

function showReservationPopup(content, local, imageSrc, horaEntrada, horaSaida) {
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay reservation-popup';
  popupOverlay.innerHTML = `
      <div class="popup-box reservation-box">
          ${content}
          <br><br>
          <button onclick="this.parentElement.parentElement.remove()">Fechar</button>
          <button onclick="processReservation('${local}', '${imageSrc}', '${horaEntrada}', '${horaSaida}')">Continuar</button>
      </div>
  `;
  document.body.appendChild(popupOverlay);
  popupOverlay.style.display = 'flex';
}

function processReservation(local, imageSrc, horaEntrada, horaSaida) {
  // Remover popup atual
  document.querySelector('.reservation-popup').remove();
  
  // Obter a data do formulário ou usar a data atual
  let dataFormatada;
  const checkinInput = document.getElementById('checkin');
  
  if (checkinInput) {
    const dataInput = checkinInput.value;
    const dataObj = new Date(dataInput);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    dataFormatada = `${dia}/${mes}/${ano}`;
  } else {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    dataFormatada = `${dia}/${mes}/${ano}`;
  }
  
  // Calcular diferença de horas para preço
  const entradaHora = parseInt(horaEntrada.split(':')[0]);
  const saidaHora = parseInt(horaSaida.split(':')[0]);
  let horasDiferenca = saidaHora - entradaHora;
  if (horasDiferenca <= 0) horasDiferenca += 24; // Caso o horário de saída seja no dia seguinte
  const preco = (horasDiferenca * 1.5).toFixed(2); // 1.5€ por hora
  
  showPaymentPopup(local, dataFormatada, horaEntrada, horaSaida, preco, imageSrc);
}

function showPaymentPopup(local, data, horaEntrada, horaSaida, preco, parkingImage) {
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay payment-popup';

  if (!parkingImage) {
    // Backup para a versão anterior
    if (local.includes('Mercado Manuel Firmino')) {
      parkingImage = 'parque1.jpg';
    } else if (local.includes('Rossio')) {
      parkingImage = 'parque2.jpg';
    } else if (local.includes('Fórum Aveiro')) {
      parkingImage = 'parque3.jpg';
    } else if (local.includes('Cais da Fonte Nova')) {
      parkingImage = 'parque4.jpg';
    } else if (local.includes('Baixa de Santo António')) {
      parkingImage = 'parque5.jpg';
    } else if (local.includes('Centro Cultural e de Congressos')) {
      parkingImage = 'parque6.jpg';
    } else if (local.includes('Remadores Olímpicos')) {
      parkingImage = 'parque7.jpg';
    } else if (local.includes('Nossa Senhora dos Aflitos')) {
      parkingImage = 'parque8.jpg';
    } else if (local.includes('Nascente da Estação')) {
      parkingImage = 'parque9.jpg';
    } else if (local.includes('Fonte Nova')) {
      parkingImage = 'parque10.jpg';
    } else if (local.includes('Parque de Exposições')) {
      parkingImage = 'parque11.jpg';
    } else {
      parkingImage = 'parque-default.jpg';
    }
  }

  popupOverlay.innerHTML = `
    <div class="popup-box payment-box">
        <h2>Efetuar Pagamento:</h2>

        <div class="info-container">
            <img src="${parkingImage}" class="parking-image" alt="Parque de estacionamento">
            <div class="info-text">
                <div class="location-container">
                    <span class="location-icon"></span>
                    <span>${local}</span>
                </div>
                <div>${data}</div>
                <div>${horaEntrada} - ${horaSaida}</div>
            </div>
            <div class="total-price">TOTAL: ${preco}€</div>
        </div>

        <div class="form-group">
            <label>Número do Cartão:</label>
            <input type="text" placeholder="Ex: 1234 1234 1234 1234">
        </div>

        <div class="form-group">
            <label>Titular da Conta:</label>
            <input type="text" placeholder="Ex: Joshua Hernandez">
        </div>

        <div class="form-group">
            <label>Validade:</label>
            <div class="validity-container">
                <input type="text" placeholder="Ex: Abril">
                <input type="text" placeholder="Ex: 2027">
            </div>
        </div>

        <div class="form-group">
            <label>CVC:</label>
            <input type="text" placeholder="Ex: 123">
        </div>

        <div class="buttons-container">
            <button class="cancel-btn" onclick="this.parentElement.parentElement.parentElement.remove()">Cancelar</button>
            <button class="pay-btn" onclick="finalizarPagamento('${local}', '${data}', '${horaEntrada}', '${horaSaida}', ${preco}, '${parkingImage}')">Pagar</button>
        </div>
    </div>
  `;
  document.body.appendChild(popupOverlay);
  popupOverlay.style.display = 'flex';
}

function finalizarPagamento(local, data, horaEntrada, horaSaida, preco, parkingImage) {
  // Remover popup de pagamento
  document.querySelector('.payment-popup').remove();

  // Gerar número de reserva aleatório
  const numeroReserva = Math.floor(100000 + Math.random() * 900000);
  
  // Gerar número de lugar aleatório (entre 1 e 50)
  const lugarEstacionamento = Math.floor(1 + Math.random() * 50);

  // Salvar reserva no localStorage
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
  // Criar objeto de reserva
  const novaReserva = {
    local: local,
    data: data,
    horaEntrada: horaEntrada,
    horaSaida: horaSaida,
    preco: preco,
    parkingImage: parkingImage,
    numeroReserva: numeroReserva,
    lugar: lugarEstacionamento
  };
  
  // Adicionar à lista de reservas
  reservas.push(novaReserva);
  
  // Guardar no localStorage
  localStorage.setItem('reservas', JSON.stringify(reservas));
  // Criar popup de confirmação
  let popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay confirmation-popup';
  popupOverlay.innerHTML = `
    <div class="popup-box confirmation-box" style="margin-top: 0vh;"> 
      <h2>Reserva Concluída!</h2>
      <div class="confirmation-message">
          <p>A sua reserva foi concluída com sucesso!</p>
      </div>
      <div class="buttons-container" style="display: flex; gap: 10px;">
          <button class="ok-btn" style="flex: 1; width: 80px;" onclick="this.parentElement.parentElement.parentElement.remove()">Fechar</button>
          <button class="ver-reservas-btn" style="flex: 1; width: 50px;" onclick="window.location.href='reservas.html'">Ver Reservas</button>
      </div>
    </div>
  `;
  document.body.appendChild(popupOverlay);
  popupOverlay.style.display = 'flex';
}
