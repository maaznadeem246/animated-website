export default function displayArrCursor(dic){
    let curs = document.querySelector('.cursor');
    let htmlSel = document.querySelector('html');
    if(dic ){
        if(curs?.style && htmlSel?.style){
            console.log('c')
            curs.style.display = 'block'
            htmlSel.style.cursor = 'none';
        }
    }else{
        console.log('n')
        if(curs?.style && htmlSel?.style){
            console.log('n1')
            curs.style.display = 'none'
            htmlSel.style.cursor = 'auto';
        }
    }
}           