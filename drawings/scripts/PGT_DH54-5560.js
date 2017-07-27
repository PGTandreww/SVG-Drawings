// $import="fc.js"
// $import="PGTrect.js"
// $import="PGTmisc.js"

var drawing = null;
// $return$
 
function generate(evt)
{
	drawing = evt.getTarget().getOwnerDocument();

	// $initialize$

	var PAD = nested=="true"?0:9;

//	var color = getFrameColor(FRMCLR);

	trace("set up main frame variables");

	//draw the main frame

        var frame = {
            x:0,
            y:0,
            width:WDTH,
            height:HGHT,
            headWidth:2.4839,
            headFin:0,
            headOffset:0,
            headBevelInset:0.9874,
            headBevelWidth:0.4049,
            sillWidth:2.0442,
            sillFin:0,
            sillOffset:0,
            sillBevelInset:0.9874,
            sillBevelWidth:0.4049,
            leftWidth:2.4839,
            leftFin:0,
            leftOffset:0,
            leftBevelInset:0.9874,
            leftBevelWidth:0.4049,
            rightWidth:2.4839,
            rightFin:0,
            rightOffset:0,
            rightBevelInset:0.9874,
            rightBevelWidth:0.4049,
            color:getFrameColor(FRMCLR,"V")
        };	
        //sashes
        var tsash = {
            x:0,
            y:0,
            width:SASHWDTH1,
            height:SASHHGHT1,
            topWidth:1,
            botWidth:1,
            leftWidth:1,
            rightWidth:1,
            xOffset:2.063,
            yOffset:1.3097
        };          
        var bsash = {
            x:0,
            y:0,
            width:SASHWDTH2,
            height:SASHHGHT2,
            topWidth:1,
            botWidth:1,
            leftWidth:1,
            rightWidth:1,
            xOffset:1.5625,
            yOffset:1.603
        };
        

    
        //check w and h...no need to continue is either is 0
        if(frame.width > 0 && frame.height> 0 && tsash.height > 0 && bsash.height > 0){
            //continue
            trace("call initOuterNonMtrdFrame from PGTrect.js");

            var addFin = false;
            
            switch(FRMTYPE){
                case "EQUAL":
                    //EQUAL is used as the basis for the default values, so we do nothing additional for that frame type
                    break;
                case ".625FLANGE":
                    //base dims for flange frame...since EQUAL is set up as base values, we just need to adjust
                    with(frame){
                        headOffset = sillOffset = leftOffset = rightOffset = 0.625;
                        headWidth += headOffset;
                        headBevelInset += headOffset;
                        sillWidth += sillOffset;
                        sillBevelInset += sillOffset;
                        leftWidth += leftOffset;
                        leftBevelInset += leftOffset;
                        rightWidth += rightOffset;
                        rightBevelInset += rightOffset;
                    
                        bsash.xOffset += leftOffset;
                        bsash.yOffset += sillOffset;
                        tsash.xOffset += leftOffset;
                        tsash.yOffset += headOffset;
                    }   
                    break;
                case "1.375FIN":
                    //flip the flag
                    addFin = true;
                    //base dims for fin frame...taken from CAD drawing
                    //note that we need to check each side of the frame to see if it is prepped for mulling
                    //if it is that side is actually flange, so it gets those specs, with the offset value to set the reference to DLO and no fin
                    //if it is not, then it gets the frame and fin sizes 
                    with(frame){
                        if(PRPMULLTP !== "Y"){
                            headFin = 1.375;
                        }
                        if(PRPMULLBTM !== "Y"){
                            sillFin = 1.375;
                        }
                        if(PRPMULLLFT !== "Y"){
                            leftFin = 1.375;
                        }
                        if(PRPMULLRGHT !== "Y"){
                            rightFin = 1.375;
                        }
                    }
                    break;
                case "JCHANNEL":
                    //flip the flag
                    addFin = true;
                    //base dimes for fin frame...taken from CAD drawing
                    //note that we need to check each side of the frame to see if it is prepped for mulling
                    //if it is that side is actually flange, so it gets those specs, with the offset value to set the reference to DLO and no fin
                    //if it is not, then it gets the frame and fin sizes 
                    with(frame){
                        headOffset = sillOffset = leftOffset = rightOffset = 0.625;
                        headWidth += headOffset;
                        headBevelInset += headOffset;
                        sillWidth += sillOffset;
                        sillBevelInset += sillOffset;
                        leftWidth += leftOffset;
                        leftBevelInset += leftOffset;
                        rightWidth += rightOffset;
                        rightBevelInset += rightOffset;
                    
                        bsash.xOffset += leftOffset;
                        bsash.yOffset += sillOffset;
                        tsash.xOffset += leftOffset;
                        tsash.yOffset += headOffset;

                        if(PRPMULLTP !== "Y"){
                            headFin = .75;
                        }
                        if(PRPMULLBTM !== "Y"){
                            sillFin = .75;
                        }
                        if(PRPMULLLFT !== "Y"){
                            leftFin = .75;
                        }
                        if(PRPMULLRGHT !== "Y"){
                            rightFin = .75;
                        }
                    }
                    break;
            }

            frame.x = frame.leftFin;
            frame.y = frame.headFin;
            frame.width = frame.width + frame.leftOffset + frame.rightOffset;
            frame.height= frame.height+ frame.headOffset + frame.sillOffset;
            
            //bead variables
            var bead = {
                x:0,
                y:0,
                width:0,
                height:0,
                partWidth:0.644
            };
            var glass = {
                x:0,
                y:0,
                width:0,
                height:0,
                color:""
            };
            
            //basic colonial setup
            var tgrid = {
                add:false,
                v_bars:COL1HQTY - 1,
                h_bars:COL1VQTY - 1,
                pattern:COL1PTRN,
                location1:0,
                location2:0,
                horiz_offset:0,
                vert_offset:0,
                square:COLSQSZ,
                radius:0,
                square_width:0,
                square_height:0,
                bar_width:getGridFace(COL1TYPE),
                color:frame.color
            };

            var bgrid = {
                add:false,
                v_bars:COL2HQTY - 1,
                h_bars:COL2VQTY - 1,
                pattern:COL2PTRN,
                location1:0,
                location2:0,
                horiz_offset:0,
                vert_offset:0,
                square:COLSQSZ,
                radius:0,
                square_width:0,
                square_height:0,
                bar_width:getGridFace(COL2TYPE),
                color:frame.color
            };
            

            //centralize grid conditioning
            switch(COLLOC){
                case "CMPASSY":
                case "UNIT":
                    tgrid.add = true;
                    bgrid.add = true;
                    break;
                case "TPSSH":
                    tgrid.add = true;
                    break;
                case "BTSSH":
                    bgrid.add = true;
                    break;
                }
            
            
            //bot sash

            //Draw the bottom sash, glass, grid, and bead
            //first calculate the sash_x, then draw the sash frame
            bsash.x = frame.x + bsash.xOffset;
            bsash.y = (frame.y + frame.height) - (bsash.height + bsash.yOffset);
            bsash.width = frame.width - (2 * bsash.xOffset);
            initOuterMiterFrame("bsash", bsash.x, bsash.y, bsash.width, bsash.height, bsash.leftWidth,bsash.rightWidth,bsash.topWidth,bsash.botWidth,frame.color);
            //calculate the bead frame specs
            bead.x = bsash.x + bsash.leftWidth;
            bead.y = bsash.y + bsash.topWidth;
            bead.width = bsash.width - bsash.leftWidth - bsash.rightWidth;
            bead.height = bsash.height - bsash.topWidth - bsash.botWidth;
            // draw the glass
            glass.x = bead.x + bead.partWidth;
            glass.y = bead.y + bead.partWidth;
            glass.width	= bead.width - (bead.partWidth * 2);
            glass.height = bead.height - (bead.partWidth * 2);
            //left sash is always glass 1
            glass.color = getGlassColor(GLS2CLR);
            trace("InitGlass");
            initGlass("bglass","bsash", glass.x, glass.y, glass.width, glass.height, 0, glass.color);


            with (bgrid){
                if (bar_width > 0){
                    add = true;
                }

                if (add){
                    initPGTGrid("bglass_pane","bgrid",glass.color,bgrid);
                }
            }

/*            if(addLgrid){
                    switch(COLSTYL){
                    case "2/2V":
                    case "2/2H":
                    case "STD":
                    case "U.COL.LITES":
                    case "U.COL.BARS":
                        //conversion from lites to bars...segment is lites
                        //also note that the segments are confusing here...when STD or LITES, H and V are crossed
                        lgrid.v_bars = COL1HQTY - 1;
                        lgrid.h_bars = COL1VQTY - 1;

                        initGrid("lglass_pane","lgrid",lgrid.v_bars+"V"+lgrid.h_bars+"H",frame.color,lgrid.barWidth);

                        break;
                    case "9LP":
                        //create grid
                        initGrid("lglass_pane","lgrid","P1T1B1L1R"+COLSQSZ,frame.color,lgrid.barWidth);
                        //set the h bars for alignment conditioning
                        lgrid.h_bars = 2;
                        break;
                    case "6LP":
                        //create grid
                        initGrid("lglass_pane","lgrid","P1T1B1L0R"+COLSQSZ,frame.color,lgrid.barWidth);
                        //set the h bars for alignment conditioning
                        lgrid.h_bars = 2;
                        break;
                    case "CUSTOMLP":
                        switch(COL1PTRN){
                        //First the brittanies...easily handled by changing the # in the P pattern
                        case "3LPH":
                            //create grid
                            initGrid("lglass_pane","lgrid","P0T0B1L1R"+COLSQSZ,frame.color,lgrid.barWidth);
                            //set the h bars for alignment conditioning
                            lgrid.h_bars = 0;
                            break;
                        case "3LPV":
                            //create grid
                            initGrid("lglass_pane","lgrid","P1T1B0L0R"+COLSQSZ,frame.color,lgrid.barWidth);
                            //set the h bars for alignment conditioning
                            lgrid.h_bars = 2;
                            break;
                        case "6LPB":
                            //create grid
                            initGrid("lglass_pane","lgrid","P0T1B1L1R"+COLSQSZ,frame.color,lgrid.barWidth);
                            //set the h bars for alignment conditioning
                            lgrid.h_bars = 1;
                            break;
                        case "6LPT":
                            //create grid
                            initGrid("lglass_pane","lgrid","P1T0B1L1R"+COLSQSZ,frame.color,lgrid.barWidth);
                            //set the h bars for alignment conditioning
                            lgrid.h_bars = 1;
                            break;
                        case "6LPL":
                            //create grid
                            initGrid("lglass_pane","lgrid","P1T1B1L0R"+COLSQSZ,frame.color,lgrid.barWidth);
                            //set the h bars for alignment conditioning
                            lgrid.h_bars = 2;
                            break;
                        case "6LPR":
                            //create grid
                            initGrid("lglass_pane","lgrid","P1T1B0L1R"+COLSQSZ,frame.color,lgrid.barWidth);
                            //set the h bars for alignment conditioning
                            lgrid.h_bars = 2;
                            break;
                        case "9LP":
                            //create grid
                            initGrid("lglass_pane","lgrid","P1T1B1L1R"+COLSQSZ,frame.color,lgrid.barWidth);
                            //set the h bars for alignment conditioning
                            lgrid.h_bars = 2;
                            break;
                        }
                    }
                }*/
            initMitredFrame("bbead", bead.x, bead.y, bead.width, bead.height, bead.partWidth, frame.color);
                
            
            //top sash
            //Draw the top sash, glass, grid, and bead
            //first calculate the sash_x, then draw the sash frame
            tsash.x = frame.x + tsash.xOffset;
            tsash.y = frame.y + tsash.yOffset;
            tsash.width = frame.width - (2 * tsash.xOffset);
            initOuterMiterFrame("tsash", tsash.x, tsash.y, tsash.width, tsash.height, tsash.leftWidth,tsash.rightWidth,tsash.topWidth,tsash.botWidth,frame.color);
            //calculate the bead frame specs
            bead.x = tsash.x + tsash.leftWidth;
            bead.y = tsash.y + tsash.topWidth;
            bead.width = tsash.width - tsash.leftWidth - tsash.rightWidth;
            bead.height = tsash.height - tsash.topWidth - tsash.botWidth;

            // draw the glass
            glass.x = bead.x + bead.partWidth;
            glass.y = bead.y + bead.partWidth;
            glass.width	= bead.width - (bead.partWidth * 2);
            glass.height = bead.height - (bead.partWidth * 2);
            //right sash needs to get glass color based on config
            glass.color = getGlassColor(GLS1CLR);

            trace("InitGlass");
            initGlass("tglass","tsash", glass.x, glass.y, glass.width, glass.height, 0, glass.color);

            with (tgrid){
                if (bar_width > 0){
                    add = true;
                }

                if (add){
                    initPGTGrid("tglass_pane","tgrid",glass.color,tgrid);
                }
            }

/*            if(addRgrid){
                switch(COLSTYL){
                case "2/2V":
                case "2/2H":
                case "STD":
                case "U.COL.LITES":
                case "U.COL.BARS":
                    //conversion from lites to bars...segment is lites
                    switch(CNFG){
                    case "OX":
                        rgrid.v_bars = COL2HQTY - 1;
                        rgrid.h_bars = COL2VQTY - 1;
                        break;
                    case "XOX":
                        rgrid.v_bars = COL3HQTY - 1;
                        rgrid.h_bars = COL3VQTY - 1;
                        break;
                    }


                    initGrid("rglass_pane","rgrid",rgrid.v_bars+"V"+rgrid.h_bars+"H",frame.color,rgrid.barWidth);

                    break;
                case "9LP":
                    //create grid
                    initGrid("rglass_pane","rgrid","P1T1B1L1R"+COLSQSZ,frame.color,rgrid.barWidth);
                    //set the h bars for alignment conditioning
                    rgrid.h_bars = 2;
                    break;
                case "6LP":
                    //create grid
                    initGrid("rglass_pane","rgrid","P1T1B0L1R"+COLSQSZ,frame.color,rgrid.barWidth);
                    //set the h bars for alignment conditioning
                    rgrid.h_bars = 2;
                    break;
                case "CUSTOMLP":
                    switch(CNFG){
                    case "OX":
                        rgrid.pattern = COL2PTRN;
                        break;
                    case "XOX":
                        rgrid.pattern = COL3PTRN;
                        break;
                    }
                    switch(rgrid.pattern){
                    //First the brittanies...easily handled by changing the # in the P pattern
                    case "3LPH":
                        //create grid
                        initGrid("rglass_pane","rgrid","P0T0B1L1R"+COLSQSZ,frame.color,rgrid.barWidth);
                        //set the h bars for alignment conditioning
                        rgrid.h_bars = 0;
                        break;
                    case "3LPV":
                        //create grid
                        initGrid("rglass_pane","rgrid","P1T1B0L0R"+COLSQSZ,frame.color,rgrid.barWidth);
                        //set the h bars for alignment conditioning
                        rgrid.h_bars = 2;
                        break;
                    case "6LPB":
                        //create grid
                        initGrid("rglass_pane","rgrid","P0T1B1L1R"+COLSQSZ,frame.color,rgrid.barWidth);
                        //set the h bars for alignment conditioning
                        rgrid.h_bars = 1;
                        break;
                    case "6LPT":
                        //create grid
                        initGrid("rglass_pane","rgrid","P1T0B1L1R"+COLSQSZ,frame.color,rgrid.barWidth);
                        //set the h bars for alignment conditioning
                        rgrid.h_bars = 1;
                        break;
                    case "6LPL":
                        //create grid
                        initGrid("rglass_pane","rgrid","P1T1B1L0R"+COLSQSZ,frame.color,rgrid.barWidth);
                        //set the h bars for alignment conditioning
                        rgrid.h_bars = 2;
                        break;
                    case "6LPR":
                        //create grid
                        initGrid("rglass_pane","rgrid","P1T1B0L1R"+COLSQSZ,frame.color,rgrid.barWidth);
                        //set the h bars for alignment conditioning
                        rgrid.h_bars = 2;
                        break;
                    case "9LP":
                        //create grid
                        initGrid("rglass_pane","rgrid","P1T1B1L1R"+COLSQSZ,frame.color,rgrid.barWidth);
                        //set the h bars for alignment conditioning
                        rgrid.h_bars = 2;
                        break;
                    }
                }
            }
*/
            initMitredFrame("tbead", bead.x, bead.y, bead.width, bead.height, bead.partWidth, frame.color);
                
            //if this is IF, then draw the fin
            if(addFin){
                initOuterMiterFrame("frame_fin", 0, 0, frame.width + frame.leftFin + frame.rightFin, frame.height+ frame.headFin + frame.sillFin, frame.leftFin, frame.rightFin, frame.headFin, frame.sillFin, frame.color);
            }

            initOuterMiterFrame("frame", frame.x, frame.y, frame.width, frame.height, frame.leftWidth,frame.rightWidth, frame.headWidth,frame.sillWidth, frame.color);
            initOuterMiterFrame("frame_bevel", frame.x + frame.leftBevelInset, frame.y + frame.headBevelInset, frame.width - (frame.leftBevelInset + frame.rightBevelInset), frame.height - (frame.headBevelInset + frame.sillBevelInset), frame.leftBevelWidth,frame.rightBevelWidth, frame.headBevelWidth,frame.sillBevelWidth, frame.color);
            initFrameMember("frame_rail", "frame", frame.x + frame.sillWidth,frame.y + frame.sillWidth,frame.width - (2 * frame.sillWidth),frame.height - (2 * frame.sillWidth));    
    
           //align grids
            if(tgrid.add && bgrid.add){
                alignlite_v("bglass_pane", "bgrid", "tglass_pane", "tgrid", "", 0);
            }



            //and handing
            initDirection("t_direction","tglass_pane","D");
            initDirection("b_direction","bglass_pane","U");
            //Add dims
            var dimOffset = 1.5;
            var dimWidth = {
                x1:frame.x + frame.leftOffset,
                y1:frame.height + (frame.headFin + frame.sillFin),
                x2:frame.x + frame.width - frame.rightOffset,
                y2:frame.height + (frame.headFin + frame.sillFin),
                offset:dimOffset
            };
            var dimHeight = {
                x1:frame.width + (frame.leftFin + frame.rightFin),
                y1:frame.y + frame.headOffset,
                x2:frame.width + (frame.leftFin + frame.rightFin),
                y2:frame.y + frame.height - frame.sillOffset,
                offset:dimOffset
            };
            
            //custom sash dims
            if(VNTCNFG === "CSTM.VNT"){
                if(addLsash){
                    createDim(
                        tsash.x,
                        frame.height + (frame.headFin + frame.sillFin) + dimOffset,
                        tsash.x + tsash.width,
                        frame.height + (frame.headFin + frame.sillFin) + dimOffset,
                        false);
                    dimWidth.offset = 4;
                }
                if(addRsash){
                    createDim(
                        bsash.x,
                        frame.height + (frame.headFin + frame.sillFin) + dimOffset,
                        bsash.x + bsash.width,
                        frame.height + (frame.headFin + frame.sillFin) + dimOffset,
                        false);
                    dimWidth.offset = 4;
                }
            }

            //custom muntin location...add in first to see if we need to move the main dim
//            h_dimOffset = 0;
//            if(COLMTNLOC1 > 0){
//                createDim(dim_x1,dim_y1,dim_x2,dim_y1 + COLMTNLOC1,true);
//                h_dimOffset = 1.5;
//            }
//            if(COLMTNLOC2 > 0){
//                createDim(dim_x1,dim_y2 - COLMTNLOC2,dim_x2,dim_y2,true);
//                h_dimOffset = 1.5;
//            }
//
//            if(COLMTNLOC2 > 0){
//                createDim(dim_x1,dim_y2 - COLMTNLOC2,dim_x2,dim_y2,true);
//                h_dimOffset = 1.5;
//            }
//
//            if(grid.radius > 0){
//                createDim((glass.x + (glass.width - (grid.radius*2))/2),(glass.y + (glass.height/2)),(glass.x + (glass.width - (grid.radius*2))/2) + (grid.radius*2),(glass.y + (glass.height/2)),true);
//                h_dimOffset = 1.5;
//            }
//
//            if(grid.sq_h > 0){
//                createDim((glass.x + ((glass.width - grid.sq_h)/2)),(glass.y + ((glass.height - grid.sq_v)/2) + grid.sq_v + 1.5),(glass.x + ((glass.width - grid.sq_h)/2)) + grid.sq_h,(glass.y + ((glass.height - grid.sq_v)/2) + grid.sq_v + 1.5),true);
//                h_dimOffset = 1.5;
//            }
//
//            if(grid.sq_v > 0){
//                createDim((glass.x + ((glass.width - grid.sq_h)/2)) + grid.sq_h + 1.5,(glass.y + ((glass.height - grid.sq_v)/2)),(glass.x + ((glass.width - grid.sq_h)/2)) + grid.sq_h + 1.5,(glass.y + ((glass.height - grid.sq_v)/2) + grid.sq_v),true);
//                h_dimOffset = 1.5;
//            }
//
        
//            dim_x1 = dim_x1 + h_dimOffset;
//            dim_x2 = dim_x1;
        
            createDim(dimWidth.x1,dimWidth.y1 + dimWidth.offset,dimWidth.x2,dimWidth.y2 + dimWidth.offset,false);
            createDim(dimHeight.x1 + dimHeight.offset,dimHeight.y1,dimHeight.x2 + dimHeight.offset,dimHeight.y2,false);


        }
// INSERT YOUR SCRIPTING HERE!!!!!



	returnConfigData();  // post values to confguration code
}

