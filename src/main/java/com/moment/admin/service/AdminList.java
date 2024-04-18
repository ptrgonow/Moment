package com.moment.admin.service;

import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.AdminDAO;
import com.moment.admin.model.AdminDTO;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class AdminList implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        AdminDAO dao = AdminDAO.getInstance();
        List<AdminDTO> adminList = dao.getAdminList();

        // Convert the noticeList to JSON
        Gson gson = new Gson();
        String json = gson.toJson(adminList);

        // Write the JSON to the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

        return null;
    }
}
