package com.moment.admin.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.moment.action.Action;
import com.moment.action.ActionForward;

public class AdminLogOut implements Action{

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        HttpSession session = request.getSession();
        session.invalidate();
        ActionForward forward = new ActionForward();
        forward.setRedirect(false);
        forward.setPath("views/user/UserLogIn.jsp");

        return forward;
    }
}
