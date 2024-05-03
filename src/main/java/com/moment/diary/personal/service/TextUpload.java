package com.moment.diary.personal.service;

import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.diary.personal.model.PsnDAO;
import com.moment.diary.personal.model.PsnDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

public class TextUpload implements Action {

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String boardWriter = request.getParameter("boardWriter");
        String boardCont = request.getParameter("boardCont");
        System.out.println(boardWriter);
        System.out.println(boardCont);

        PsnDTO dto = new PsnDTO();

        dto.setBoardWriter(boardWriter);
        dto.setBoardCont(boardCont);

        PsnDAO dao = PsnDAO.getInstance();
        int check = dao.insertBoard(dto);

        Map<String, String> result = new HashMap<>();
        Gson gson = new Gson();

        if (check > 0) {
            System.out.println("글쓰기 성공");
            response.setStatus(HttpServletResponse.SC_OK);
            result.put("message", "글쓰기 성공");
        } else {
            System.out.println("글쓰기 실패");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            result.put("message", "글쓰기 실패");
        }

        response.getWriter().write(gson.toJson(result));

        return null;
    }
}
