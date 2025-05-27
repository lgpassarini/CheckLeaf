const habits = ['habit1','habit2','habit3','habit4','habit5','habit6','habit7','habit8','habit9'];

function verificarData() {
    const hoje = new Date().toLocaleDateString();
    const dataSalva = localStorage.getItem('dataCheck');
    if (dataSalva !== hoje) {
        localStorage.clear();
        localStorage.setItem('dataCheck', hoje);
    }
}

function salvarEstado() {
    habits.forEach(id => {
        const check = document.getElementById(id);
        localStorage.setItem(id, check.checked);
    });
}

function carregarEstado() {
    habits.forEach(id => {
        const check = document.getElementById(id);
        const valor = localStorage.getItem(id) === 'true';
        check.checked = valor;
    });
}

function calcular() {
    document.getElementById('formulario').classList.add('hidden');
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        verificar();
        document.getElementById('resultado').style.display = 'block';
    }, 1500);
}

function verificar() {
    const total = habits.length;
    let feitos = 0;
    habits.forEach(id => {
        const check = document.getElementById(id);
        if (check.checked) feitos++;
    });
    salvarEstado();
    const percentual = Math.round((feitos/total)*100);
    let feedback = '';
    if (percentual === 100) feedback = 'Incrível! Você está fazendo sua parte pelo planeta!';
    else if (percentual >= 70) feedback = 'Ótimo! Você tem atitudes muito sustentáveis!';
    else if (percentual >= 40) feedback = 'Bom, mas ainda pode melhorar.';
    else feedback = 'Vamos começar a mudar juntos! Pequenas ações fazem a diferença.';
    document.getElementById('textoResultado').innerHTML = `Você concluiu ${feitos} de ${total} ações (${percentual}%).<br><br>${feedback}`;
}

function voltar() {
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('formulario').classList.remove('hidden');
}

function openSidebar() {
    document.getElementById('sidebar').classList.add('active');
    document.getElementById('helperBtn').style.display = 'none';
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('helperBtn').style.display = 'flex';
}

verificarData();
carregarEstado();
