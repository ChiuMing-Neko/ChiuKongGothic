def performTask():
    with open("ivs.txt", 'r', encoding='utf8') as inFile:
        with open("ivsdata.txt", 'w', encoding='utf8') as outFile:
            ivsdataList = []
            ivsdata = []
            for line in inFile:
                theStrList = line.split("; ")
                codePointStr, IVDSetName = theStrList[0], theStrList[1]
                codePoint, IVSCode = codePointStr.split(" ")

                ivsdataList.append([codePoint, (IVSCode, IVDSetName)])
            
            #Sort by codePoint in HEX, if equal compare IVScodePoint in HEX
            ivsdataList.sort(key=lambda a: (int(a[0], 16), int(a[1][0], 16)))
            
            #formatting
            for item in ivsdataList:
                if (not len(ivsdata) or ivsdata[-1][0] != item[0]):
                    ivsdata.append([item[0], [item[1]]])
                else:
                    ivsdata[-1][1].append(item[1])
            del(ivsdataList)
            #Perform write operation
            arrayLen = len(ivsdata)
            for i in range(arrayLen):
                IVSDataBlock = ""
                writeFormat = """
{{
    codePoint: "{theCodePoint}",
    IVSData: [
        {IVSDataBlock}
    ]
}}{thePunctation}"""
                #getIVSDataBlock
                ivsarray = ivsdata[i][1]
                ivsarrayLen = len(ivsarray)
                for j in range(ivsarrayLen):
                    IVSDataFormat = """
        {{
            IVSCode: "{IVSCodePoint}",
            IVDSetName: "{theSetName}"
        }}{thePunctation}"""
                    IVSDataBlock += IVSDataFormat.format(IVSCodePoint = ivsarray[j][0], theSetName = ivsarray[j][1], thePunctation = "," if j < ivsarrayLen-1 else "")

                #generateFinal
                outFile.write(writeFormat.format(theCodePoint = ivsdata[i][0], IVSDataBlock = IVSDataBlock, thePunctation = "," if i < arrayLen-1 else ""))



if (__name__ == "__main__"):
    performTask()



        




