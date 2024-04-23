package com.moment.diary.share.service;


import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.diary.share.model.ShareDAO;
import com.moment.diary.share.model.ShareDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ShareBoardCont implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        int boardNo = Integer.parseInt(request.getParameter("boardNo").trim());

        ShareDAO dao = ShareDAO.getInstance();
        ShareDTO dto = dao.getShareContent(boardNo);

        Gson gson = new Gson();
        String json = gson.toJson(dto);

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

        return null;
    }
}
