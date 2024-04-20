package com.moment.admin.service;

import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.AdminDAO;
import com.moment.admin.model.AdminDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AdminCont implements Action {

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 요청 : 뷰 페이지에서 전달받은 adminNo(번호)를 기준으로 해당 관리자 정보를 조회하는 비즈니스 로직
        // 응답 : 조회된 관리자 정보를 JSON 형태로 응답

        int adminNo = Integer.parseInt(request.getParameter("adminNo"));
        System.out.println("adminNo : " + adminNo);

        AdminDAO dao = AdminDAO.getInstance();
        AdminDTO adminCont = dao.getAdminCont(adminNo);

        Gson gson = new Gson();
        String json = gson.toJson(adminCont);

        // Write the JSON to the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

        return null;
    }

}

