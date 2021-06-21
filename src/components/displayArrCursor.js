export default function displayArrCursor(dic){
    let curs = document.querySelector('.cursor');
    let htmlSel = document.querySelector('html');
    if(dic){
        curs.style.display = 'block'
        htmlSel.style.cursor = 'none';
    }else{
        curs.style.display = 'none'
        htmlSel.style.cursor = 'auto';
    }
}           