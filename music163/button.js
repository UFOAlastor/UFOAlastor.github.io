const volume = navigator.volumeManager;

function handleKeyDown(evt) {
    switch (evt.key) {
        case 'SoftLeft':
            volume.requestUp();
            // ap.lrc.toggle();
            break;
        case 'SoftRight':
            volume.requestDown();
            // ap.list.toggle();
            break;
        case 'Call':
            break;
        case 'Enter':
            // ap.toggle();
            break;
        case 'ArrowLeft':
            // ap.skipBack();
            break;
        case 'ArrowRight':
            // ap.skipForward();
            break;
        case 'ArrowUp':
            break;
        case 'ArrowDown':
            break;
        case '*':
            break;
        case '#':
            alert("By:此店不售此书");
            break;
    };
};
document.addEventListener('keydown', handleKeyDown);