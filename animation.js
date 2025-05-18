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

$(document).ready(function(){
  // Ajustar altura dos cartões para serem todos iguais
  function equalizeCardHeights() {
    var maxHeight = 0;
    $('.parkCards .card').css('height', 'auto'); // Reset heights
    $('.parkCards .card').each(function() {
      var h = $(this).outerHeight();
      if (h > maxHeight) maxHeight = h;
    });
    $('.parkCards .card').css('height', maxHeight + 'px');
  }

  $('.parkCards').on('setPosition', function(){
    equalizeCardHeights();
  });

  $('.parkCards').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    draggable: true,
    swipe: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Chamar ao carregar e ao redimensionar
  equalizeCardHeights();
  $(window).on('resize', function(){
    equalizeCardHeights();
  });
});

const monthlyData = [
  {
    month: "Janeiro 2025",
    total: 8990.75,
    evolution: -2.5,
    parks: [
      { name: "Parque do Rossio", value: 2950.50, color: '#20C5B5' },
      { name: "Parque das Salinas", value: 850.25, color: '#4B8BF4' },
      { name: "Parque dos Lodos", value: 95.00, color: '#6A5ACD' },
      { name: "Parque da Praça", value: 890.00, color: '#F7A139' },
      { name: "Parque do Fórum", value: 480.00, color: '#FF7F50' },
      { name: "Parque da Baixa", value: 650.00, color: '#9370DB' },
      { name: "Parque do Cais", value: 420.00, color: '#48D1CC' }
    ]
  },
  {
    month: "Fevereiro 2025",
    total: 9430.25,
    evolution: 4.9,
    parks: [
      { name: "Parque do Rossio", value: 3050.25, color: '#20C5B5' },
      { name: "Parque das Salinas", value: 925.00, color: '#4B8BF4' },
      { name: "Parque dos Lodos", value: 110.00, color: '#6A5ACD' },
      { name: "Parque da Praça", value: 950.00, color: '#F7A139' },
      { name: "Parque do Fórum", value: 525.00, color: '#FF7F50' },
      { name: "Parque da Baixa", value: 720.00, color: '#9370DB' },
      { name: "Parque do Cais", value: 500.00, color: '#48D1CC' }
    ]
  },
  {
    month: "Março 2025",
    total: 10175.50,
    evolution: 7.9,
    parks: [
      { name: "Parque do Rossio", value: 3262.75, color: '#20C5B5' },
      { name: "Parque das Salinas", value: 1000.00, color: '#4B8BF4' },
      { name: "Parque dos Lodos", value: 120.00, color: '#6A5ACD' },
      { name: "Parque da Praça", value: 1040.50, color: '#F7A139' },
      { name: "Parque do Fórum", value: 550.00, color: '#FF7F50' },
      { name: "Parque da Baixa", value: 770.00, color: '#9370DB' },
      { name: "Parque do Cais", value: 650.00, color: '#48D1CC' }
    ]
  },
  {
    month: "Abril 2025",
    total: 11020.80,
    evolution: 8.3,
    parks: [
      { name: "Parque do Rossio", value: 3500.30, color: '#20C5B5' },
      { name: "Parque das Salinas", value: 1150.00, color: '#4B8BF4' },
      { name: "Parque dos Lodos", value: 135.50, color: '#6A5ACD' },
      { name: "Parque da Praça", value: 1170.00, color: '#F7A139' },
      { name: "Parque do Fórum", value: 600.00, color: '#FF7F50' },
      { name: "Parque da Baixa", value: 790.00, color: '#9370DB' },
      { name: "Parque do Cais", value: 675.00, color: '#48D1CC' }
    ]
  }

];


let currentMonthIndex = 3; // Começar em Março 2025
let chartType = 'pie';
let currentChart = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderChart();
    updateLegend();
    updateTotalDisplay();

    // Event Listeners
    document.getElementById('prev-month').addEventListener('click', showPreviousMonth);
    document.getElementById('next-month').addEventListener('click', showNextMonth);
});

function renderChart() {
    const ctx = document.getElementById('lucrosChart').getContext('2d');
    
    // Destruir o gráfico anterior se existir
    if (currentChart) {
        currentChart.destroy();
    }

    const currentData = monthlyData[currentMonthIndex];
    const chartData = {
        labels: currentData.parks.map(park => park.name),
        datasets: [{
            data: currentData.parks.map(park => park.value),
            backgroundColor: currentData.parks.map(park => park.color),
            borderWidth: 0,
            hoverOffset: 15
        }]
    };

    const config = {
        type: chartType,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return `${value.toFixed(2)}€`;
                        }
                    }
                }
            }
        }
    };

    // Configurações específicas para o gráfico de barras
  

    currentChart = new Chart(ctx, config);
}

function updateLegend() {
    const currentData = monthlyData[currentMonthIndex];
    const legendContainer = document.getElementById('legend-container');
    legendContainer.innerHTML = '';
    
    currentData.parks.forEach(park => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const legendColor = document.createElement('div');
        legendColor.className = 'legend-color';
        legendColor.style.backgroundColor = park.color;
        
        const legendText = document.createElement('div');
        legendText.className = 'legend-text';
        legendText.textContent = park.name;
        
        const legendValue = document.createElement('div');
        legendValue.className = 'legend-value';
        legendValue.textContent = park.value.toFixed(2) + '€';
        
        legendItem.appendChild(legendColor);
        legendItem.appendChild(legendText);
        legendItem.appendChild(legendValue);
        legendContainer.appendChild(legendItem);
    });
    
    document.getElementById('month-title').textContent = currentData.month;
}

function updateTotalDisplay() {
    const currentData = monthlyData[currentMonthIndex];
    document.getElementById('total-lucros').textContent = currentData.total.toFixed(2) + '€';
    
    const evolutionElement = document.getElementById('evolution-value');
    evolutionElement.textContent = currentData.evolution + '%';
    
    if (currentData.evolution >= 0) {
        evolutionElement.className = 'positive-evolution';
        document.getElementById('evolution-icon').textContent = '📈';
    } else {
        evolutionElement.className = 'negative-evolution';
        document.getElementById('evolution-icon').textContent = '📉';
    }
}

function showPreviousMonth() {
    if (currentMonthIndex > 0) {
        currentMonthIndex--;
        renderChart();
        updateLegend();
        updateTotalDisplay();
    }
}

function showNextMonth() {
    if (currentMonthIndex < monthlyData.length - 1) {
        currentMonthIndex++;
        renderChart();
        updateLegend();
        updateTotalDisplay();
    }
}

function toggleDropdown() {
    document.getElementById("chartTypeDropdown").classList.toggle("show");
}

function changeChartType(type) {
    chartType = type;
    renderChart();
    document.getElementById("chartTypeDropdown").classList.remove("show");
}

// Fechar o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.chart-type-button')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}