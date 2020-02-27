let table;
let affinn = {}

function preload() {
    table = loadTable('AFINN-111.txt', 'tsv');
}

function setup() {
    noCanvas();
    console.log(table);
    table.forEach(element => console.log(element));
}

function draw() {

}