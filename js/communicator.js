;"use strict";

function Thread() {
    this.agent = window.localStorage.getItem("agent");

    if (!this.agent) {
        throw "No session.";
    }
}

Thread.prototype = {
    request: function (request, callback) {
        const xhr = new XMLHttpRequest();
            
        xhr.open("POST", this.agent, true);
        xhr.withCredentials = true;

        xhr.onload = callback;

        xhr.send(JSON.stringify(request));
    },
    upload: function (id, doc, name, binary, callback) {
        const xhr = new XMLHttpRequest();
            
        xhr.open("PUT", [this.agent, id, doc, name].join("/"), true);
        xhr.withCredentials = true;

        xhr.onload = callback;

        xhr.send(binary);
    },
    download: function (id, doc, name, callback) {
        const xhr = new XMLHttpRequest();
            
        xhr.open("POST", this.agent, true);
        xhr.withCredentials = true;
        xhr.responseType = "blob";

        xhr.onload = function (e) {
            if (xhr.status == 200) {
                const
                    a = document.createElement("a"),
                    event = document.createEvent("MouseEvent");
                
                a.setAttribute("download", name);
                a.setAttribute("href", URL.createObjectURL(new Blob([xhr.response] ,{
                    
                })));
                
                event.initEvent("click", true, true);
                
                a.dispatchEvent(event);
            }
            callback.call(xhr, e);
        };

        xhr.send(JSON.stringify({
            command: "get",
            target: "file",
            id: id,
            doc: doc,
            binary: true
        }));
    }
};