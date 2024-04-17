package com.moment.admin.service;

import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.NoticeDAO;
import com.moment.admin.model.NoticeDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AdminNoticeUpdate implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        int noticeNo = Integer.parseInt(request.getParameter("noticeNo").trim());
        String insertTitle = request.getParameter("insertTitle").trim();
        String insertCont = request.getParameter("insertCont").trim();

        NoticeDTO dto = new NoticeDTO();
        dto.setNoticeNo(noticeNo);
        dto.setNoticeTitle(insertTitle);
        dto.setNoticeCont(insertCont);

        NoticeDAO dao = NoticeDAO.getInstance();
        int result = dao.updateNotice(dto);

        if (result > 0) {
            System.out.println("공지사항 수정 성공");
        } else {
            System.out.println("공지사항 수정 실패");
        }

        return null;
    }
}
