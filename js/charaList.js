const FILE_NAMES = [
    {name: "大五碼-常用字", path: big5_regular}, 
    {name: "臺灣-常用國字標準字體表", path: taiwanMOE_1},
    {name: "香港-常用字字形表", path: hk_regular},
    {name: "GB/T 2312–1980", path: gb2312},
    {name: "GB/T 12345–1990", path: gb12345},
    {name: "中國-現代漢語常用字表", path: tonggui_changyong},
    {name: "香港增補字符集", path: hkscs},
    {name: "常用香港外字表", path: hk_suppchara}
];
const LOADNUM = 100;
var charaData = [];
var theIVD = [];
var currPage = 1;

function loadFile(rawData) {
    var chara_list = [];
    for (var i = 0; i < rawData.length; i++) {
        chara_list.push(rawData[i]);
    }
    theIVD = generateIVD(chara_list);
    charaData = chara_list;
    console.log(charaData.length)

    document.querySelector("div.nav_bar").innerHTML = "";
    var totalPage = Math.ceil(charaData.length / LOADNUM);
    for (var i = 1; i <= totalPage; i++) {
        document.querySelector("div.nav_bar").innerHTML += `<a class="the_nav" href= "#" onclick="loadTablePage(${i})">${i}</a> `;
    }

    loadTablePage(1);
}

function generateIVD(chara_list) {
    var IVD_list = [];
    var charaListIdx = 0;
    var ivsdataIdx = 0;
    while (charaListIdx < chara_list.length) {
        //special case 1
        if (ivsdataIdx >= ivsdata.length) {
            for (var i = charaListIdx; i < chara_list.length; i++) {
                var theObj = {codePoint: "", IVSData: []};
                theObj.codePoint = (chara_list[i].codePointAt(0)).toString(16).toUpperCase();
                IVD_list.push(theObj);
            }
            break;
        }
        //initialize
        var currChara = chara_list[charaListIdx].codePointAt(0);
        var currIVSdata = parseInt(ivsdata[ivsdataIdx].codePoint, 16);
        if (currIVSdata < currChara) {
            ivsdataIdx++;
        } else if (currIVSdata === currChara) {
            IVD_list.push(ivsdata[ivsdataIdx]);
            ivsdataIdx++;
            charaListIdx++;
        } else if (currIVSdata > currChara) {
            var theObj = {codePoint: "", IVSData: []};
            theObj.codePoint = (chara_list[charaListIdx].codePointAt(0)).toString(16).toUpperCase();
            IVD_list.push(theObj);
            charaListIdx++;
        }
    }

    return IVD_list;
}

function generateTable(chara_list, IVD_list, theIdx) {
    //clear data
    document.querySelector("#tablecontent").innerHTML = "";
    //load data
    var charaList = chara_list;
    var mappedIVD = IVD_list;
    //initialize data
    for (var i = theIdx; i < theIdx + LOADNUM && i < charaList.length; i++) {
        var chara = charaList[i];
        var IVSArray = mappedIVD[i].IVSData;
        //generate IVD content
        var ivdTableContent = ``;
        if (IVSArray.length > 0) {
            //variable
            var glyph = "";
            var IVSCode = "";
            var IVDName = "";
            //Generate Table
            for (var j = 0; j < IVSArray.length; j++) {
                var selector = parseInt(IVSArray[j].IVSCode, 16);
                glyph += `<td>${chara + String.fromCodePoint(selector)}</td>`;
                IVSCode += `<td>${"U+" + (chara.codePointAt(0)).toString(16).toUpperCase() + " " + selector.toString(16).toUpperCase()}</td>`;
                IVDName += `<td>${IVSArray[j].IVDSetName}</td>`;
            }
            //Finalize ivdTableContent
            ivdTableContent += `<tr class="IVSTableGlyph">${glyph}</tr>`;
            ivdTableContent += `<tr class="IVSTableCode">${IVSCode}</tr>`;
            ivdTableContent += `<tr class="IVSTableName">${IVDName}</tr>`;
        } else {
            ivdTableContent = `<tr><td rowspan="3">此字符暫未整合異體字字圖/沒有Unicode異體字字圖記錄</td></tr>`;
        }

        var ivdcontent = `
            <table class="IVS">
                <tbody>
                    ${ivdTableContent}
                </tbody>
            </table>
        `;

        //final data
        var content = `
            <tr>
                <td class="unicode">${(chara.codePointAt(0)).toString(16).toUpperCase()}</td>
                <td class="CL">${chara}</td>
                <td class="MN">${chara}</td>
                <td class="IVD">
                    ${ivdcontent}
                </td>
            </tr>
        `;
        document.querySelector("#tablecontent").innerHTML += content;
    }

}

function pageOnload() {
    for (var i = 0; i < FILE_NAMES.length; i++) {
        var thecontent = `<option value="${i}">${FILE_NAMES[i].name}</option>`;
        console.log(thecontent);
        document.querySelector("nav > form > select").innerHTML += thecontent;
    }
    tableLookup(0);
}

function selectorFunc() {
    let theSelector = document.querySelector("nav > form > select");
    tableLookup(theSelector.options[theSelector.selectedIndex].value);
}

function tableLookup(requestID) {
    document.querySelector("#tablename").innerHTML = FILE_NAMES[requestID].name;
    loadFile(FILE_NAMES[requestID].path);
}

function loadTablePage(pageNum) {
    var node = document.querySelectorAll("a.the_nav");
    node[currPage-1].removeAttribute('id');
    currPage = pageNum;
    node[currPage-1].setAttribute("id", "inactiveLink");
    generateTable(charaData, theIVD, (pageNum - 1)*LOADNUM);
}

function nextPage() {

}

function prevPage() {

}