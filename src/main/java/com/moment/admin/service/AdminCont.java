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
