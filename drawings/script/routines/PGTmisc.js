
/**
 * Convert from PGT color code to HTML color name.
 * NOTE: conversion to hex color code was done using https://www.w3schools.com/colors/colors_converter.asp
 * 
 * @param 	strPGTColor		String PGT color code 
 * @param       strMaterial     A - aluminum, V - vinyl
 * @return	strHTMLColor	String HTML color name
 */

function getFrameColor(strPGTColor, strMaterial)
{
try
{
	trace("getFrameColor('"+strPGTColor+"')");
        
	var strHTMLColor;
        
	switch(strPGTColor){
        //WHITE
            case "W":
            case "WHITE":
            case "10PW":
            case "20PW":
            case "D2W":
            case "D702W":
            case "D72W":
            case "D3W":
            case "D703W":
            case "D73W":
            case "W/T":
            case "W/B":
            case "W/B/T/PK":
            case "W/NC":
            case "W/DO":
            case "W/NO":
                //white is white
		strHTMLColor = "#ffffff";
		break;
        //VENETIAN BRONZE
            case "VB":
            case "10PVB":
            case "20PVB":
            case "D2VB":
            case "D702VB":
            case "D72VB":
            case "D3VB":
            case "D703VB":
            case "D73VB":
                //cmyk(40%,41%,54%,44%)
                strHTMLColor = "#565442";
		break;
        //PEBBLE KHAKI
            case "PK":
            case "10PPK":
            case "20PPK":
            case "D2PK":
            case "D702PK":
            case "D72PK":
            case "D3PK":
            case "D703PK":
            case "D73PK":
            case "PK/NC":
            case "PK/DO":
            case "PK/NO":
            case "PK/W":
                switch(strMaterial){
                    case "A":
                        strHTMLColor = "#9e9e81";
                        break;
                    case "V":
                        strHTMLColor = "#a69f88";
                        break;
                }
                break;
        //ARIZONA BEIGE
            case "ZG":
            case "AB":
            case "10PAB":
            case "10PZG":
            case "20PAB":
            case "20PZG":
            case "D2AB":
            case "D2ZG":
            case "D702AB":
            case "D702ZG":
            case "D72ZG":
            case "D3AB":
            case "D3ZG":
            case "D703AB":
            case "D703ZG":
            case "D73ZG":
                //cmyk(9%,12%,24%,13%)
		strHTMLColor = "#cac3a9";
		break;
        //ANODIZE
            case "A":
            case "A1":
            case "A2":
            case "A/NC":
            case "A/DO":
            case "A/NO":
            case "A/W":
            case "10PSA":
            case "20PSA":
        //MILL - uses same as anodize
            case "M":
            case "MILL":
                switch(strMaterial){
                    case "V":
                        strHTMLColor = "url(#PGTVA*)";
                        break;
                    case "A":
                        //cmyk(0%,0%,0%,10%)
                        strHTMLColor = "#c0c0c0";
                        break;                }
                break;
        //BRONZE (standard)
            case "B":
            case "10PB":
            case "20PB":
            case "D2B":
            case "D702B":
            case "D72B":
            case "D3B":
            case "D703B":
            case "D73B":
            case "BA":
            case "B2W":
            case "B2WP":
            case "D2B2W":
            case "D702B2W":
            case "D72B2W":
            case "D3B2W":
            case "D703B2W":
            case "D73B2W":
            case "B/T":
            case "B/NC":
            case "B/DO":
            case "B/NO":
            case "B/W":
            case "10PB2W":
            case "20PB2W":
        //SOUTHERN BRONZE - uses same code as standard bronze    
            case "SB":
            case "10PSB":
            case "20PSB":
            case "D702SB":
            case "D72SB":
            case "D703SB":
            case "D73SB":
            case "SB2W":
                switch(strMaterial){
                    case "V":
                        strHTMLColor = "#6c5735";
                        break;
                    case "A":
                        strHTMLColor = "#696158";
                        break;
                }
                break;
        //BLACK
            case "K":
            case "10PK":
            case "20PK":
            case "D2K":
            case "D702K":
            case "D72K":
            case "D3K":
            case "D703K":
            case "D73K":
            case "K2W":
            case "D2K2W":
            case "D702K2W":
            case "D72K2W":
            case "D3K2W":
            case "D703K2W":
            case "D73K2W":
            case "10PK2W":
            case "20PK2W":
                //black is black
		strHTMLColor = "#000000";
		break;
        //BEIGE
            case "T":
            case "10PT":
            case "20PT":
            case "D2T":
            case "D702T":
            case "D72T":
            case "D3T":
            case "D703T":
            case "D73T":
            case "T/B":
            case "T/NC":
            case "T/DO":
            case "T/NO":
            case "T/W":
		strHTMLColor = "#d6d2c4";
		break;
        //HUNTER GREEN
            case "HG":
            case "10PHG":
            case "20PHG":
            case "D2HG":
            case "D702HG":
            case "D72PHG":
            case "D3HG":
            case "D703HG":
            case "D73PHGN":
            case "HG/NC":
            case "HG/DO":
            case "HG/NO":
            case "HG/W":
                switch(strMaterial){
                    case "A":
                        strHTMLColor = "#13322b";
                        break;
                    case "V":
                        strHTMLColor = "#13322b";
                        break;
                }
                break;
        //BRICK RED
            case "BR":
            case "10PBR":
            case "20PBR":
            case "D2BR":
            case "D702BR":
            case "D72BR":
            case "D3BR":
            case "D703BR":
            case "D73BR":
            case "BR/NC":
            case "BR/DO":
            case "BR/NO":
            case "BR/W":
                strHTMLColor = "#81312f";
                break;
        //AGED COPPER
            case "AC":
            case "10PAC":
            case "20PAC":
            case "D2AC":
            case "D702AC":
            case "D72AC":
            case "D3AC":
            case "D703AC":
            case "D73AC":
                //cmyk(44%, 4%, 37%, 10%)
                strHTMLColor = "#81dc91";
		break;
        //ARCADIA SILVER
            case "AS":
            case "10PAS":
            case "20PAS":
            case "D72AS":
            case "D73AS":
                //cmyk(13%, 8%, 11%, 26%)
                strHTMLColor = "#a4aea8";
		break;
        //BONE WHITE
            case "BO":
            case "10PBO":
            case "20PBO":
            case "D72BO":
            case "D73BO":
                //cmyk(7%, 3%, 5%, 8%)
                strHTMLColor = "#dae4df";
		break;
        //CHAMPAGNE BRONZE
            case "CB":
            case "10PCB":
            case "20PCB":
            case "D72CB":
            case "D73CB":
                //cmyk(30%, 30%, 53%, 5%)
                strHTMLColor = "#aaaa72";
		break;
        //COLONIAL WHITE
            case "CW":
            case "10PCW":
            case "20PCW":
            case "D2CW":
            case "D702CW":
            case "D72CW":
            case "D3CW":
            case "D703CW":
            case "D73CW":
                //cmyk(5%, 5%, 15%, 8%)
                strHTMLColor = "#dfdfc7";
		break;
        //CORAL
            case "CO":
            case "10PCO":
            case "20PCO":
            case "D2CO":
            case "D702CO":
            case "D72CO":
            case "D3CO":
            case "D703CO":
            case "D73CO":
                //cmyk(0%, 63%, 49%, 0%)
                strHTMLColor = "#ff5e82";
		break;
        //GEORGIA BRICK
            case "GB":
            case "10PGB":
            case "20PGB":
            case "D72GB":
            case "D73GB":
                //cmyk(12%, 78%, 62%, 25%)
                strHTMLColor = "#a82a49";
		break;
        //GRAY
            case "S":
            case "10PS":
            case "20PS":
            case "D2S":
            case "D702S":
            case "D72S":
            case "D3S":
            case "D703S":
            case "D73S":
                //cmyk(19%, 12%, 13%, 34%)
                strHTMLColor = "#889492";
		break;
        //GULFORD GREEN
            case "GG":
            case "10PGG":
            case "20PGG":
            case "D72GG":
            case "D73GG":
                //cmyk(15%, 0%, 34%, 0%)
                strHTMLColor = "#d9ffa8";
		break;
        //HARTFORD GREEN
            case "HF":
            case "10PHF":
            case "20PHF":
            case "D72HF":
            case "D73HF":
                //cmyk(90%, 21%, 65%, 69%)
                strHTMLColor = "#083e1c";
		break;
        //PALACE BLUE
            case "PB":
            case "10PPB":
            case "20PPB":
            case "D2PB":
            case "D702PB":
            case "D72PB":
            case "D3PB":
            case "D703PB":
            case "D73PB":
                //cmyk(88%, 50%, 45%, 50%)
                strHTMLColor = "#0f4046";
		break;
        //PRIMROSE
            case "P":
            case "10PP":
            case "20PP":
            case "D2P":
            case "D702P":
            case "D72P":
            case "D3P":
            case "D703P":
            case "D73P":
                //cmyk(0%, 4%, 27%, 0%)
                strHTMLColor = "#fff5ba";
		break;
        //STATUARY BRONZE
            case "ST":
            case "10PST":
            case "20PST":
            case "D702STB":
            case "D72ST":
            case "D73ST":
                //cmyk(100%, 79%, 44%, 93%)
                strHTMLColor = "#00040a";
		break;
        //Wood grains...use image fill with DEFS set up in WINDOWS.svg
            case "NC":
            case "DO":
            case "NO":
            case "DOAK":
            case "DCHR":
            case "DACA":
            case "DWAL":
                //build image pattern name
                strHTMLColor = "url(#PGT" + strMaterial + strPGTColor + "*)";
                break;
            case "DHZB":
                //createFillDefs("PGTDarkOak.png");
                //strHTMLColor = "url(#PGTDarkOak*)";
                strHTMLColor = "SaddleBrown";
                break;
            
            default:
		strHTMLColor = "purple";
	
	}
        trace("return:"+strHTMLColor);
	return strHTMLColor;
}	
catch(e)
{
	alertUser("Exception:  getFrameColor('"+strPGTColor+"')");
	alertUser(e);
	trace(e);
}	
} 

