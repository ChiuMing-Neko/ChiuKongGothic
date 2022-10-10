function changeFont(theInput) {
    if (theInput === "CL") {
        //document.body.style.fontFamily = "ChiuKong Gothic CL";
        //document.getElementById('testarea').style.fontFamily = "ChiuKong Gothic CL";
        document.getElementById('testarea').classList.remove("mnfont");
    } else if (theInput === "MN") {
        //document.body.style.fontFamily = "ChiuKong Gothic MN";
        //document.getElementById('testarea').style.fontFamily = "ChiuKong Gothic MN";
        document.getElementById('testarea').classList.add("mnfont");
    }
}
