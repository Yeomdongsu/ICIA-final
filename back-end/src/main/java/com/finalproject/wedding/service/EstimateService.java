package com.finalproject.wedding.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
@Log
public class EstimateService {
    @Autowired
    private WeddingCompRepository wcRepo;
    @Autowired
    private WeddingHoleRepository whRepo;
    @Autowired
    private SDMRepository sRepo;
    @Autowired
    private PlannerRepository pRepo;
    @Autowired
    private HoneyMoonRepository hRepo;
    @Autowired
    private ReservationRepository rRepo;


    public Map searchEst(String wdate, String wseoul, String wgyeong, String win, String wgang, String wje, String wdae, String wchungbuk, String wchungnam, String wgyeongnam, String wdaegu, String wbu, String wul, String wgyeongbuk, String wgwang, String wjeonnam, String wjeonbuk, String whole, String common, String trad, String hotel, String house, String church, String cathedral, String outdoor, int wminprice, int wmaxprice, String sdate, String sseoul, String sgyeong, String sin, String sgang, String sje, String sdae, String schungbuk, String schungnam, String sbu, String sul, String sgyeongnam, String sdaegu, String sgyeongbuk, String sgwang, String sjeonnam, String sjeonbuk,  int sminprice, int smaxprice, String pdate, int pminprice, int pmaxprice, String hdate, String hseoul, String hgyeong, String hin, String hgang, String hje, String hdae, String hchungbuk, String hchungnam, String hbu, String hul, String hgyeongnam, String hdaegu, String hgyeongbuk, String hgwang, String hjeonnam, String hjeonbuk, int hminprice, int hmaxprice){
        List<WeddingComp> wcList;
        List<WeddingHall> whList = new ArrayList<>();
        List<Reservations> rwhList;
        List<WeddingHall> removewh = new ArrayList<>();
        List<SDM> sList;
        List<Reservations> rsList;
        List<SDM> removes = new ArrayList<>();
        List<Planner> pList;
        List<Reservations> rpList;
        List<Planner> removep = new ArrayList<>();
        List<HoneyMoon> hList;
        List<Reservations> rhList;
        List<HoneyMoon> removeh = new ArrayList<>();

        Map estData = new HashMap<>();
        log.info("?????????????????????????"+hdate);
        java.sql.Date cvtwdate = java.sql.Date.valueOf(wdate);
        java.sql.Date cvtsdate = java.sql.Date.valueOf(sdate);
        java.sql.Date cvtpdate = java.sql.Date.valueOf(pdate);
        java.sql.Date cvthdate = java.sql.Date.valueOf(hdate);
//        java.sql.Timestamp cvthdate = java.sql.Timestamp.valueOf(hdate+" 00:00:00");
            wcList = wcRepo.findBySWClocation(wseoul, wgyeong, win, wgang, wje, wdae, wchungbuk, wchungnam, wbu, wul, wgyeongnam, wdaegu, wgyeongbuk, wgwang, wjeonnam, wjeonbuk);
            log.info("????????? ????????????"+wcList);
            for(WeddingComp wno : wcList){
                switch(whole){
                    case "???????????????" :
                        if(common.equals("???????????????") && trad.equals("???????????????") && hotel.equals("???????????????") && house.equals("???????????????") && church.equals("???????????????") && cathedral.equals("???????????????") && outdoor.equals("???????????????")){
                            whList.addAll(whRepo.findByWhwcidx3(wno.getWidx(), wminprice, wmaxprice));
                        }
                        else if(whRepo.findByWhwcidx2(wno.getWidx(), wminprice, wmaxprice, common, trad, hotel, house, church, cathedral, outdoor)!=null) {
                            whList.addAll(whRepo.findByWhwcidx2(wno.getWidx(), wminprice, wmaxprice, common, trad, hotel, house, church, cathedral, outdoor));
                        }
                        break;
                    case "??????" :
                        if(whRepo.findByWhwcidx3(wno.getWidx(), wminprice, wmaxprice)!=null) {
                            whList.addAll(whRepo.findByWhwcidx3(wno.getWidx(), wminprice, wmaxprice));
                        }
                    break;
                }
            }
            log.info("????????????"+wcList);
            log.info("?????????"+whList);

            rwhList = rRepo.findByRwhdate(cvtwdate);
            int index1=0;
            for(WeddingHall whno : whList){
                for(Reservations rno : rwhList){
                    if(rno.getRsidx()==whno.getWhidx()){
                        removewh.add(whList.get(index1));
                    }   //if end
                }   //for end
                index1++;
            }// for end
            whList.remove(removewh);
            log.info("??????????????? ???????????? ???????????? ??????????????? ???????????? ????????? ????????? ??????"+whList);



            sList = sRepo.findBySSlocation(sseoul, sgyeong, sin, sgang, sje, sdae, schungbuk, schungnam, sbu, sul, sgyeongnam, sdaegu, sgyeongbuk, sgwang, sjeonnam, sjeonbuk, sminprice, smaxprice);
            log.info("????????? ????????????"+sList);
        log.info(sList+"?????????");
            rsList = rRepo.findByRsdate(cvtsdate);
            int index2=0;
            for(SDM sno : sList){
                for(Reservations rno : rsList){
                    if(rno.getRsidx()==sno.getSidx()){
                        removes.add(sList.get(index2));
                    }   //if end
                }   //for end
                index2++;
            }// for end
            sList.removeAll(removes);
            log.info("??????????????? ???????????? ???????????? ??????????????? ???????????? ????????? ????????? ??????"+sList);




            pList = pRepo.findByPrice(pminprice, pmaxprice);
            log.info("????????? ????????????"+pList);
        log.info(pList+"?????????");
            rpList = rRepo.findByRpdate(cvtpdate);
            int index3=0;
            for(Planner pno : pList){
                for(Reservations rno : rpList){
                    if(rno.getRpidx()==pno.getPidx()){
                        removep.add(pList.get(index3));
                    }   //if end
                }   //for end
                index3++;
            }// for end
            pList.removeAll(removep);
            log.info("??????????????? ???????????? ???????????? ??????????????? ???????????? ????????? ????????? ??????"+pList);


            hList = hRepo.findBySHlocation(hgyeong, hin, hgang, hje, hdae, hchungbuk, hchungnam, hbu, hul, hgyeongnam, hdaegu, hgyeongbuk, hgwang, hjeonnam, hjeonbuk, hminprice, hmaxprice);
log.info(hList+"?????????");
log.info(hseoul+"???????????????????");
            if(hseoul.equals("??????")){
                List<HoneyMoon> hList2 = new ArrayList<>();
                hList2 = hRepo.findAllByHarrival(hseoul);
                hList.addAll(hList2);
                log.info("???????????????????"+hList);
            }
            rhList = rRepo.findByRhdate(cvthdate);
//            log.info("????????? ????????????"+hList);
//            log.info("???????????? ??????" + cvthdate);
                int index4=0;
//                int index2=0;
            for(HoneyMoon hno : hList){
//                log.info("sadads"+hno);
//                log.info(""+hno.getHidx());
//                log.info("????????????"+rhList);
                for(Reservations rno : rhList){
                    if(rno.getRhidx()==hno.getHidx()){
//                        log.info("?????????"+hList);
//                        log.info("?????????"+hno);
//                        hList.remove(index1);
                        removeh.add(hList.get(index4));
//                        log.info("????????? ??????"+removeh);
//                        log.info("after remove"+hList);
//                        hList.removeIf(item -> item.getHidx()==rno.getRhidx());
                    }   //if end
//                    log.info("?????? ????????????"+hList);
                }   //for end
                index4++;
            }// for end
            hList.removeAll(removeh);
        // if end
        log.info("??????????????? ???????????? ???????????? ??????????????? ???????????? ????????? ????????? ??????"+sList);
        log.info("??????????????? ???????????? ???????????? ??????????????? ???????????? ????????? ????????? ??????"+hList);

//        int i=0;
//        for(WeddingHall wno : whList){
//            for(SDM sno : sList){
//                for(Planner pno : pList){
//                    for(HoneyMoon hno : hList){
//                        int tcost = wno.getWhprice()+ sno.getSprice()+ pno.getPprice()+hno.getHcost();
//                        if(wno.getWhprice()+ sno.getSprice()+ pno.getPprice()+hno.getHcost()>= minprice && wno.getWhprice()+ sno.getSprice()+ pno.getPprice()+hno.getHcost()<= maxprice){
//                            estData.put(i,whList);
//                            i++;
//                            estData.put(i,sList);
//                            i++;
//                            estData.put(i,pList);
//                            i++;
//                            estData.put(i,hList);
//
//                        }   //if end
//                    }   //for end
//                }   //for end
//            }   //for end
//        }   //for end
        estData.put("w", whList);
        estData.put("s", sList);
        estData.put("p", pList);
        estData.put("h", hList);
        log.info("?????? ?????????"+estData);
        return estData;
    }

