function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getMenuNames(obj){
    for (var key in obj) {
        if (obj.hasOwnProperty('menu')) return 'Menu';
        if (obj.hasOwnProperty('al1')) return 'Alternative 1';
        if (obj.hasOwnProperty('al2')) return 'Alternative 2';
        if (obj.hasOwnProperty('br')) return obj.br;
    }
}