function getGridColor(frameColor, gridType)
{
try
{
	trace("getGridColor('"+frameColor+"','"+gridType+"')");
        
	var strHTMLColor;
        
	switch(frameColor){
        //vinyl anodize to gray muntin
            case "url(#PGTVA*)":
                strHTMLColor = getFrameColor("A","A");
                break;
        //Wood grains...use bronze
            case "url(#PGTVNC*)":
            case "url(#PGTVDO*)":
            case "url(#PGTVNO*)":
                strHTMLColor = getFrameColor("B","V");
                break;
            case "url(#PGTADOAK*)":
            case "url(#PGTADCHR*)":
            case "url(#PGTADACA*)":
            case "url(#PGTADWAL*)":
            case "url(#PGTADHZB*)":
                strHTMLColor = (gridType.indexOf("GBG")<0 ? frameColor : getFrameColor("B","A"));
                break;

            default:
		strHTMLColor = frameColor;
	
	}
        trace("return:"+strHTMLColor);
	return strHTMLColor;
}	
catch(e)
{
	alertUser("Exception:  getFrameColor('"+frameColor+"')");
	alertUser(e);
	trace(e);
}	
} 

/**
 * Convert from PGT color code to HTML color name.
 * 
 * @param 	strPGTColor		String PGT color code 
 * @return	strHTMLColor	String HTML color name
 */

