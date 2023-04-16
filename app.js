const alturaIS = document.querySelector('.altura');
const pesoIS = document.querySelector('.peso');
const btnIS = document.querySelector('.btn');
const resIS = document.querySelector('.res');

let imcIs;
let alturaISvalida;
let pesoISvalida;

function validarDigito(text,name){
    return (name == 'altura')?
    text.replace(/[^0-9.]/g,"").replace(/^(\d{1})(\d{2})/,"$1.$2"):
    
    text.replace(/[^0-9.]/g,"").replace(/^(\d{3})(\d{1})/,"$1.$2");
}

[alturaIS, pesoIS].forEach((el)=>{
   
   el.addEventListener("input", (e)=>{
     const up = validarDigito(e.target.value, e.target.className);
     e.target.value = up;
   })

})

const calcular = (e) =>{  
   
    if(!validador(e)){        
        return
    }    
    
    alturaISvalida = +alturaIS.value;
    pesoISvalida = +pesoIS.value;          

    imcIs = (pesoISvalida/(alturaISvalida**2)).toFixed(2);

    alturaIS.value = '';
    pesoIS.value = '';

    let tabelaIS;
    tabelaIS = tabela(+imcIs)
    console.log(tabelaIS);

    mostraRes(tabelaIS, imcIs);
}

const mostraRes = (tabela, valor)=>{
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const p2 = document.createElement('p');

    h2.insertAdjacentText('afterbegin','resultado:') 
    p.insertAdjacentHTML('beforeend',`tabela: ${tabela} <br>`) 
    p2.insertAdjacentHTML('beforeend',`IMC: ${valor}`)  

    h2.style.textAlign = 'center'

    resIS.appendChild(h2);
    resIS.appendChild(p);
    resIS.appendChild(p2);

    resIS.style.display = 'inline';
    console.log(resIS);
    setInterval(() => {
       resIS.removeChild(h2);
       resIS.removeChild(p);
       resIS.removeChild(p2);

       resIS.style.display = 'none'
    }, 10000);

}

const tabela = (imc) => {

    if (imc <= 18.5) {
        imc = 'Abaixo do peso normal'
    } else if (imc <= 24.5) {
        imc = 'Peso normal'
    } else if (imc <= 29.9) {
        imc = 'Excesso de peso'   
    } else if (imc <= 34.9) {
        imc = 'Obesidade classe |'
    } else if (imc <= 39.9) {
        imc = 'Obesidade classe ||'
    } else if(imc > 40) {
        imc = 'Obesidade classe |||'
    } else{
        imc = '[ERRO] dados invalido!!!'
    }

    return imc;
}

const validador = (a)=> {
    if(a.target.className === 'btn'){
        if(!alturaIS.value || !pesoIS.value){
            console.log(a.target.className);
            const Span = document.querySelector( `.${a.target.className} + span`);
            Span.style.display = 'inline-block';
            btnIS.disabled = true;
            setInterval(() => {
                Span.style.display = 'none';    
            }, 5000);
            return
        }
        return true
    }

    const Span = document.querySelector( `.${a.target.className} + span`);
    console.log(`.${a.target.className} + span`);
    if(!a.target.value){
        Span.style.display = 'inline-block';
        btnIS.disabled = true;
        setInterval(() => {
            Span.style.display = 'none';    
        }, 5000);
        return
    } 
        btnIS.disabled = false;
        Span.style.display = 'none';
}

alturaIS.addEventListener('blur',validador);
pesoIS.addEventListener('blur', validador);
btnIS.addEventListener('click', calcular);