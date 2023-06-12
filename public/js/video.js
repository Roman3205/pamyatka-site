//Создаем элементы списка с помощью цикла и массива//
ul1Node = document.querySelector(`.ul1`)
ul2Node = document.querySelector(`.ul2`)
let ulist1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let ulist2 = [10, 11, 12, 13.1, 13.2, 14, 15.1, 15.2]
for (let i = 0; i < ulist1.length; i++) {
    ul1Node.innerHTML += `
        <li>
            <p id="li${ulist1[i]}" class="litem">Задание ${ulist1[i]}</p>   
        </li>
        `
}

for (let i = 0; i < ulist2.length; i++) {
    ul2Node.innerHTML += `
        <li>
            <p id="li${ulist2[i]}" class="litem">Задание ${ulist2[i]}</p>   
        </li>
        `
}
ul2Node.innerHTML += `
<li><p id="li16" class="text-muted" style="border: none;">Заполнение бланков</p></li>
`
    //Создаем экраны//
iframesNode = document.querySelector(`.iframes`)
let links = [
    `https://www.youtube.com/embed/9H9xAK3Y25o`,
    `https://www.youtube.com/embed/CEtG5MUmvWM`,
    `https://www.youtube.com/embed/Ekrt54b_8as`,
    `https://www.youtube.com/embed/8lv-35Y1yQY`,
    `https://www.youtube.com/embed/ybwyb-CdNTg`,
    `https://www.youtube.com/embed/R2upK0ujKaQ`,
    `https://www.youtube.com/embed/1qHXzmYnO7A`,
    `https://www.youtube.com/embed/xxxI27oFs1E`,
    `https://www.youtube.com/embed/Xrjl7lv3sVM`,
    `https://www.youtube.com/embed/HNXq5tJS8Fg`,
    `https://www.youtube.com/embed/lbgNJVePReA`,
    `https://www.youtube.com/embed/CDIZ8jIfnWU`,
    `https://www.youtube.com/embed/NecFCDQnEJ8`,
    `https://www.youtube.com/embed/JPbaATVHMIE`,
    `https://www.youtube.com/embed/1JkOdpQ2LAQ`,
    `https://www.youtube.com/embed/CK_TyVIXNFk`,
    `https://www.youtube.com/embed/CpK_k2H3v0s`
]

//Находим все элементы и вешаем обработчик событий на каждый//
let litems = document.querySelectorAll(`.litem`)
for (let i = 0; i < litems.length; i++) {
    let litem = litems[i]
    litem.addEventListener(`click`, function() {
        iframesNode.innerHTML = `
            <iframe id="iframe1" class="iframe" width="560" height="315" src="${links[i]}" frameborder="0" allowfullscreen>
            `
    })
}
blankNode = document.querySelector(`#li16`)
blankNode.addEventListener(`click`, function() {
        iframesNode.innerHTML = `
    <iframe id="iframe1" class="iframe" width="560" height="315" src="https://www.youtube.com/embed/iNxV6ebiMyo" frameborder="0" allowfullscreen>
    `
    })
    //Удаление видео с экрана//
deletespanNode = document.querySelector(`#deletespan`)
deletespanNode.addEventListener(`click`, function() {
    iframesNode.innerHTML = ``
})