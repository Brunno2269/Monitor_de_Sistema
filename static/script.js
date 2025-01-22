document.addEventListener('DOMContentLoaded', function () {
    const cpuCtx = document.getElementById('cpuChart').getContext('2d');
    const memCtx = document.getElementById('memChart').getContext('2d');
    const cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: [], 
            datasets: [{
                label: 'Uso de CPU (%)',
                data: [], 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    const memChart = new Chart(memCtx, {
        type: 'line',
        data: {
            labels: [], 
            datasets: [{
                label: 'Uso de Memória (%)',
                data: [], 
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    function updateCharts() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                const time = new Date().toLocaleTimeString();
                cpuChart.data.labels.push(time);
                cpuChart.data.datasets[0].data.push(data.cpu_percent);
                if (cpuChart.data.labels.length > 10) {
                    cpuChart.data.labels.shift();
                    cpuChart.data.datasets[0].data.shift();
                }
                cpuChart.update();
                memChart.data.labels.push(time);
                memChart.data.datasets[0].data.push(data.mem_percent);
                if (memChart.data.labels.length > 10) {
                    memChart.data.labels.shift();
                    memChart.data.datasets[0].data.shift();
                }
                memChart.update();
            });
    }
    setInterval(updateCharts, 2000);

    window.addEventListener('beforeunload', function () {
        fetch('/fechar_guia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
    });
});