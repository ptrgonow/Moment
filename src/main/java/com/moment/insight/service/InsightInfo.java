package com.moment.insight.service;

import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.insight.model.InsightDAO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InsightInfo implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        InsightDAO dao = InsightDAO.getInstance();
        int todayDiaryCount = dao.getTodayDiary();
        int todayWriteCount = dao.getTodayWrite();

        Map<String, Integer> map = new HashMap<>();
        map.put("todayDiaryCount", todayDiaryCount);
        map.put("todayWriteCount", todayWriteCount);

        Gson gson = new Gson();
        String json = gson.toJson(map);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);


        /*

            int todayShareCount = dao.getTodayShare();
            dao.getTodayMember();
            dao.getTotalProduct();
            dao.getTodayOrder();
            dao.getTotalSales();

        */



        return null;
    }
}
