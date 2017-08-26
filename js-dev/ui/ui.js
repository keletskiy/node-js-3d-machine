//
//

Element.prototype.remove = function() {
    "use strict";
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    "use strict";
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};
// document.getElementById("my-element").remove();
// document.getElementsByClassName("my-elements").remove();

function createUI(){
    "use strict";

    var uiDiv = document.getElementById("ui-div");

    if (!uiDiv)
        return;

    var uiShowHideBtn = document.getElementById("ui-show-hide-btn");
    if (uiShowHideBtn){
        document.getElementById("ui-show-hide-btn").remove();
    }

    uiShowHideBtn = document.createElement("button");
    uiShowHideBtn.setAttribute("id", "ui-show-hide-btn");
    uiShowHideBtn.innerText = 'Hide parameters';
    uiShowHideBtn.onclick = function(){
        var uiTable = document.getElementById("ui-table");
        if (uiTable){
            if (uiTable.style.visibility === "visible")
            {
                uiTable.style.visibility = "hidden";
                uiTable.style.display = "none";
                uiShowHideBtn.innerText = 'Show parameters';
            }
            else 
            {
                uiTable.style.visibility = "visible";
                uiTable.style.display = "";
                uiShowHideBtn.innerText = 'Hide parameters';
            }
        }
    };
    uiDiv.appendChild(uiShowHideBtn);

    var uiTable = document.getElementById("ui-table");
    if (uiTable){
        document.getElementById("ui-table").remove();
    }
    uiTable = document.createElement("table");
    uiTable.setAttribute("id", "ui-table");
    uiTable.style.color = "black";
    uiTable.style.visibility = "visible";
    uiTable.style.display = "";
    uiDiv.appendChild(uiTable);

    addLabelUI(
        uiTable,
        "Build version",
        "ui-gl.build-version",
        document.getElementById("build.version").innerHTML
    );

    addLabelUI(
        uiTable,
        "Face count",
        "ui-gl.draw-face.count",
        0
    );

    /*
    addButtonUI(
        uiTable,
        "Light",
        "ui-gl.ligths",
        (DEBUG.bIsLightsVisible ? "Disable" : "Enable"),
        function(){
            DEBUG.bIsLightsVisible = !DEBUG.bIsLightsVisible;
            document.getElementById("ui-gl.ligths").innerText = DEBUG.bIsLightsVisible ? "Disable" : "Enable";
        }
    );

    addButtonUI(
        uiTable,
        "Change wireframe mode",
        "ui-gl.draw-wireframe",
        DEBUG.bUseWireframe,
        function(){
            DEBUG.bUseWireframe = !DEBUG.bUseWireframe;
            document.getElementById("ui-gl.draw-wireframe").innerText = DEBUG.bUseWireframe;
        }
    );

    addButtonUI(
        uiTable,
        "Use max LOD",
        "ui-gl.use-max-lod",
        DEBUG.bUseMaxLod,
        function(){
            DEBUG.bUseMaxLod = !DEBUG.bUseMaxLod;
            document.getElementById("ui-gl.use-max-lod").innerText = DEBUG.bUseMaxLod;
        }
    );*/

    addButtonUI(
        uiTable,
        "Autorotate camera",
        "ui-gl.autorotate-camera",
        DEBUG.bAutoRotateCamera,
        function(){
            DEBUG.bAutoRotateCamera = !DEBUG.bAutoRotateCamera;
            document.getElementById("ui-gl.autorotate-camera").innerText = DEBUG.bAutoRotateCamera;
        }
    );

    addButtonUI(
        uiTable,
        "Set camera initial state",
        "ui-gl.initial-state-camera",
        "press",
        function(){
            DEBUG.bSetCameraInitailState = true;
        }
    );

    addLabelUI(
        uiTable,
        "Upload size",
        "ui-gl.upload-indicator-bytes",
        "0.00 / 0.00 Mb"
    );

    addLabelUI(
        uiTable,
        "Unzipped objects",
        "ui-gl.upload-indicator-objects",
        "0 / 0"
    );
}

function updateContextInfo(e){
    "use strict";
    var element = document.getElementById("ui-gl.draw-face.count");
    if (element){
        element.innerHTML = e.info.faces;
    }
}

function updateUploadIndicator(e){
    "use strict";
    var element = document.getElementById("ui-gl.upload-indicator-bytes");
    if (element){
        var loaded = ( e.loaded / ( 1024 * 1024 ) ).toFixed(2);
        var total = ( e.total / ( 1024 * 1024 ) ).toFixed(2);
        var upload_speed = ( e.upload_speed / ( 1024 * 1024 ) ).toFixed(2);
        element.innerHTML = loaded + " / " + total + " Mb | " + upload_speed + " Mb/sec" ;
    }
    element = document.getElementById("ui-gl.upload-indicator-objects");
    if (element){
        var created_objects = e.created_objects;
        var total_objects = e.total_objects;
        element.innerHTML = created_objects + " / " + total_objects;
    }
}

function selectItemByValue(select, value){
    "use strict";
    for ( var j = 0; j < select.options.length; j++){
        if (select.options[j].value === value){
            select.selectedIndex = j;
            break;
        }
    }
}

function addLabelUI( table , description, id, html_data){
    "use strict";
    var i, j, size, row, cell1, cell2, option, element;

    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);

    cell1.innerHTML = description;

    element = document.createElement("span");
    element.setAttribute("id", id);
    element.innerHTML = html_data;

    cell2.appendChild(element);

    return element;
}

function addButtonUI( table , description, id, btn_text, onClickFunction){
    "use strict";
    var i, j, size, row, cell1, cell2, option, element;

    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);

    cell1.innerHTML = description;

    element = document.createElement("button");
    element.setAttribute("id", id);
    element.innerText = btn_text;
    element.onclick = onClickFunction;
    element.ontouchstart = onClickFunction;

    cell2.appendChild(element);

    return element;
}

function addSelectUI( table , description, id, options_array, onChangeFunction){
    "use strict";
    var i, j, size, row, cell1, cell2, option, element;

    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);

    cell1.innerHTML = description;

    element = document.createElement("select");
    element.setAttribute("id", id);
    cell2.appendChild(element);

    for ( i = 0; i < options_array.length; i++){
        option = document.createElement("option");
        option.setAttribute("value", options_array[i]);
        option.text = options_array[i];
        element.appendChild(option);
    }

    element.onchange = onChangeFunction;

    return element;
}

function addRangeUI( table , description, id, values, onChangeFunction){
    "use strict";
    var i, j, size, row, cell1, cell2, option, element;

    row = table.insertRow(table.rows.length);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);

    cell1.innerHTML = description;

    element = document.createElement("input");
    element.setAttribute("id", id);
    element.setAttribute("type", "range");
    element.setAttribute("min", values.min); 
    element.setAttribute("max", values.max);
    element.setAttribute("step",values.step);
    element.setAttribute("value", values.value);

    var span = document.createElement("span");
    span.innerHTML = values.value.toFixed(2);

    cell2.appendChild(span);
    cell2.appendChild(element);

    element.onchange = element.oninput = function(e){

        var value = parseFloat(element.value);

        span.innerHTML = value.toFixed(2);
        onChangeFunction(value);
    };

    return element;
}

createUI();
document.addEventListener('ContextInfo.update', updateContextInfo, false); 
document.addEventListener('UploadData.update', updateUploadIndicator, false);
