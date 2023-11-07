const baseSize = 16
function setRem() {
    const scale = document.documentElement.clientWidth / 828
    document.documentElement.style.fontSize = baseSize * scale + 'px'
}
setRem()
window.onresize = function () {
    setRem()
}
