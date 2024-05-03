package com.moment.admin.service;

import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.NoticeDAO;
import com.moment.admin.model.NoticeDTO;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AdminNoticeList implements Action {

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
        int page = Integer.parseInt(request.getParameter("page"));
        int size = Integer.parseInt(request.getParameter("size"));


        NoticeDAO dao = NoticeDAO.getInstance();
        List<NoticeDTO> noticeList = dao.getNoticeList(page, size);
        int totalNoticeCount = dao.getTotalNoticeCount();
        int lastPage = (totalNoticeCount + size - 1) / size;
        int currentPageSize = noticeList.size();

        Map<String, Object> result = new HashMap<>();
        result.put("noticeList", noticeList);
        result.put("lastPage", lastPage);
        result.put("currentPageSize", currentPageSize);

        // Convert the result map to JSON
        Gson gson = new Gson();
        String json = gson.toJson(result);

        // Write the JSON to the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

        return null;
    }

}