function getGlassColor(strPGTColor)
{
try
{
	trace("getGlassColor('"+strPGTColor+"')");
	
        var strHTMLColor;
        
	switch(strPGTColor){
		case "CL":
			strHTMLColor = "WhiteSmoke";
			break;
		case "BZ":
			strHTMLColor = "RosyBrown";
			break;
		case "GR":
			strHTMLColor = "LightGray";
			break;
		case "GN":
			strHTMLColor = "LightGreen";
			break;
		case "AZ":
			strHTMLColor = "Aqua";
			break;
		case "SB":
			strHTMLColor = "Goldenrod";
			break;
		case "SG":
			strHTMLColor = "LightSlateGray";
			break;
		case "G2":
			strHTMLColor = "DarkGray";
			break;
		default:
			strHTMLColor = "White";
	
	}
        trace("return:"+strHTMLColor);
	return strHTMLColor;
}	
catch(e)
{
	alertUser("Exception:  getGlassColor('"+PGTColor+"')");
	alertUser(e);
	trace(e);
}	
} 

/**
 * Return PGT grid face dimension.
 * 
 * @param 	gridType	String PGT colonial type 
 * @return	gridFace	Decimal grid face dimension
 */

function getGridFace(gridType)
{
try
{
    trace("getGridFace('"+gridType+"')");
    var gridFace;
    switch(gridType){
        case "ODA1000":
        case "SDLB1000":
        case "SDLC1000":
        case "SDC1000":
        case "GBGC1000":
        case "FB1000":
        case "DF1000":
        case "RM1000":
        case "DA1000":
        case "SR1000":
        case "DR1000":
        case "OG1000":
        case "RLO1000":
        case "ODR1000":
        case "OGL1000":
        case "SDFB1000":
        case "SDLT1000":
        case "SDLL1000":
        case "SDL1000":
            gridFace = 1;
            break;
        case "GBGF0813":
            gridFace = 0.813;
            break;
        case "FB2000":
        case "DF2000":
        case "RM2000":
        case "DR2000":
        case "DA2000":
            gridFace = 2;
            break;
        case "DA0875":
        case "ODA0875":
        case "ODR0875":
        case "FB0875":
        case "RM0875":
        case "OG0875":
        case "SDLT0875":
            gridFace = 0.875;
            break;
        case "GBGF0563":
            gridFace = 0.563;
            break;
    }
    return gridFace;
}
catch(e)
{
	alertUser("Exception:  getGridFace('"+gridType+"')");
	alertUser(e);
	trace(e);
}	
}
