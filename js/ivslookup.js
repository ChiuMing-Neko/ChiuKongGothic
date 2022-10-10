let fontState = "CL";

const setFontState = (input) => {
    fontState = input;
}

function changeFont(theInput) {
    if (theInput === "CL") {
        //document.querySelector("div.content").style.fontFamily = "ChiuKong Gothic CL";
        setFontState(theInput);
        document.querySelector("div.charaBox").classList.remove("mnfont");
    } else if (theInput === "MN") {
        //document.querySelector("div.content").style.fontFamily = "ChiuKong Gothic MN";
        setFontState(theInput);
        document.querySelector("div.charaBox").classList.add("mnfont");
    }
}

function fixedCharAt(str, idx) {
    let ret = '';
    str += '';
    let end = str.length;
  
    let surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    while ((surrogatePairs.exec(str)) != null) {
        let lastIdx = surrogatePairs.lastIndex;
        if (lastIdx - 2 < idx) {
            idx++;
        } else {
            break;
        }
    }
  
    if (idx >= end || idx < 0) {
        return '';
    }
  
    ret += str.charAt(idx)
  
    if (/[\uD800-\uDBFF]/.test(ret) && /[\uDC00-\uDFFF]/.test(str.charAt(idx + 1))) {
        // Go one further, since one of the "characters" is part of a surrogate pair
        ret += str.charAt(idx + 1);
    }

    return ret;
}

function getLookUp() {
    return document.querySelector("input#lookup").value;
}

function validateChara() {
    var validate = false;
    var character = fixedCharAt(getLookUp(), 0);

    if (character.match(/\p{Unified_Ideograph}/u) || character.match(/[\u3007]/)) {
        validate = true;
    }
    
    if (!validate) {
        document.querySelector("div.content").innerHTML = "非有效字符，請重新輸入。";
    } else {
        generateData(character);
    }
}

function checkIVS(keyCodePoint) {
    var charCodePoint = parseInt(keyCodePoint, 16);
    var IVSArray = [];

    //binary search
    var left = 0;
    var right = ivsdata.length-1;
    while (left <= right) {
        const mid = left + Math.floor((right - left)/2);
        var currCodePoint = parseInt(ivsdata[mid].codePoint, 16);
        if (currCodePoint < charCodePoint) {
            left = mid + 1;
        } else if (currCodePoint > charCodePoint) {
            right = mid - 1;
        } else {
            for (var j = 0; j < ivsdata[mid].IVSData.length; j++) {
                var theObject = {IVScodePoint: "", IVDSet: ""};
                theObject.IVScodePoint = ivsdata[mid].IVSData[j].IVSCode;
                theObject.IVDSet = ivsdata[mid].IVSData[j].IVDSetName;
                IVSArray.push(theObject);
            }
            break;
        }
    }

    /*for (var i = 0; i < ivsdata.length; i++) {
        if (ivsdata[i].codePoint === theCodePoint) {
            for (var j = 0; j < ivsdata[i].IVSData.length; j++) {
                var theObject = {IVScodePoint: "", IVDSet: ""};
                theObject.IVScodePoint = ivsdata[i].IVSData[j].IVSCode;
                theObject.IVDSet = ivsdata[i].IVSData[j].IVDSetName;
                IVSArray.push(theObject);
            }
            break;
        }
    }*/

    return IVSArray;
}

function generateData(charaInput) {

    var character = fixedCharAt(charaInput, 0);
    var codePoint = (character.codePointAt(0)).toString(16).toUpperCase();
    var content = "";

    //initialize
    var charaBox = `
        <div class="charaBox"> 
            <table class="lookup">
                <tbody>
                    <tr class="glyph">
                        <td>${character}</td>
                    </tr>
                    <tr class="codepoint">
                        <td>U+${codePoint}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    `;
    content += charaBox; //add basic content;
    //generate ivs data
    var IVSArray = checkIVS(codePoint);
    var tableGlyphContent = "";
    var tableCodePointContent = "";
    var tableIVDSetContent = "";

    if (IVSArray.length > 0) {
        for (var i = 0; i < IVSArray.length; i++) {
            var selectorCodePoint = parseInt(IVSArray[i].IVScodePoint, 16);
            tableGlyphContent += `<td>${character+String.fromCodePoint(selectorCodePoint)}</td>`;
            tableCodePointContent += `<td>${"U+" + codePoint + " " + selectorCodePoint.toString(16).toUpperCase()}</td>`;
            tableIVDSetContent += `<td>${IVSArray[i].IVDSet}</td>`;
        }

        content += `
        <div class="ivsinfoBox">
            <table class="ivsinfo">
                <tbody>
                    <tr class="glyph_ivs">
                        ${tableGlyphContent}
                    </tr>
                    <tr class="codepoint">
                        ${tableCodePointContent}
                    </tr>
                    <tr class="ivdset">
                        ${tableIVDSetContent}
                    </tr>
                </tbody>
            </table>
        </div>
        `
        ;

    } else {
        content += `
        <div class="ivsinfoBox">
            <p class="notification">此字符暫未整合異體字字圖/沒有Unicode異體字字圖記錄</p>
        </div>
        `;
    }

    document.querySelector("div.content").innerHTML = content;
    changeFont(fontState);
}