var moment = require('moment');
global.moment = moment;
(function () {
    'use strict';
    var menu = new Menu( /* pass cut, copy, paste labels if you need i18n*/ );

    function Menu(cutLabel, copyLabel, pasteLabel) {
        var gui = require('nw.gui'),
            menu = new gui.Menu(),
            cut = new gui.MenuItem({
                label: cutLabel || "Cut",
                click: function () {
                    document.execCommand("cut");
                }
            }),
            copy = new gui.MenuItem({
                label: copyLabel || "Copy",
                click: function () {
                    document.execCommand("copy");
                }
            }),
            paste = new gui.MenuItem({
                label: pasteLabel || "Paste",
                click: function () {
                    document.execCommand("paste");
                }
            }),
            devtools = new gui.MenuItem({
                label: "devtools",
                click: function () {
                    Window.showDevtools();
                }
            });


        menu.append(cut);
        menu.append(copy);
        menu.append(paste);

        return menu;
    }

    document.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
        menu.popup(ev.x, ev.y);
        return false;
    });
}());