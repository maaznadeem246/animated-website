export default function displayArrCursor(dic){
    let curs = document.querySelector('.cursor');
    if(dic){
        curs.style.display = 'block'
        curs.style.cursor = 'none';
    }else{
        curs.style.display = 'none'
        curs.style.cursor = 'auto';
    }
}   