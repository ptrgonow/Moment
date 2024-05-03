package com.moment.admin.service;

import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.NoticeDAO;
import com.moment.admin.model.NoticeDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AdminNoticeWrite implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String insertTitle = request.getParameter("insertTitle").trim();
        String insertWriter = request.getParameter("insertWriter").trim();
        String insertCont = request.getParameter("insertCont").trim();

        NoticeDTO dto = new NoticeDTO();
        dto.setNoticeTitle(insertTitle);
        dto.setNoticeWriter(insertWriter);
        dto.setNoticeCont(insertCont);

        NoticeDAO dao = NoticeDAO.getInstance();
        int result = dao.insertNotice(dto);

        if (result > 0) {
            System.out.println("공지사항 작성 성공");
        } else {
            System.out.println("공지사항 작성 실패");
        }

        return null;
    }
}
