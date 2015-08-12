localStorage.getItem('obamaMediaJSON')

SMR.showThumb().setPublicFigure(JSON.parse(localStorage.getItem('obamaMediaJSON')))

///////

on home pc

var pm = JSON.parse(localStorage.getItem('previewMedia'))
SMR.showThumb().setPublicFigure(pm)