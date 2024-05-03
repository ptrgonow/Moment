package com.moment.diary.personal.service;

import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.configuration.AwsSAO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

public class ImageUpload implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        AwsSAO sao = AwsSAO.getInstance();

        Part part = request.getPart("file");
        String boardWriter = request.getParameter("boardWriter");

        sao.uploadImageAndSaveKeys(part, boardWriter);

        return null;
    }
}
