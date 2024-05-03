package com.moment.diary.share.service;

import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.diary.share.model.ShareDAO;
import com.moment.diary.share.model.ShareDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


public class ShareBoardList implements Action {

        @Override
        public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

            ShareDAO dao = ShareDAO.getInstance();
            List<ShareDTO> shareList = dao.getShareList();

            // Convert the noticeList to JSON
            Gson gson = new Gson();
            String json = gson.toJson(shareList);

            // Write the JSON to the response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);

            return null;
        }
    }
