package com.moment.admin.service;

import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.NoticeDAO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AdminNoticeDelete implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        int noticeNo = Integer.parseInt(request.getParameter("noticeNo").trim());
        System.out.println("noticeNo : " + noticeNo);

        NoticeDAO dao = NoticeDAO.getInstance();
        int result = dao.deleteNotice(noticeNo);
        dao.updateSequence(noticeNo);

        if (result > 0) {
            System.out.println("공지사항 삭제 성공");
        } else {
            System.out.println("공지사항 삭제 실패");
        }
        return null;
    }
}