    public Map<String, Object> estimateMain(String type, String location, int mincost, int maxcost) {
        log.info("estimateMain()");
        List<HoneyMoon> hm = new ArrayList<>();
        List<Planner> pl = new ArrayList<>();
        List<WeddingHall> wh = new ArrayList<>();
        List<SDM> sdm = new ArrayList<>();
        List<WeddingComp> wc = new ArrayList<>();
        Map<String, Object> eMain = new HashMap<>();

        try{
            switch(type){
                case "?????????":
                    hm = hRepo.estMainHm(location, mincost, maxcost);
                    break;
                case "?????????":
                    pl = pRepo.estMainpl(mincost, maxcost);
                    break;
                case "?????????":
                    wc = wcRepo.findByWlocation(location);
                    if(!wc.isEmpty())
                        for(WeddingComp c : wc)
                            wh.add(whRepo.estMainWh(c.getWidx(),mincost, maxcost));
                    break;
                case "?????????":
                    sdm = sRepo.estMainWh(location, mincost, maxcost);
                    break;
            }
            log.info("?????? ??????");

            eMain.put("hm", hm);
            eMain.put("pl", pl);
            eMain.put("wh", wh);
            eMain.put("sdm", sdm);
        }catch (Exception e){
            e.printStackTrace();
            log.info("?????? ??????");
        }
        return eMain;
    }
}